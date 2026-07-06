import Link from "next/link";
import Image from "next/image";
import KintsugiLine from "@/components/KintsugiLine";
import Posology from "@/components/Posology";
import ProductCard from "@/components/ProductCard";
import PressMarquee from "@/components/PressMarquee";
import RitualSteps from "@/components/RitualSteps";
import { products } from "@/lib/products";
import { productImage } from "@/lib/product-image";

/* Séquence d'entrée du hero — eyebrow → titre (mots, 40ms) → lead → CTAs
   → image. Total < 1.6s. Les délais vivent ici, pas en JS. */
const D = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function HomePage() {
  const heroPhoto = productImage("hero");

  return (
    <>
      {/* HÉROS */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow enter" style={D(0)}>
              Premium silicone scar patch — Batch Nº 017
            </span>
            <h1 className="d1 hero__title">
              <span className="w enter" style={D(0.14)}>
                Your
              </span>{" "}
              <span className="w enter" style={D(0.18)}>
                scar
              </span>{" "}
              <span className="w enter" style={D(0.22)}>
                has
              </span>{" "}
              <span className="w enter" style={D(0.26)}>
                a
              </span>{" "}
              <span className="w enter" style={D(0.3)}>
                <span className="kword">
                  story.
                  <KintsugiLine variant="underline" onload />
                </span>
              </span>
            </h1>
            <p className="lead hero__lead enter" style={D(0.4)}>
              We made it something worth wearing. A medical-grade silicone
              patch that improves the appearance of scars — texture, color,
              relief — without asking them to disappear.
            </p>
            <div className="hero__cta enter" style={D(0.52)}>
              <Link href="/shop/the-ritual" className="btn btn--primary">
                Shop The Ritual — $69
              </Link>
              <Link href="/story" className="tlink klink">
                Read the story
              </Link>
            </div>
          </div>
          <div className="hero__visual enter" style={D(0.58)}>
            {heroPhoto ? (
              <div className="hero__parallax" data-parallax="6">
                <Image
                  src={heroPhoto}
                  alt="Real skin, a visible scar, worn openly — Proof silicone scar care"
                  fill
                  sizes="(max-width: 940px) 100vw, 42vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* PRESSE */}
      <div className="container">
        <PressMarquee />
      </div>

      {/* LA BOUTIQUE */}
      <section className="section" id="shop">
        <div className="container">
          <span className="eyebrow" data-reveal>
            The shop — four chapters
          </span>
          <h2 className="d2" style={{ marginBottom: 56 }} data-reveal>
            Pick your chapter.
          </h2>
          <div className="cards" data-reveal-group>
            {products.map((p) => (
              <div key={p.slug} data-reveal>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      {/* LA SCIENCE — version courte (le moment sombre vit sur sa section) */}
      <section className="section">
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow">The science</span>
            <h2 className="d3">Decades of clinical use. One material.</h2>
          </div>
          <div data-reveal>
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
              className="tlink klink"
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
          <span className="eyebrow" data-reveal>
            The ritual
          </span>
          <h2 className="d2" style={{ marginBottom: 48 }} data-reveal>
            One patch. One day. Repeat.
          </h2>
          <div data-reveal>
            <RitualSteps
              steps={[
                {
                  no: "R.01",
                  name: "Clean",
                  text: "Wash the area with mild soap. Pat dry. The patch only commits to honest skin.",
                  image: productImage("ritual-clean"),
                },
                {
                  no: "R.02",
                  name: "Apply",
                  text: "Place the patch over the scar. Press for ten seconds. Cut it to size if the story is shorter.",
                  image: productImage("ritual-apply"),
                },
                {
                  no: "R.03",
                  name: "Wear",
                  text: "12 to 23 hours a day. Rinse the patch at night, let it air-dry, start again — for up to 14 days per patch.",
                  image: productImage("ritual-wear"),
                },
              ]}
            />
          </div>
          <div style={{ marginTop: 48, maxWidth: 560 }} data-reveal>
            <Posology
              lines={[
                "Apply once daily on clean skin.",
                "Wear time : 12–23 h.",
              ]}
              sideEffects="Side effects : pride, confidence, questions at parties."
            />
          </div>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      {/* L'HISTOIRE */}
      <section className="section--hush section">
        <div className="container">
          <span className="eyebrow" data-reveal>
            The story
          </span>
          <p className="d2 story__quote" data-reveal>
            In Japan, broken things are repaired with gold.
          </p>
          <p className="measure" style={{ marginTop: 32 }} data-reveal>
            Kintsugi treats the repair as part of the object&apos;s history —
            more valuable, not less. That is the entire idea behind Proof.
            Honor it. Don&apos;t erase it.
          </p>
          <div data-reveal>
            <Link
              href="/story"
              className="tlink klink"
              style={{ marginTop: 32 }}
            >
              Read the story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
