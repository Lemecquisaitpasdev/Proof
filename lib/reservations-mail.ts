/**
 * RÉSERVATIONS — e-mail de confirmation, FACULTATIF (serveur uniquement).
 *
 * Ne part que si RESEND_API_KEY et RESERVE_FROM_EMAIL sont définis (Resend
 * exige un domaine vérifié pour l'expéditeur). Sans eux, le numéro reste
 * affiché à l'écran et la réservation est enregistrée quand même : un échec
 * d'envoi ne fait jamais échouer une réservation.
 */
import { RESERVE, reservationLabel, type Reservation } from "@/lib/reserve";

export async function sendConfirmation(r: Reservation, unitPrice: number): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESERVE_FROM_EMAIL;
  if (!key || !from) return false;

  const label = reservationLabel(r);
  const bottles = `${r.quantity} × The Gel, PR-02`;
  const total = `$${unitPrice * r.quantity}`;
  const text = [
    `${label}`,
    "",
    "Your reservation is on file.",
    "",
    `${bottles}, ${total} at launch.`,
    "No card, no payment today.",
    "",
    `When Batch ${r.batch} ships, we email you a link to claim your bottle.`,
    `Your reservation holds for ${RESERVE.holdHours} hours after that email.`,
    "To release it, simply reply to this email.",
    "",
    "Proof, medical-grade scar care.",
    "Honor it. Don't erase it.",
  ].join("\n");

  const html = `
  <div style="background:#0f0d0a;padding:40px 24px;font-family:Arial,Helvetica,sans-serif;color:#ede8df">
    <div style="max-width:520px;margin:0 auto">
      <p style="font:12px/1.6 'Courier New',monospace;letter-spacing:.18em;text-transform:uppercase;color:#d8b848;margin:0">Reservation confirmed / Batch ${r.batch}</p>
      <p style="font-size:56px;font-weight:900;letter-spacing:-.01em;margin:16px 0 4px">Nº ${r.number}</p>
      <div style="height:1px;width:120px;background:#c9a227;margin:0 0 28px"></div>
      <p style="font-size:15px;line-height:1.6;margin:0 0 6px">${bottles}, <b>${total}</b> at launch.</p>
      <p style="font-size:15px;line-height:1.6;margin:0 0 24px;color:#a89f90">No card, no payment today.</p>
      <p style="font-size:15px;line-height:1.6;margin:0 0 6px">When Batch ${r.batch} ships, we email you a link to claim your bottle. Your reservation holds for ${RESERVE.holdHours} hours after that email.</p>
      <p style="font-size:13px;line-height:1.6;margin:24px 0 0;color:#a89f90">To release it, simply reply to this email.</p>
      <p style="font:11px/1.6 'Courier New',monospace;letter-spacing:.18em;text-transform:uppercase;color:#a89f90;margin:40px 0 0">Proof / Honor it. Don't erase it.</p>
    </div>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [r.email],
        subject: `${label}, confirmed`,
        text,
        html,
        ...(process.env.RESERVE_REPLY_TO ? { reply_to: process.env.RESERVE_REPLY_TO } : {}),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
