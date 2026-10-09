/**
 * RÉSERVATIONS — configuration partagée (client et serveur).
 *
 * Test de marché avant la première production : aucune carte, aucun
 * paiement. Le visiteur réserve un ou plusieurs flacons, s'engage sur le
 * prix, et reçoit un numéro de réservation unique, tiré au sort entre 001 et
 * 500 (jamais son rang réel). Quand la série est prête, l'e-mail de lancement
 * part à la main, avec le lien de paiement ; la réservation tient 48 h.
 *
 * Passer `open` à false rend aux boutons leur comportement panier.
 */
export const RESERVE = {
  open: true,
  /* produit réservable (le seul en vente) */
  product: "the-gel",
  /* première série ; au-delà de 500 réservations, on passe à la suivante */
  firstBatch: 17,
  poolSize: 500,
  maxQuantity: 3,
  /* durée pendant laquelle la réservation tient après l'e-mail de lancement */
  holdHours: 48,
} as const;

export type Reservation = {
  /* « 247 » : numéro à 3 chiffres, unique dans sa série */
  number: string;
  /* « 017 » */
  batch: string;
  email: string;
  quantity: number;
  product: string;
  /* ISO 8601 */
  createdAt: string;
};

export const pad3 = (n: number | string) => String(n).padStart(3, "0");

/* « Reservation Nº 247 · Batch 017 » */
export const reservationLabel = (r: Pick<Reservation, "number" | "batch">) =>
  `Reservation Nº ${r.number} · Batch ${r.batch}`;

export const reserveHref = (qty = 1) =>
  qty > 1 ? `/reserve?qty=${Math.min(qty, RESERVE.maxQuantity)}` : "/reserve";

export const isEmail = (value: string) =>
  value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
