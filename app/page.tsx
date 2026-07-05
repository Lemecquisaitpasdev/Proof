import Link from "next/link";
import Image from "next/image";
import Trait from "@/components/Trait";
import Posology from "@/components/Posology";
import ProductCard from "@/components/ProductCard";
import PatchVisual from "@/components/PatchVisual";
import { products } from "@/lib/products";
import { productImage } from "@/lib/product-image";

export default function HomePage() {
  const heroPhoto = productImage("hero");
  const ordonnancePhoto = productImage("ordonnance");

  return (
    <>
      {/* HÉROS */}
      <section className="hero">
        <div className="container">
          <span className="eyebrow">
            Premium silicone scar patch — Batch Nº 017
          </span>
          <h1 className="h1">
            Your scar
            <br />
            has a story.
          </h1>
          <div className="hero__grid">
            <div>
              <p className="lead measure">
                We made it something worth wearing. A medical-grade silicone
                patch that improves the appearance of scars — texture, color,
                relief — without asking them to disappear.
              </p>
              <div className="hero__cta">
                <Link href="/shop/the-ritual" className="btn btn--primary">
                  Shop The Ritual — $69
                </Link>
                <Link href="/story" className="btn btn--ghost">
                  Read the story
                </Link>
              </div>
            </div>
            <div className="hero__visual">
              {heroPhoto ? (
                <Image
                  src={heroPhoto}
                  alt="Proof — premium silicone scar patch"
                  fill
                  sizes="(max-width: 940px) 100vw, 460px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              ) : (
                <PatchVisual layers={1} count="5 × 15 cm" />
              )}
            </div>
          </div>

          <div className="statline">
            <span className="statline__item">
              Wear <em>12–23 h</em> daily
            </span>
            <span className="statline__item">
              Reusable <em>14 days</em>
            </span>
            <span className="statline__item">
              <em>Medical-grade</em> silicone
            </span>
            <span className="statline__item">
              Ships <em>worldwide</em>
            </span>
          </div>
        </div>
      </section>

      {/* LA BOUTIQUE */}
      <section className="section" id="shop">
        <div className="container">
          <span className="eyebrow">The shop — three chapters</span>
          <h2 className="h2" style={{ marginBottom: 40 }}>
            Pick your chapter.
          </h2>
          <div className="cards">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <Trait />
      </div>

      {/* LA SCIENCE */}
      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">The science</span>
            <h2 className="h2">
              Decades of clinical use. One material.
            </h2>
          </div>
          <div>
            <p className="measure">
              Silicone sheeting has been used on scars since 1983 and appears
              in international scar-management recommendations as a first-line
              option. No miracle vocabulary — a mechanism: occlusion and
              hydration, so the skin can regulate itself.
            </p>
            <p className="measure">
              We don&apos;t say heal. We don&apos;t say disappear. We say what
              the clinical literature says: improve the appearance.
            </p>
            <Link
              href="/science"
              className="btn btn--ghost"
              style={{ marginTop: 24 }}
            >
              Read the science
            </Link>
          </div>
        </div>
      </section>

      {/* LE RITUEL */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="eyebrow">The ritual</span>
          <h2 className="h2" style={{ marginBottom: 40 }}>
            One patch. One day. Repeat.
          </h2>
          <div className="steps">
            <div className="step">
              <span className="step__no">R.01</span>
              <h3 className="step__name">Clean</h3>
              <p>
                Wash the area with mild soap. Pat dry. The patch only commits
                to honest skin.
              </p>
            </div>
            <div className="step">
              <span className="step__no">R.02</span>
              <h3 className="step__name">Apply</h3>
              <p>
                Place the patch over the scar. Press for ten seconds. Cut it to
                size if the story is shorter.
              </p>
            </div>
            <div className="step">
              <span className="step__no">R.03</span>
              <h3 className="step__name">Wear</h3>
              <p>
                12 to 23 hours a day. Rinse the patch at night, let it air-dry,
                start again — for up to 14 days per patch.
              </p>
            </div>
          </div>
          <div
            className={ordonnancePhoto ? "ordgrid" : undefined}
            style={{ marginTop: "var(--gut)" }}
          >
            <Posology
              lines={[
                "Apply once daily on clean skin.",
                "Wear time : 12–23 h.",
              ]}
              sideEffects="Side effects : pride, confidence, questions at parties."
            />
            {ordonnancePhoto ? (
              <div className="imgframe">
                <Image
                  src={ordonnancePhoto}
                  alt="Proof — posology"
                  fill
                  sizes="(max-width: 860px) 100vw, 420px"
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

      {/* L'HISTOIRE */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">The story</span>
          <p className="quote measure" style={{ maxWidth: "18em" }}>
            In Japan, broken things are repaired <em>with gold.</em>
          </p>
          <p className="measure" style={{ marginTop: 28 }}>
            Kintsugi treats the repair as part of the object&apos;s history —
            more valuable, not less. That is the entire idea behind Proof.
            Honor it. Don&apos;t erase it.
          </p>
          <Link href="/story" className="btn btn--ghost" style={{ marginTop: 24 }}>
            Read the story
          </Link>
        </div>
      </section>
    </>
  );
}
