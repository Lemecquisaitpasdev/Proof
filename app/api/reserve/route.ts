import { RESERVE, isEmail } from "@/lib/reserve";
import { getProduct } from "@/lib/products";
import { allow, reserve, storeConfigured, StoreUnavailable } from "@/lib/reservations-store";
import { sendConfirmation } from "@/lib/reservations-mail";

/**
 * POST /api/reserve  { email, quantity, consent, company }
 * → { reservation, existing, emailed }
 *
 * « company » est un pot de miel : invisible pour un humain, rempli par les
 * robots. Erreurs renvoyées sous forme de code court, traduites par le
 * formulaire : closed · unavailable · invalid · email · quantity · consent ·
 * rate · server.
 */
export const dynamic = "force-dynamic";

const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (!RESERVE.open) return json({ error: "closed" }, 403);
  if (!storeConfigured()) return json({ error: "unavailable" }, 503);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid" }, 400);
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const quantity = Number(body.quantity);
  if (String(body.company ?? "")) return json({ error: "invalid" }, 400);
  if (!isEmail(email)) return json({ error: "email" }, 400);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > RESERVE.maxQuantity) {
    return json({ error: "quantity" }, 400);
  }
  if (body.consent !== true) return json({ error: "consent" }, 400);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";

  try {
    if (!(await allow(ip))) return json({ error: "rate" }, 429);
    const { reservation, existing } = await reserve(email, quantity);
    const price = getProduct(RESERVE.product)?.price ?? 0;
    const emailed = existing ? false : await sendConfirmation(reservation, price);
    return json({ reservation, existing, emailed });
  } catch (err) {
    if (err instanceof StoreUnavailable) return json({ error: "unavailable" }, 503);
    console.error("[reserve]", err);
    return json({ error: "server" }, 500);
  }
}
