import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import KintsugiLine from "@/components/KintsugiLine";
import Posology from "@/components/Posology";
import Mechanism from "@/components/Mechanism";
import { productImage } from "@/lib/product-image";

export const metadata: Metadata = {
  title: "Science",
  description:
    "Silicone sheeting has been used on scars since 1983 and is a first-line option in international scar-management recommendations. The mechanism: occlusion and hydration.",
};

export default function SciencePage() {
  const material = productImage("science-material");
  const mechanism = productImage("science-mechanism");
  const pattern = productImage("science-pattern");

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="mlabel enter">
            Clinical file / Method: occlusion therapy / Since 1983
          </span>
          <h1
            className="d1 enter"
            style={{ "--d": ".1s", marginTop: 16, maxWidth: "16ch" } as React.CSSProperties}
          >
            Precision healing. Verified by protocol.
          </h1>
          <p
            className="lead measure enter"
            style={{ "--d": ".22s" } as React.CSSProperties}
          >
            Medical silicone is the only scar-care technology backed by decades
            of clinical use. Here is what it does, how, and what we refuse to
            claim.
          </p>
        </div>
      </section>

      {/* LA MATIÈRE, EXPOSÉE, macro du gel en installation */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="container">
          <figure className="matband" data-reveal>
            <div className="matband__media">
              <Image
                src="/products/gelsiliconemicrospe.png"
                alt="Cohesive medical silicone magnified into a gallery-scale field of cells"
                fill
                sizes="(max-width: 1200px) 100vw, 1120px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mcap">
              Silicone study / Magnified field / Exhibit 02
            </figcaption>
          </figure>
          <div className="assure" style={{ marginTop: 40 }} data-reveal>
            <span>1983 / First clinical report</span>
            <span>12&ndash;23 h / Daily wear</span>
            <span>16 weeks / Post-op window</span>
            <span>First-line / International guidelines</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">01 · The material</span>
            <h2 className="d3">Born in burn units.</h2>
          </div>
          <div data-reveal>
            <p className="measure">
              Silicone gel sheeting entered scar care in 1983, on burn scars
              and contractures. Four decades later it is still the reference,
              not because the marketing was loud, but because the results kept
              being observed.
            </p>
            <p className="measure">
              Proof uses medical-grade silicone, the same family of material
              used in clinical settings, cut as a 5 × 15 cm patch you can trim
              to your scar.
            </p>
            {material ? (
              <figure className="imgframe" style={{ marginTop: 32, aspectRatio: "1233 / 1275" }}>
                <Image
                  src={material}
                  alt="Analytical precision, medical silicone under laboratory testing"
                  fill
                  sizes="(max-width: 860px) 100vw, 58vw"
                  style={{ objectFit: "cover" }}
                />
              </figure>
            ) : null}
          </div>
        </div>
      </section>

      {/* LE MÉCANISME, la seule bande sombre de la page */}
      <section className="section--hush section science">
        <div className="container">
          <div className="science__grid">
            <div data-reveal>
              <span className="eyebrow eyebrow--gold">02 · The mechanism</span>
              <h2 className="d3" style={{ maxWidth: "12ch" }}>
                Occlusion. Hydration.
              </h2>
              <p className="measure" style={{ marginTop: 28 }}>
                A scar that dries out overproduces collagen, that is what makes
                it raised, stiff, and darker than the skin around it. A silicone
                patch closes the surface, restores hydration in the outer layer
                of the skin, and lets the tissue regulate its own collagen
                production.
              </p>
              <p className="exergue" style={{ marginTop: 40 }}>
                Flatter. Softer. Closer to your skin tone, worn{" "}
                <em>12 to 23 hours a day, over weeks.</em>
              </p>
            </div>
            <div data-reveal>
              <Mechanism />
              {mechanism ? (
                <figure className="sci-layers">
                  <Image
                    src={mechanism}
                    alt="The three-layer structure of the silicone film, in section"
                    fill
                    sizes="(max-width: 900px) 100vw, 44vw"
                    style={{ objectFit: "cover" }}
                  />
                </figure>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {pattern ? (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container">
            <figure className="patternband" data-reveal>
              <div className="patternband__media">
                <Image
                  src={pattern}
                  alt="Cohesive silicone, magnified into a repeating field of cells"
                  fill
                  sizes="(max-width: 1200px) 100vw, 1120px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="mcap">
                Cell pattern / Cohesive silicone / Exhibit 03
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">03 · The evidence</span>
            <h2 className="d3">On the record.</h2>
          </div>
          <div data-reveal>
            <p className="measure">
              Silicone sheeting is listed as a first-line, non-invasive option
              in international scar-management recommendations, for both
              hypertrophic scars and keloids. Selected reading, for the curious:
            </p>
            <ul className="refs" style={{ marginTop: 24 }}>
              <li>
                <span>Ref. 01</span>Perkins et al., 1983, Burns, first report
                of silicone gel sheeting on burn scars.
              </li>
              <li>
                <span>Ref. 02</span>Mustoe et al., 2002, International clinical
                recommendations on scar management.
              </li>
              <li>
                <span>Ref. 03</span>Monstrey et al., 2014, Updated
                international scar-management guidelines: silicone as
                first-line, non-invasive care.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">
              04 · What we refuse to say
            </span>
            <h2 className="d3">The honest column.</h2>
          </div>
          <div data-reveal>
            <p className="measure">
              We don&apos;t say heal. We don&apos;t say cure. We don&apos;t say
              disappear. The patch improves the appearance of scars, that is
              the claim, the whole claim, and it is enough.
            </p>
            <p className="exergue" style={{ marginTop: 32, marginBottom: 32 }}>
              The scar stays. <em>That is the point.</em>
            </p>
            <div style={{ marginBottom: 32 }}>
              <Posology
                title="Mechanism, summary"
                lines={[
                  "Occlusion of the scar surface.",
                  "Hydration of the stratum corneum.",
                  "Collagen production regulates itself.",
                ]}
              />
            </div>
            <div className="hero__cta">
              <Link href="/shop" className="btn btn--primary">
                Open the shop
              </Link>
              <Link href="/help" className="tlink klink">
                Questions, Help
              </Link>
            </div>
            <p
              className="mono"
              style={{
                marginTop: 40,
                fontSize: 9.5,
                color: "var(--dim)",
                letterSpacing: "0.12em",
                maxWidth: "68ch",
              }}
            >
              Proof improves the appearance of scars. It is not intended to
              diagnose, treat, cure, or prevent any disease. For post-surgical
              use, wait until the wound is fully closed and follow your
              clinician&apos;s advice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
