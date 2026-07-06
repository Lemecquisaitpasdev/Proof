import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Trait from "@/components/Trait";
import Posology from "@/components/Posology";
import { productImage } from "@/lib/product-image";

export const metadata: Metadata = {
  title: "Science",
  description:
    "Silicone sheeting has been used on scars since 1983 and is a first-line option in international scar-management recommendations. The mechanism: occlusion and hydration.",
};

export default function SciencePage() {
  const materialPhoto = productImage("science-material");
  const mechanismPhoto = productImage("science-mechanism");
  const texture = productImage("texture");

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow">The science<em className="jp" lang="ja" aria-hidden="true">科学</em></span>
          <h1 className="h1 h1--page">
            No miracles.
            <br />A mechanism.
          </h1>
          <p className="lead measure">
            Medical silicone is the only scar-care technology backed by decades
            of clinical use. Here is what it does, how, and what we refuse to
            claim.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">01 — The material</span>
            <h2 className="h2">Born in burn units.</h2>
          </div>
          <div>
            <p className="measure">
              Silicone gel sheeting entered scar care in 1983, on burn scars
              and contractures. Four decades later it is still the reference —
              not because the marketing was loud, but because the results kept
              being observed.
            </p>
            <p className="measure">
              Proof uses medical-grade silicone, the same family of material
              used in clinical settings, cut as a 5 × 15 cm patch you can trim
              to your scar.
            </p>
            {materialPhoto ? (
              <div className="imgframe" style={{ marginTop: 28 }}>
                <Image
                  src={materialPhoto}
                  alt="Medical-grade silicone — the material"
                  fill
                  sizes="(max-width: 860px) 100vw, 620px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="container">
        <Trait />
      </div>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">02 — The mechanism</span>
            <h2 className="h2">Occlusion. Hydration.</h2>
          </div>
          <div>
            <p className="measure">
              A scar that dries out overproduces collagen — that is what makes
              it raised, stiff, and darker than the skin around it. A silicone
              patch closes the surface, restores hydration in the outer layer
              of the skin, and lets the tissue regulate its own collagen
              production.
            </p>
            <p className="measure">
              Flatter. Softer. Closer to your skin tone. Worn 12 to 23 hours a
              day, over weeks — this is a discipline, not a spell.
            </p>
            <div style={{ marginTop: 28 }}>
              <Posology
                title="Mechanism — summary"
                lines={[
                  "Occlusion of the scar surface.",
                  "Hydration of the stratum corneum.",
                  "Collagen production regulates itself.",
                ]}
              />
            </div>
            {mechanismPhoto ? (
              <div className="imgframe" style={{ marginTop: "var(--gut)" }}>
                <Image
                  src={mechanismPhoto}
                  alt="Silicone — occlusion and hydration"
                  fill
                  sizes="(max-width: 860px) 100vw, 620px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="container">
        <Trait />
      </div>

      <section className={`section${texture ? " section--tex" : ""}`}>
        {texture ? (
          <div className="texbg" aria-hidden="true">
            <Image
              src={texture}
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}
        <div className="container split">
          <div>
            <span className="eyebrow">03 — The evidence<em className="jp" lang="ja" aria-hidden="true">記録</em></span>
            <h2 className="h2">On the record.</h2>
          </div>
          <div>
            <p className="measure">
              Silicone sheeting is listed as a first-line, non-invasive option
              in international scar-management recommendations, for both
              hypertrophic scars and keloids. Selected reading, for the
              curious:
            </p>
            <ul className="refs" style={{ marginTop: 24 }}>
              <li>
                <span>Ref. 01</span>Perkins et al., 1983 — Burns — first
                report of silicone gel sheeting on burn scars.
              </li>
              <li>
                <span>Ref. 02</span>Mustoe et al., 2002 — International
                clinical recommendations on scar management.
              </li>
              <li>
                <span>Ref. 03</span>Monstrey et al., 2014 — Updated
                international scar-management guidelines: silicone as
                first-line, non-invasive care.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container">
        <Trait />
      </div>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">04 — What we refuse to say</span>
            <h2 className="h2">The honest column.</h2>
          </div>
          <div>
            <p className="measure">
              We don&apos;t say heal. We don&apos;t say cure. We don&apos;t say
              disappear. The patch improves the appearance of scars — that is
              the claim, the whole claim, and it is enough.
            </p>
            <p className="measure">
              The scar stays. That is the point.
            </p>
            <div className="hero__cta">
              <Link href="/shop" className="btn btn--primary">
                Open the shop
              </Link>
              <Link href="/help" className="btn btn--ghost">
                Questions — Help
              </Link>
            </div>
            <p
              className="mono"
              style={{
                marginTop: 40,
                fontSize: 9.5,
                color: "var(--os-40)",
                letterSpacing: "0.14em",
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
