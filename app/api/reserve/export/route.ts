import { timingSafeEqual } from "node:crypto";
import { listReservations, storeConfigured } from "@/lib/reservations-store";

/**
 * GET /api/reserve/export?key=…  → CSV de toutes les réservations, pour
 * l'e-mail de lancement. Protégé par RESERVATIONS_ADMIN_KEY : sans cette
 * variable, ou avec une mauvaise clé, la route répond 404.
 */
export const dynamic = "force-dynamic";

const same = (a: string, b: string) =>
  a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

const cell = (v: string | number) => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET(req: Request) {
  const expected = process.env.RESERVATIONS_ADMIN_KEY ?? "";
  const given = new URL(req.url).searchParams.get("key") ?? "";
  if (!expected || !same(given, expected) || !storeConfigured()) {
    return new Response("Not found", { status: 404 });
  }

  const rows = await listReservations();
  const csv = [
    "reservation,batch,email,quantity,product,created_at",
    ...rows.map((r) =>
      [r.number, r.batch, r.email, r.quantity, r.product, r.createdAt].map(cell).join(","),
    ),
  ].join("\n");

  const day = new Date().toISOString().slice(0, 10);
  return new Response(csv + "\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="proof-reservations-${day}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
