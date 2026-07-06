import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import Trait from "@/components/Trait";
import Posology from "@/components/Posology";
import ProductCard from "@/components/ProductCard";
import PatchVisual from "@/components/PatchVisual";
import PressMarquee from "@/components/PressMarquee";
import { products } from "@/lib/products";
import { productImage } from "@/lib/product-image";

export default function HomePage() {
  const heroPhoto = productImage("hero");
  const ordonnancePhoto = productImage("ordonnance");
  const bandPhoto = productImage("story-object");

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
              <span className="vtext hero__vtag" lang="ja" aria-hidden="true">
                傷は物語
              </span>
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

          <PressMarquee />
        </div>
      </section>

      {/* LA BOUTIQUE */}
      <section className="section" id="shop">
        <div className="container">
          <div data-reveal>
            <span className="eyebrow">
              The shop — four chapters
              <em className="jp" lang="ja" aria-hidden="true">
                全四章
              </em>
            </span>
            <h2 className="h2" style={{ marginBottom: 40 }}>
              Pick your chapter.
            </h2>
          </div>
          <div className="cards cards--four">
            {products.map((p, i) => (
              <div
                key={p.slug}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LA BANDE — le packaging, la fissure d'or */}
      {bandPhoto ? (
        <section className="band" aria-label="Proof packaging">
          <Image
            src={bandPhoto}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 58%" }}
          />
          <span className="vtext band__vtag" lang="ja" aria-hidden="true">
            金継ぎ
          </span>
          <div className="band__inner">
            <div className="container" data-reveal>
              <p className="band__line">Honorer. Pas effacer.</p>
              <p className="band__sub">
                The packaging carries the crack — gold, not camouflage
              </p>
            </div>
          </div>
        </section>
      ) : (
        <div className="container">
          <Trait />
        </div>
      )}

      {/* LA SCIENCE */}
      <section className="section section--grand">
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow">
              The science
              <em className="jp" lang="ja" aria-hidden="true">
                記録
              </em>
            </span>
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
          <div data-reveal>
            <span className="eyebrow">
              The ritual
              <em className="jp" lang="ja" aria-hidden="true">
                儀式
              </em>
            </span>
            <h2 className="h2" style={{ marginBottom: 40 }}>
              One patch. One day. Repeat.
            </h2>
          </div>
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
      <section className="section section--grand">
        <div className="container" data-reveal>
          <span className="eyebrow">
            The story
            <em className="jp" lang="ja" aria-hidden="true">
              物語
            </em>
          </span>
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
