import Link from "next/link";
import Posology from "@/components/Posology";

export default function NotFound() {
  return (
    <section className="pagehead section">
      <div className="container">
        <span className="mlabel">Error 404 / No record on file</span>
        <h1 className="d1" style={{ marginTop: 16 }}>
          This path left
          <br />
          no trace.
          <br />
          Your scar did.
        </h1>
        <p className="lead measure">
          Nothing was recorded at this address. What is worth keeping is
          elsewhere.
        </p>
        <div style={{ maxWidth: 560, marginTop: 36 }}>
          <Posology
            title="Diagnosis"
            lines={["Page: not found.", "Prognosis: excellent."]}
            sideEffects="Prescription: return to the protocol."
          />
        </div>
        <div className="hero__cta">
          <Link href="/shop" className="btn btn--primary">
            Begin the protocol
          </Link>
          <Link href="/" className="btn btn--ghost">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
