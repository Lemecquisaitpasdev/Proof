import type { Metadata } from "next";
import Link from "next/link";
import Trait from "@/components/Trait";
import Posology from "@/components/Posology";

export const metadata: Metadata = {
  title: "Story",
  description:
    "Kintsugi treats the repair as part of the object's history. Proof applies the same idea to skin. Honor it. Don't erase it.",
};

export default function StoryPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow">The story</span>
          <h1 className="h1 h1--page">
            Honor it.
            <br />
            Don&apos;t erase it.
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">01 — Kintsugi</span>
            <h2 className="h2">The gold repair.</h2>
          </div>
          <div>
            <p className="measure">
              In Japan, when a bowl breaks, it is not thrown away. It is
              repaired with lacquer and gold, and the seam becomes the most
              valuable line on the object. The repair is not hidden. It is the
              history, made visible and made precious.
            </p>
            <p className="measure">
              The beauty industry has spent a century selling the opposite
              idea: that marked skin is a problem, that the goal is blank. We
              think blank is a strange ambition for a body that has done
              things.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <Trait />
      </div>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">02 — The object</span>
            <h2 className="h2">Clinical luxury.</h2>
          </div>
          <div>
            <p className="measure">
              Proof is a silicone patch with the rigor of a medical device and
              the manners of a niche perfumery object. Medical-grade silicone,
              5 × 15 centimeters, worn 12 to 23 hours a day. It improves the
              appearance of the scar — the texture, the color, the relief.
            </p>
            <p className="measure">
              It does not promise disappearance, because disappearance is not
              the point. The point is a scar you carry on purpose, looked
              after, worn like anything else you value.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <Trait />
      </div>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">03 — Le trait</span>
            <h2 className="h2">One real line.</h2>
          </div>
          <div>
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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="quote measure" style={{ maxWidth: "20em" }}>
            The scar stays. <em>That is the point.</em>
          </p>
          <div className="hero__cta">
            <Link href="/shop" className="btn btn--primary">
              Open the shop
            </Link>
            <Link href="/science" className="btn btn--ghost">
              Read the science
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
