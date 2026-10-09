/**
 * RÉSERVATIONS — stockage (serveur uniquement : n'importer que depuis
 * app/api/*). N'importe quel Redis branché sur le projet Vercel :
 *   - Upstash, par son API REST (KV_REST_API_URL / _TOKEN…) ;
 *   - Redis Cloud ou tout Redis classique, par son URL redis:// ou rediss://
 *     (REDIS_URL, ou STORAGE_URL si Vercel a ajouté un préfixe).
 * Les deux reçoivent exactement les mêmes commandes.
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
import { createClient } from "redis";
import { RESERVE, pad3, type Reservation } from "@/lib/reserve";

type Cmd = (string | number)[];

export class StoreUnavailable extends Error {
  constructor() {
    super("Reservation store is not configured");
  }
}

/* Noms injectés par l'intégration Upstash de Vercel : KV_REST_API_URL /
   KV_REST_API_TOKEN, ou UPSTASH_REDIS_REST_URL / _TOKEN. Vercel peut y
   ajouter un préfixe au moment de la connexion (« STORAGE_KV_REST_API_URL ») :
   on accepte donc n'importe quel préfixe, l'URL et le jeton allant par paire. */
const PAIRS = [
  ["KV_REST_API_URL", "KV_REST_API_TOKEN"],
  ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
] as const;

function restConfig() {
  for (const [urlName, tokenName] of PAIRS) {
    for (const key of Object.keys(process.env)) {
      if (key !== urlName && !key.endsWith(`_${urlName}`)) continue;
      const prefix = key.slice(0, key.length - urlName.length);
      const url = process.env[key];
      const token = process.env[`${prefix}${tokenName}`];
      if (url && token) return { url: url.replace(/\/$/, ""), token };
    }
  }
  return null;
}

/* Redis classique : la première variable *_URL (ou REDIS_URL) dont la
   valeur est une adresse redis:// ou rediss://. */
function tcpUrl() {
  const candidates = Object.keys(process.env)
    .filter((k) => k === "REDIS_URL" || k.endsWith("_URL"))
    .sort((a, b) => Number(b.endsWith("REDIS_URL")) - Number(a.endsWith("REDIS_URL")));
  for (const key of candidates) {
    const value = process.env[key] ?? "";
    if (/^rediss?:\/\//.test(value)) return value;
  }
  return null;
}

export const storeConfigured = () => restConfig() !== null || tcpUrl() !== null;

/* Une connexion réutilisée tant que la fonction reste chaude ; oubliée à la
   moindre erreur, pour qu'un appel suivant se reconnecte proprement. */
let tcpClient: Promise<ReturnType<typeof createClient>> | null = null;

function tcp(url: string) {
  if (!tcpClient) {
    const client = createClient({ url, socket: { connectTimeout: 5000 } });
    client.on("error", () => {
      tcpClient = null;
    });
    tcpClient = client.connect().then(() => client);
    tcpClient.catch(() => {
      tcpClient = null;
    });
  }
  return tcpClient;
}

async function redis<T = unknown>(cmd: Cmd): Promise<T> {
  const rest = restConfig();
  if (rest) {
    const res = await fetch(rest.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${rest.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmd),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({}))) as { result?: T; error?: string };
    if (!res.ok || data.error) {
      throw new Error(`redis ${cmd[0]} failed: ${data.error ?? res.status}`);
    }
    return data.result as T;
  }

  const url = tcpUrl();
  if (!url) throw new StoreUnavailable();
  const client = await tcp(url);
  return (await client.sendCommand(cmd.map(String))) as T;
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
