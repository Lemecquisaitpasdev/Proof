"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import KintsugiLine from "@/components/KintsugiLine";
import { formatPrice } from "@/lib/products";
import { RESERVE, isEmail, reservationLabel, type Reservation } from "@/lib/reserve";

type Props = {
  batch: string;
  product: { name: string; chapter: string; line: string; price: number; image: string | null };
};

type Done = Reservation & { existing: boolean; emailed: boolean };

/* la réservation est gardée sur l'appareil : revenir sur la page la montre */
const STORAGE = "proof:reservation";

const ERRORS: Record<string, string> = {
  email: "Enter a valid email.",
  consent: "Tick the commitment to hold your bottle.",
  quantity: `Choose between 1 and ${RESERVE.maxQuantity} bottles.`,
  rate: "Too many attempts from this connection. Try again in an hour.",
  closed: "Reservations are closed for now.",
  unavailable: "Reservations open in a moment. Please try again shortly.",
  invalid: "Something looks off. Please try again.",
  server: "Something went wrong on our side. Please try again.",
};

/**
 * Réservation sans paiement (cf. lib/reserve.ts) : quantité, e-mail,
 * engagement explicite sur le prix → certificat « Reservation Nº 247 ».
 */
export default function ReserveForm({ batch, product }: Props) {
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Done | null>(null);

  useEffect(() => {
    const q = Number(new URLSearchParams(window.location.search).get("qty"));
    if (Number.isInteger(q) && q >= 1) setQty(Math.min(q, RESERVE.maxQuantity));
    try {
      const saved = localStorage.getItem(STORAGE);
      if (saved) setDone({ ...(JSON.parse(saved) as Reservation), existing: true, emailed: false });
    } catch {
      /* stockage indisponible : on repart du formulaire */
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!isEmail(clean)) return setError(ERRORS.email);
    if (!consent) return setError(ERRORS.consent);
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean, quantity: qty, consent, company }),
      });
      const data = await res.json().catch(() => ({ error: "server" }));
      if (!res.ok || !data.reservation) {
        setError(ERRORS[data.error as string] ?? ERRORS.server);
        return;
      }
      const r = data.reservation as Reservation;
      try {
        localStorage.setItem(STORAGE, JSON.stringify(r));
      } catch {
        /* rien : le certificat s'affiche quand même */
      }
      setDone({ ...r, existing: Boolean(data.existing), emailed: Boolean(data.emailed) });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(ERRORS.server);
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    try {
      localStorage.removeItem(STORAGE);
    } catch {
      /* rien */
    }
    setDone(null);
    setEmail("");
    setConsent(false);
  };

  /* ---------- certificat ---------- */
  if (done) {
    const date = new Date(done.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return (
      <section className="pagehead section rsv">
        <div className="container">
          <div className="cert">
            <span className="mlabel mlabel--gold">
              {done.existing ? "Reservation on file" : "Reservation confirmed"} / Batch {done.batch}
            </span>
            <p className="cert__no" aria-label={reservationLabel(done)}>
              <span className="cert__sign">Nº</span>
              <span className="kword">
                {done.number}
                <KintsugiLine variant="underline" onload />
              </span>
            </p>
            <p className="lead cert__lead">
              {done.existing
                ? "You already hold this reservation. Your number stays yours."
                : `Your bottle is on file. When Batch ${done.batch} ships, you are the first to know.`}
            </p>

            <table className="specs specs--kv cert__table">
              <tbody>
                <tr>
                  <th scope="row">Item</th>
                  <td className="is-ink">
                    {product.name}, {product.chapter}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Quantity</th>
                  <td className="is-ink">
                    {done.quantity} {done.quantity > 1 ? "bottles" : "bottle"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">At launch</th>
                  <td className="is-ink">{formatPrice(product.price * done.quantity)}</td>
                </tr>
                <tr>
                  <th scope="row">Today</th>
                  <td>$0, no card</td>
                </tr>
                <tr>
                  <th scope="row">Held</th>
                  <td>{RESERVE.holdHours} h after the launch email</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td className="cert__email">{done.email}</td>
                </tr>
                <tr>
                  <th scope="row">Reserved</th>
                  <td>{date}</td>
                </tr>
              </tbody>
            </table>

            <p className="cert__note">
              {done.emailed
                ? `A copy is on its way to ${done.email}.`
                : "Keep this number, a screenshot is enough."}{" "}
              To release your reservation, reply to the launch email.
            </p>

            <div className="cert__cta">
              <Link href="/shop/the-gel" className="btn btn--primary">
                Back to The Gel
              </Link>
              <Link href="/science" className="tlink klink">
                Read the science
              </Link>
            </div>
            <button type="button" className="cert__reset" onClick={reset}>
              Not you? Reserve with another email
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- formulaire ---------- */
  const total = product.price * qty;
  return (
    <section className="pagehead section rsv">
      <div className="container">
        <span className="mlabel">Reservation / Batch {batch}</span>
        <h1 className="d1" style={{ marginTop: 16 }}>
          Reserve your bottle.
        </h1>
        <p className="lead measure rsv__lead">
          Batch {batch} is in the lab. Reserve today and pay nothing. When it ships,
          you are first in line, your bottle held for {RESERVE.holdHours} hours.
        </p>

        <div className="rsv__grid">
          <form className="rsv__form" onSubmit={submit} noValidate>
            <fieldset className="rsv__step">
              <legend className="rsv__legend">
                <span>01</span> Quantity
              </legend>
              <div className="packs__row" role="radiogroup" aria-label="Quantity">
                {Array.from({ length: RESERVE.maxQuantity }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={n === qty}
                    className={n === qty ? "pack is-on" : "pack"}
                    onClick={() => setQty(n)}
                  >
                    <span className="pack__label">
                      {n} {n > 1 ? "bottles" : "bottle"}
                    </span>
                    <span className="pack__cover">{n * 30} ml</span>
                    <span className="pack__price num">{formatPrice(product.price * n)}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="rsv__step">
              <legend className="rsv__legend">
                <span>02</span> Your email
              </legend>
              <label className="rsv__field">
                <span className="visually-hidden">Email</span>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              {/* pot de miel : invisible, ignoré des humains */}
              <input
                className="rsv__hp"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </fieldset>

            <fieldset className="rsv__step">
              <legend className="rsv__legend">
                <span>03</span> Your commitment
              </legend>
              <label className="rsv__check">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span className="rsv__box" aria-hidden="true" />
                <span>
                  I commit to buy at {formatPrice(product.price)} per bottle when Batch {batch}{" "}
                  ships. I can release my reservation anytime.
                </span>
              </label>
            </fieldset>

            <button type="submit" className="btn btn--primary btn--pill" disabled={busy}>
              {busy
                ? "Reserving…"
                : qty > 1
                  ? `Reserve ${qty} bottles`
                  : "Reserve my bottle"}
            </button>
            <p className="rsv__error" role="alert" aria-live="assertive">
              {error}
            </p>
            <p className="rsv__fine">
              No card. No payment today. One email when Batch {batch} ships, nothing
              else. Your email is used only for this reservation.
            </p>
          </form>

          <aside className="rsv__summary" aria-label="Your reservation">
            {product.image ? (
              <div className="rsv__visual">
                <Image
                  src={product.image}
                  alt={`${product.name}, medical-grade silicone scar gel`}
                  fill
                  sizes="(max-width: 900px) 100vw, 34vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
            <span className="card__chapter">
              {product.chapter} · Batch {batch}
            </span>
            <h2 className="rsv__name">{product.name}</h2>
            <p className="rsv__line">{product.line}</p>
            <dl className="rsv__sum">
              <div>
                <dt>{qty > 1 ? `${qty} bottles` : "1 bottle"} at launch</dt>
                <dd className="num">{formatPrice(total)}</dd>
              </div>
              <div className="rsv__today">
                <dt>Today</dt>
                <dd className="num">$0</dd>
              </div>
            </dl>
            <ul className="rsv__points">
              <li>No card asked, no payment taken</li>
              <li>Held {RESERVE.holdHours} h after the launch email</li>
              <li>Release your reservation anytime</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
