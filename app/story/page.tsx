import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import KintsugiLine from "@/components/KintsugiLine";
import Posology from "@/components/Posology";
import PlateVisual from "@/components/PlateVisual";
import { productImage } from "@/lib/product-image";

export const metadata: Metadata = {
  title: "Story",
  description:
    "Kintsugi treats the repair as part of the object's history. Proof applies the same idea to skin. Honor it. Don't erase it.",
};

export default function StoryPage() {
  const objectPhoto = productImage("story-object");
  /* Photo du fondateur, fournie plus tard : si absente, plate CSS (jamais cassé) */
  const founderPhoto = fs.existsSync(
    path.join(process.cwd(), "public", "images", "founder-story.jpg"),
  )
    ? "/images/founder-story.jpg"
    : null;

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="mlabel enter">
            The manifesto / Filed 2026 / Kintsugi protocol
          </span>
          <h1
            className="d1 enter"
            style={{ "--d": ".1s", maxWidth: "16ch" } as React.CSSProperties}
          >
            Honor it. Don&apos;t erase it.
          </h1>
        </div>
      </section>

      {/* KINTSUGI, contemplative */}
      <section className="section--hush section">
        <div className="container story__grid">
          <div>
            <span className="eyebrow eyebrow--gold" data-reveal>
              01 · Kintsugi
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
                  alt="Proof packaging, the gold seam, a crack repaired with light"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
            <figcaption className="story__caption">
              The seam, kept, not hidden.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      {/* THE FOUNDER */}
      <section className="section">
        <div className="container story__grid" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow eyebrow--gold" data-reveal>
              02 · The founder
            </span>
            <h2 className="d2" data-reveal>
              Founded after{" "}
              <span className="kword">
                17 stitches
                <KintsugiLine variant="underline" />
              </span>
            </h2>
            <p className="measure" style={{ marginTop: 32 }} data-reveal>
              It started on a road, far from home. A motorcycle, a crash, a
              brush with something final. Rayane woke in an emergency clinic on
              the other side of the world with 17 stitches across his cheek and
              temple.
            </p>
            <p className="measure" style={{ marginTop: 24 }} data-reveal>
              The wound closed. Then came the harder part. He went looking for
              something to care for the scar, a patch, a gel, one brand he could
              trust. He found none. Just shelves of nameless products all
              speaking the same language: erase, hide, fade it away. As if the
              scar shouldn&apos;t be there. As if caring for it was something to
              feel guilty about.
            </p>
            <p className="measure" style={{ marginTop: 24 }} data-reveal>
              Then he travelled to Japan. There he found kintsugi, broken
              objects repaired with gold, the crack never hidden but filled,
              made part of the piece, made precious. And it all made sense.
            </p>
            <p className="measure" style={{ marginTop: 24 }} data-reveal>
              His scar wasn&apos;t a flaw to erase. It was proof he survived,
              proof of a chapter that changed him. It deserved to be softened
              and cared for with the best there is, because a hardship is meant
              to be overcome, not hidden in a drawer. You honor it by giving it
              real care, not by pretending it was never there.
            </p>
            <p className="measure" style={{ marginTop: 24 }} data-reveal>
              So he built the brand he couldn&apos;t find.
            </p>
            <p className="d3" style={{ marginTop: 44 }} data-reveal>
              This is{" "}
              <span className="kword">
                Proof.
                <KintsugiLine variant="underline" />
              </span>
            </p>
          </div>
          <figure className="story__figure" data-reveal>
            {founderPhoto ? (
              <div className="hero__parallax" data-parallax="6">
                <Image
                  src={founderPhoto}
                  alt="Rayane, the founder, the scar he chose to care for"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <PlateVisual />
            )}
          </figure>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      <section className="section">
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">03 · The object</span>
            <h2 className="d3">Clinical luxury.</h2>
          </div>
          <div data-reveal>
            <p className="measure">
              Proof is a silicone patch with the rigor of a medical device and
              the manners of a niche perfumery object. Medical-grade silicone,
              5 × 15 centimeters, worn 12 to 23 hours a day. It improves the
              appearance of the scar, the texture, the color, the relief.
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
            <span className="eyebrow eyebrow--gold">04 · The line</span>
            <h2 className="d3">One real line.</h2>
          </div>
          <div data-reveal>
            <p className="measure">
              The gold line that crosses this site is not a decoration. It is
              traced from a real scar, one customer, one story, one season.
              Each season, a new line replaces it.
            </p>
            <p className="measure">
              Season 01 opens with the first drop. If you want your line to be
              the one, send us its story.
            </p>
            <div style={{ marginTop: 32 }}>
              <Posology
                title="Manifesto, summary"
                lines={[
                  "Your scar has a story.",
                  "We made it something worth wearing.",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      {/* IN THE WORLD, la keynote PROOF 17 */}
      <section className="section" id="world">
        <div className="container story__grid" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow eyebrow--gold" data-reveal>
              05 · In the world
            </span>
            <h2 className="d2" data-reveal>
              Said out loud.
            </h2>
            <p className="measure" style={{ marginTop: 32 }} data-reveal>
              The idea does not stay in the bottle. Kept, not hidden, it travels
              into rooms and onto screens, into the way people talk about the
              marks they carry.
            </p>
            <p className="measure" style={{ marginTop: 24 }} data-reveal>
              Same four words, on a stage the size of a wall. Honor it.
              Don&apos;t erase it.
            </p>
            <p className="measure" style={{ marginTop: 24 }} data-reveal>
              And on a lit shelf, at eye level, where the protocol is picked up
              without a word being said.
            </p>
          </div>
          <div className="worldpair" data-reveal>
            <figure className="worldpair__fig">
              <div className="worldpair__media">
                <Image
                  src="/images/proofconferencekeynote.png"
                  alt="The Proof 17 conference, a keynote before a wall-sized screen of magnified silicone"
                  fill
                  sizes="(max-width: 900px) 100vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="mcap">The Proof 17 Conference</figcaption>
            </figure>
            <figure className="worldpair__fig">
              <div className="worldpair__media">
                <Image
                  src="/images/distributeurproof.png"
                  alt="A lit Proof 17 dispenser, the line stocked shelf by shelf"
                  fill
                  sizes="(max-width: 900px) 100vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="mcap">The Proof 17 dispenser</figcaption>
            </figure>
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
