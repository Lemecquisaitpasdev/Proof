import Link from "next/link";
import Image from "next/image";
import KintsugiLine from "@/components/KintsugiLine";
import Posology from "@/components/Posology";
import ProductCard from "@/components/ProductCard";
import PressMarquee from "@/components/PressMarquee";
import RitualSteps from "@/components/RitualSteps";
import Mechanism from "@/components/Mechanism";
import { products } from "@/lib/products";
import { productImage } from "@/lib/product-image";

/* Séquence d'entrée du hero, eyebrow → titre (mots, 40ms) → lead → CTAs
   → image. Total < 1.6s. Les délais vivent ici, pas en JS. */
const D = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function HomePage() {
  const storyObject = productImage("story-object");
  const bouchon = productImage("bouchon");

  return (
    <>
      {/* HÉROS — le manifeste */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="mlabel enter" style={D(0)}>
              Medical-grade scar care / Engineered to honor, not hide
            </span>
            <h1 className="d1 hero__title" style={{ marginTop: 18 }}>
              <span className="w enter" style={D(0.14)}>
                Scars
              </span>{" "}
              <span className="w enter" style={D(0.18)}>
                are
              </span>{" "}
              <span className="w enter" style={D(0.22)}>
                not
              </span>{" "}
              <span className="w enter" style={D(0.26)}>
                flaws.
              </span>{" "}
              <span className="w enter" style={D(0.34)}>
                They are{" "}
                <span className="kword">
                  proof.
                  <KintsugiLine variant="underline" onload />
                </span>
              </span>
            </h1>
            <p className="lead hero__lead enter" style={D(0.44)}>
              Medical-grade silicone that improves the appearance of scars,
              texture, color, relief. Nothing is asked to disappear.
            </p>
            <div className="hero__cta enter" style={D(0.54)}>
              <Link href="/shop/protocol" className="btn btn--primary">
                Begin the protocol
              </Link>
              <Link href="/story" className="tlink klink">
                Read the manifesto
              </Link>
            </div>
          </div>
          <figure className="enter" style={{ ...D(0.58), margin: 0 }}>
            <div
              className="hero__visual hero__visual--portrait"
              style={{ aspectRatio: "1163 / 1353" }}
            >
              <div className="hero__parallax" data-parallax="2">
                <Image
                  src="/images/proofart.png"
                  alt="Proof, a profile in silhouette, the scar traced in gold, the P mark honored"
                  fill
                  sizes="(max-width: 940px) 100vw, 42vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
            <figcaption className="mcap">
              Photo 01 / Silhouette study / Gold line system
            </figcaption>
          </figure>
        </div>
      </section>

      {/* RÉASSURANCE — langage labo */}
      <div className="container">
        <div className="assure" data-reveal>
          <span>30-day protocol guarantee</span>
          <span>Free US shipping</span>
          <span>Dermatologist reviewed</span>
          <span>{`Batch Nº 017 / Est. 2026`}</span>
        </div>
      </div>

      {/* TROIS PORTES, apparitions / science / histoire */}
      <section className="section trio-sec">
        <div className="container">
          <div className="trio" data-reveal-group>
            <Link href="/story#world" className="trio__card" data-reveal>
              <Image
                src="/images/proofconferencekeynote.png"
                alt="The Proof 17 conference, on stage before a wall of magnified silicone"
                fill
                sizes="(max-width: 860px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <span className="trio__scrim" aria-hidden="true" />
              <span className="trio__body">
                <span className="trio__no">01 · In the world</span>
                <span className="trio__title">
                  Appearances &amp; awards
                  <i className="trio__line" aria-hidden="true" />
                </span>
                <span className="trio__cta">
                  Explore <span className="trio__arrow">→</span>
                </span>
              </span>
            </Link>

            <Link href="/science" className="trio__card" data-reveal>
              <Image
                src="/products/gelsiliconemicrospe.png"
                alt="Medical silicone magnified into a field of cells, exhibited on screen"
                fill
                sizes="(max-width: 860px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <span className="trio__scrim" aria-hidden="true" />
              <span className="trio__body">
                <span className="trio__no">02 · The evidence</span>
                <span className="trio__title">
                  What the science says
                  <i className="trio__line" aria-hidden="true" />
                </span>
                <span className="trio__cta">
                  Read <span className="trio__arrow">→</span>
                </span>
              </span>
            </Link>

            <Link href="/story" className="trio__card" data-reveal>
              <Image
                src={productImage("hero") ?? "/products/gelensiliconenutulisationfemme.png"}
                alt="Real skin, a visible scar worn openly, the story behind Proof"
                fill
                sizes="(max-width: 860px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <span className="trio__scrim" aria-hidden="true" />
              <span className="trio__body">
                <span className="trio__no">03 · The house</span>
                <span className="trio__title">
                  Our story
                  <i className="trio__line" aria-hidden="true" />
                </span>
                <span className="trio__cta">
                  Discover <span className="trio__arrow">→</span>
                </span>
              </span>
            </Link>
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
          <span className="mlabel" data-reveal>
            The protocol line / Ref: SCAR-01&mdash;04
          </span>
          <h2 className="d2" style={{ marginTop: 14, marginBottom: 56 }} data-reveal>
            Four instruments. One discipline.
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

      {/* LA SCIENCE, le seul moment sombre, cinématique */}
      <section className="section--hush section science">
        <div className="container">
          <div className="science__grid">
            <div data-reveal>
              <span className="mlabel">Method: occlusion therapy / Since 1983</span>
              <h2 className="d3" style={{ marginTop: 14, maxWidth: "13ch" }}>
                Precision healing. Verified by protocol.
              </h2>
              <p className="measure" style={{ marginTop: 28 }}>
                Silicone sheeting has been used on scars since 1983 and appears
                in international scar-management recommendations as a first-line
                option. No miracle vocabulary, a mechanism: occlusion and
                hydration, so the skin can regulate itself.
              </p>
              <p className="exergue" style={{ marginTop: 40 }}>
                We don&apos;t say heal. We don&apos;t say disappear. We say what
                the literature says, <em>improve the appearance.</em>
              </p>
              <Link href="/science" className="tlink klink" style={{ marginTop: 40 }}>
                Read the science
              </Link>
            </div>
            <div data-reveal>
              <Mechanism />
            </div>
          </div>
        </div>
      </section>

      {/* LE RITUEL */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="mlabel" data-reveal>
            Daily protocol / Wear time 12&ndash;23 h
          </span>
          <h2 className="d3" style={{ marginTop: 14, marginBottom: 48 }} data-reveal>
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
                  text: "12 to 23 hours a day. Rinse the patch at night, let it air-dry, start again, for up to 14 days per patch.",
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
              sideEffects="Observed effects: a ritual kept. A scar carried differently."
            />
          </div>
        </div>
      </section>

      {/* STATEMENT — un seul message par écran */}
      <section className="section--hush section" aria-label="Honor it. Don't erase it.">
        <div className="container">
          <p className="statement" data-reveal>
            Honor it.
            <br />
            Don&apos;t&nbsp;erase&nbsp;it.
          </p>
        </div>
      </section>

      {/* L'OBJET, bande sombre : la recharge, l'écologie, l'économie */}
      <section className="section feature">
        <div className="container feature__grid feature__grid--flip">
          <div className="feature__copy" data-reveal>
            <span className="eyebrow">The monthly refill</span>
            <h2 className="d3">Made to be kept.</h2>
            <p className="measure" style={{ marginTop: 24 }}>
              The brushed-steel cap, embossed with the P, is the object, yours
              to keep. The gel arrives on subscription, a fresh refill every
              month, so the ritual never runs dry. Refill, don&apos;t replace.
            </p>
            <ul className="feature__list">
              <li>A fresh gel refill every month, delivered to your door</li>
              <li>Keep the steel cap for good, only the gel is renewed</li>
              <li>One object kept, one package spared, less waste by design</li>
              <li>Pause, skip or cancel anytime, always on your terms</li>
            </ul>
            <div className="feature__cta">
              <Link href="/shop/the-gel" className="btn btn--primary">
                Start your refill
              </Link>
              <Link href="/story" className="tlink klink">
                Read the story
              </Link>
            </div>
          </div>
          <figure className="feature__media" data-reveal>
            {bouchon ? (
              <div className="hero__parallax" data-parallax="5">
                <Image
                  src={bouchon}
                  alt="Proof, brushed-steel caps embossed with the P monogram"
                  fill
                  sizes="(max-width: 940px) 100vw, 55vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
          </figure>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      {/* L'HISTOIRE, contemplative */}
      <section className="section--hush section">
        <div className="container story__grid story__grid--flip">
          <div>
            <span className="eyebrow" data-reveal>
              The story
            </span>
            <p className="d2 story__quote" data-reveal>
              In Japan, broken things are repaired{" "}
              <span className="kword kword--strike">
                with gold
                <KintsugiLine variant="strike" />
              </span>
              .
            </p>
            <p className="measure" style={{ marginTop: 32 }} data-reveal>
              Kintsugi treats the repair as part of the object&apos;s history,
              more valuable, not less. That is the entire idea behind Proof.
              Honor it. Don&apos;t erase it.
            </p>
            <div data-reveal>
              <Link href="/story" className="tlink klink" style={{ marginTop: 32 }}>
                Read the story
              </Link>
            </div>
          </div>
          <figure className="story__figure" data-reveal>
            {storyObject ? (
              <div className="hero__parallax" data-parallax="5">
                <Image
                  src={storyObject}
                  alt="Proof packaging, the gold seam, a crack repaired with light"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
          </figure>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      {/* RACONTEZ-NOUS, l'histoire de la cicatrice → 10 % (carnet acier Proof 17) */}
      <section className="section">
        <div className="container tellus__grid">
          <figure className="tellus__figure" data-reveal>
            <div className="hero__parallax" data-parallax="4">
              <Image
                src="/images/carnetenacier.png"
                alt="The Proof 17 book, a brushed-steel journal, the scar kept as a thin gold seam"
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </figure>
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">Season 01 · The line</span>
            <h2 className="d2">Tell us your scar&apos;s story.</h2>
            <p className="measure" style={{ marginTop: 24 }}>
              Each season, one real scar becomes the gold line that runs across
              this whole site. Send us yours, how it happened, what it changed,
              what it taught you. We keep them in the Proof 17 book.
            </p>
            <div className="tellus__reward">
              <span className="tellus__code">Code Proof17</span>
              <span className="tellus__rewardtext">
                10% off the whole shop, in thanks for your story.
              </span>
            </div>
            <div className="tellus__cta">
              <a
                className="btn btn--primary"
                href={`mailto:contactus@trackk.fr?subject=${encodeURIComponent(
                  "PROOF, the story of my scar",
                )}&body=${encodeURIComponent(
                  "Here is the story of my scar:\n\nThe how, the when, what it changed.\n",
                )}`}
              >
                Share your story
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      {/* PHASE 02, L'APP à venir (teaser, image notification téléphone) */}
      <section className="section appsoon">
        <div className="container appsoon__grid">
          <div className="appsoon__copy" data-reveal>
            <span className="eyebrow eyebrow--gold">Phase 02 · The app</span>
            <h2 className="d2">Soon, in your pocket.</h2>
            <p className="measure" style={{ marginTop: 24 }}>
              An app is on the way. The whole ritual carried with you, private
              when you want it, shared when you are ready.
            </p>
            <ul className="applist">
              <li>
                Follow your scar week by week, a quiet timeline of how it
                softens.
              </li>
              <li>
                Reorder your refills in a tap, with member drops and the
                occasional promo.
              </li>
              <li>
                Share your story, and read others, in a community that keeps its
                marks.
              </li>
              <li>Gentle reminders for wear time, so the ritual holds.</li>
            </ul>
            <div className="appsoon__cta">
              <span className="appsoon__tag">Coming 2026 · iOS &amp; Android</span>
            </div>
          </div>
          <figure className="appsoon__media" data-reveal>
            <div className="hero__parallax" data-parallax="4">
              <Image
                src="/images/notificationproof.png"
                alt="Proof, the P lit on a phone screen, the app coming soon"
                fill
                sizes="(max-width: 940px) 100vw, 52vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </figure>
        </div>
      </section>

      {/* CLÔTURE DU MANIFESTE — l'appartenance */}
      <section className="section--hush section">
        <div className="container">
          <p className="statement" data-reveal>
            Your scar
            <br />
            is&nbsp;proof.
          </p>
          <p className="lead measure" style={{ marginTop: 36 }} data-reveal>
            One email when a batch ships. One story each season. Nothing else.
          </p>
          <div className="hero__cta" style={{ marginTop: 36 }} data-reveal>
            <a
              className="btn btn--primary"
              href={`mailto:contactus@trackk.fr?subject=${encodeURIComponent(
                "PROOF, join the proven",
              )}&body=${encodeURIComponent("Count me in for the next batch.\n")}`}
            >
              Join the proven
            </a>
          </div>
          <div className="refline" data-reveal>
            <span>Proof / Medical-grade scar care</span>
            <span>Ref: PROOF-SITE-01</span>
            <span>[ Batch 4099XF ]</span>
            <span>Est. 2026 / US</span>
          </div>
        </div>
      </section>
    </>
  );
}
