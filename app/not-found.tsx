import Link from "next/link";
import Posology from "@/components/Posology";

export default function NotFound() {
  return (
    <section className="pagehead section">
      <div className="container">
        <span className="eyebrow">Error 404</span>
        <h1 className="d1">
          This page left
          <br />
          no scar.
        </h1>
        <p className="lead measure">
          Nothing was recorded at this address. The story continues in the
          shop.
        </p>
        <div style={{ maxWidth: 560, marginTop: 36 }}>
          <Posology
            title="Diagnosis"
            lines={["Page : not found.", "Prognosis : excellent."]}
            sideEffects="Side effects : a shortcut back home."
          />
        </div>
        <div className="hero__cta">
          <Link href="/shop" className="btn btn--primary">
            Open the shop
          </Link>
          <Link href="/" className="btn btn--ghost">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
