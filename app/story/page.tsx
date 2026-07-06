import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import KintsugiLine from "@/components/KintsugiLine";
import Posology from "@/components/Posology";
import { productImage } from "@/lib/product-image";

export const metadata: Metadata = {
  title: "Story",
  description:
    "Kintsugi treats the repair as part of the object's history. Proof applies the same idea to skin. Honor it. Don't erase it.",
};

export default function StoryPage() {
  const objectPhoto = productImage("story-object");

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow enter">The story</span>
          <h1
            className="d1 enter"
            style={{ "--d": ".1s", maxWidth: "16ch" } as React.CSSProperties}
          >
            Honor it. Don&apos;t erase it.
          </h1>
        </div>
      </section>

      {/* KINTSUGI — contemplative */}
      <section className="section--hush section">
        <div className="container story__grid">
          <div>
            <span className="eyebrow eyebrow--gold" data-reveal>
              01 — Kintsugi
            </span>
            <p className="d2 story__quote" data-reveal>
              Broken things are repaired{" "}
              <span className="kword kword--strike">
                with gold
                <KintsugiLine variant="strike" />
              </span>
              .
            </p>
            <p className="measure" style={{ marginTop: 32 }} data-reveal>
              In Japan, when a bowl breaks, it is not thrown away. It is
              repaired with lacquer and gold, and the seam becomes the most
              valuable line on the object. The repair is not hidden. It is the
              history, made visible and made precious.
            </p>
            <p className="measure" data-reveal>
              The beauty industry has spent a century selling the opposite
              idea: that marked skin is a problem, that the goal is blank. We
              think blank is a strange ambition for a body that has done things.
            </p>
          </div>
          <figure className="story__figure" data-reveal>
            {objectPhoto ? (
              <div className="hero__parallax" data-parallax="6">
                <Image
                  src={objectPhoto}
                  alt="Proof packaging — the gold seam, a crack repaired with light"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
            <figcaption className="story__caption">
              The seam, kept — not hidden.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      <section className="section">
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">02 — The object</span>
            <h2 className="d3">Clinical luxury.</h2>
          </div>
          <div data-reveal>
            <p className="measure">
              Proof is a silicone patch with the rigor of a medical device and
              the manners of a niche perfumery object. Medical-grade silicone,
              5 × 15 centimeters, worn 12 to 23 hours a day. It improves the
              appearance of the scar — the texture, the color, the relief.
            </p>
            <p className="exergue" style={{ marginTop: 32 }}>
              It does not promise disappearance, because{" "}
              <em>disappearance is not the point.</em>
            </p>
            <p className="measure" style={{ marginTop: 32 }}>
              The point is a scar you carry on purpose, looked after, worn like
              anything else you value.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">03 — The line</span>
            <h2 className="d3">One real line.</h2>
          </div>
          <div data-reveal>
            <p className="measure">
              The gold line that crosses this site is not a decoration. It is
              traced from a real scar — one customer, one story, one season.
              Each season, a new line replaces it.
            </p>
            <p className="measure">
              Season 01 opens with the first drop. If you want your line to be
              the one, send us its story.
            </p>
            <div style={{ marginTop: 32 }}>
              <Posology
                title="Manifesto — summary"
                lines={[
                  "Your scar has a story.",
                  "We made it something worth wearing.",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section--hush section">
        <div className="container" style={{ textAlign: "center" }}>
          <p
            className="d2"
            style={{ maxWidth: "18ch", marginInline: "auto" }}
            data-reveal
          >
            The scar stays. That is the point.
          </p>
          <div
            className="hero__cta"
            style={{ justifyContent: "center", marginTop: 40 }}
            data-reveal
          >
            <Link href="/shop" className="btn btn--primary">
              Open the shop
            </Link>
            <Link href="/science" className="tlink klink">
              Read the science
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
