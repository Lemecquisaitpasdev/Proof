/**
 * RÉSERVATIONS — stockage (serveur uniquement : n'importer que depuis
 * app/api/*). Upstash Redis via son API REST, sans dépendance : il suffit
 * d'ajouter l'intégration Upstash au projet Vercel, qui injecte les clés.
 *
 * Clés :
 *   proof:pool:<série>         set des numéros encore libres (« 001 »…« 500 »)
 *   proof:pool:<série>:state   « pending » pendant le remplissage, puis « ready »
 *   proof:reservations         hash  e-mail → réservation (JSON)
 *   proof:rl:<ip>              compteur anti-abus, fenêtre d'une heure
 *
 * Le numéro est tiré par SPOP : aléatoire ET atomique, donc jamais attribué
 * deux fois, même sous des réservations simultanées. Une série épuisée
 * bascule sur la suivante (017 → 018).
 */
import { RESERVE, pad3, type Reservation } from "@/lib/reserve";

type Cmd = (string | number)[];

export class StoreUnavailable extends Error {
  constructor() {
    super("Reservation store is not configured");
  }
}

function config() {
  /* noms injectés par l'intégration Upstash (ou l'ancien Vercel KV) */
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export const storeConfigured = () => config() !== null;

async function redis<T = unknown>(cmd: Cmd): Promise<T> {
  const c = config();
  if (!c) throw new StoreUnavailable();
  const res = await fetch(c.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { result?: T; error?: string };
  if (!res.ok || data.error) {
    throw new Error(`redis ${cmd[0]} failed: ${data.error ?? res.status}`);
  }
  return data.result as T;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const RESERVATIONS = "proof:reservations";
const poolKey = (batch: number) => `proof:pool:${pad3(batch)}`;

/* Remplit la série une seule fois. « pending » expire au bout de 30 s : si
   le remplisseur tombe, un autre reprend. Personne ne tire pendant ce temps,
   donc un second SADD ne peut pas remettre en jeu un numéro déjà attribué. */
async function ensurePool(batch: number) {
  const state = `${poolKey(batch)}:state`;
  if ((await redis<string | null>(["GET", state])) === "ready") return;

  const claimed = await redis<string | null>(["SET", state, "pending", "NX", "EX", 30]);
  if (claimed === "OK") {
    const numbers = Array.from({ length: RESERVE.poolSize }, (_, i) => pad3(i + 1));
    await redis(["SADD", poolKey(batch), ...numbers]);
    await redis(["SET", state, "ready"]);
    return;
  }

  for (let i = 0; i < 30; i++) {
    await sleep(100);
    if ((await redis<string | null>(["GET", state])) === "ready") return;
  }
  throw new Error(`pool ${pad3(batch)} not ready`);
}

async function draw(): Promise<{ batch: string; number: string }> {
  for (let batch = RESERVE.firstBatch; batch < RESERVE.firstBatch + 100; batch++) {
    await ensurePool(batch);
    const number = await redis<string | null>(["SPOP", poolKey(batch)]);
    if (number) return { batch: pad3(batch), number };
  }
  throw new Error("no reservation numbers left");
}

/**
 * Réserve pour cet e-mail. Idempotent : un e-mail déjà inscrit garde son
 * numéro (seule la quantité est mise à jour), il n'en consomme pas un autre.
 */
export async function reserve(
  email: string,
  quantity: number,
): Promise<{ reservation: Reservation; existing: boolean }> {
  const found = await redis<string | null>(["HGET", RESERVATIONS, email]);
  if (found) {
    const reservation = JSON.parse(found) as Reservation;
    if (reservation.quantity !== quantity) {
      reservation.quantity = quantity;
      await redis(["HSET", RESERVATIONS, email, JSON.stringify(reservation)]);
    }
    return { reservation, existing: true };
  }

  const { batch, number } = await draw();
  const reservation: Reservation = {
    number,
    batch,
    email,
    quantity,
    product: RESERVE.product,
    createdAt: new Date().toISOString(),
  };

  const created = await redis<number>(["HSETNX", RESERVATIONS, email, JSON.stringify(reservation)]);
  if (created === 0) {
    /* double envoi simultané : l'autre requête a gagné, on rend le numéro */
    await redis(["SADD", poolKey(Number(batch)), number]);
    const winner = await redis<string>(["HGET", RESERVATIONS, email]);
    return { reservation: JSON.parse(winner) as Reservation, existing: true };
  }
  return { reservation, existing: false };
}

/* Anti-abus : au plus `limit` envois par IP et par heure. */
export async function allow(ip: string, limit = 8) {
  const key = `proof:rl:${ip}`;
  const n = await redis<number>(["INCR", key]);
  if (n === 1) await redis(["EXPIRE", key, 3600]);
  return n <= limit;
}

/* Toutes les réservations, de la plus ancienne à la plus récente. */
export async function listReservations(): Promise<Reservation[]> {
  const flat = (await redis<string[] | null>(["HGETALL", RESERVATIONS])) ?? [];
  const out: Reservation[] = [];
  for (let i = 1; i < flat.length; i += 2) out.push(JSON.parse(flat[i]) as Reservation);
  return out.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
