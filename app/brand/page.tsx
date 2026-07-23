import type { Metadata } from "next";
import Image from "next/image";
import KintsugiLine from "@/components/KintsugiLine";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "The Proof mark, a geometric P with a single cut, the scar honored. Download the logo for social and press.",
};

/* Le P de Proof : géométrique, une fine fente diagonale détache un éclat
   en haut-gauche, la coupure honorée. */
const P_PATH =
  "M22 12 L92 12 L92 66 L46 66 L46 112 L22 112 Z M46 32 L72 32 L72 48 L46 48 Z M41.8 13.8 L23.8 31.8 L20.2 28.2 L38.2 10.2 Z";

function PMark({ fill }: { fill: string }) {
  return (
    <svg viewBox="16 6 80 110" aria-hidden="true">
      <path fill={fill} fillRule="evenodd" d={P_PATH} />
    </svg>
  );
}

export default function BrandPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow enter">Brand</span>
          <h1
            className="d1 enter"
            style={{ "--d": ".1s", maxWidth: "12ch" } as React.CSSProperties}
          >
            The mark.
          </h1>
          <p
            className="lead measure enter"
            style={{ "--d": ".22s" } as React.CSSProperties}
          >
            One letter, one cut. The P carries the same idea as the brand, a
            break that is kept, not hidden. Take it for your profiles, your
            posts, your press.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="brand-grid" data-reveal-group>
            <div data-reveal>
              <div className="brand-tile__art brand-tile__art--bone">
                <PMark fill="#1A1815" />
              </div>
              <div className="brand-tile__bar">
                <span className="brand-tile__label">Ink on bone</span>
                <a className="dl" href="/brand/proof-p.svg" download>
                  SVG
                </a>
                <a className="dl" href="/brand/proof-p-social-light.png" download>
                  PNG 1024
                </a>
              </div>
            </div>

            <div data-reveal>
              <div className="brand-tile__art brand-tile__art--ink">
                <PMark fill="#F5F1EA" />
              </div>
              <div className="brand-tile__bar">
                <span className="brand-tile__label">Bone on ink</span>
                <a className="dl" href="/brand/proof-p-white.svg" download>
                  SVG
                </a>
                <a className="dl" href="/brand/proof-p-social-dark.png" download>
                  PNG 1024
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      {/* BLUEPRINT — le symbole déconstruit, grille de construction */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="mlabel" data-reveal>
            Symbol system / Construction grid / Rev. 03
          </span>
          <h2 className="d3" style={{ marginTop: 14, marginBottom: 40 }} data-reveal>
            The mark, deconstructed.
          </h2>
          <div className="blueprint" data-reveal>
            <svg viewBox="0 0 340 170" aria-label="Construction blueprint of the Proof P mark">
              {/* grille de construction */}
              <g stroke="var(--hairline)" strokeWidth="0.5">
                <line x1="0" y1="30" x2="340" y2="30" strokeDasharray="3 4" />
                <line x1="0" y1="84" x2="340" y2="84" strokeDasharray="3 4" />
                <line x1="0" y1="130" x2="340" y2="130" strokeDasharray="3 4" />
                <line x1="60" y1="0" x2="60" y2="170" strokeDasharray="3 4" />
                <line x1="130" y1="0" x2="130" y2="170" strokeDasharray="3 4" />
              </g>

              {/* le P, tracé en filet (blueprint, jamais rempli) */}
              <g transform="translate(38 18)">
                <path
                  d="M22 12 L92 12 L92 66 L46 66 L46 112 L22 112 Z"
                  fill="none"
                  stroke="var(--contrast)"
                  strokeWidth="1.4"
                  data-draw
                />
                <path
                  d="M46 32 L72 32 L72 48 L46 48 Z"
                  fill="none"
                  stroke="var(--contrast)"
                  strokeWidth="1.4"
                  data-draw
                />
                {/* la coupure — l'or dans la fissure */}
                <path
                  d="M38.2 10.2 L20.2 28.2"
                  fill="none"
                  stroke="var(--kintsugi)"
                  strokeWidth="1.6"
                  data-draw
                />
                {/* cercles de construction */}
                <g fill="none" stroke="var(--contrast-40)" strokeWidth="0.5">
                  <circle cx="22" cy="12" r="9" />
                  <circle cx="92" cy="66" r="9" />
                  <circle cx="29.2" cy="19.2" r="16" strokeDasharray="2 3" />
                </g>
                {/* points d'ancrage */}
                <g fill="var(--kintsugi)">
                  <circle cx="22" cy="12" r="1.6" />
                  <circle cx="92" cy="12" r="1.6" />
                  <circle cx="92" cy="66" r="1.6" />
                  <circle cx="46" cy="66" r="1.6" />
                  <circle cx="46" cy="112" r="1.6" />
                  <circle cx="22" cy="112" r="1.6" />
                </g>
              </g>

              {/* cotes */}
              <g
                stroke="var(--contrast-40)"
                strokeWidth="0.5"
                fill="none"
              >
                <line x1="60" y1="148" x2="130" y2="148" />
                <line x1="60" y1="145" x2="60" y2="151" />
                <line x1="130" y1="145" x2="130" y2="151" />
                <line x1="146" y1="30" x2="146" y2="130" />
                <line x1="143" y1="30" x2="149" y2="30" />
                <line x1="143" y1="130" x2="149" y2="130" />
              </g>

              {/* annotations mono */}
              <g className="blueprint__txt">
                <text x="90" y="158" textAnchor="middle">1X</text>
                <text x="152" y="82">3X</text>
                <text x="196" y="38">ANCHOR 01 / (22, 12)</text>
                <text x="196" y="52">THE CUT / 45° / GOLD</text>
                <text x="196" y="66">COUNTER / 1X SQUARE</text>
                <text x="196" y="94">STROKE / NEVER FILLED</text>
                <text x="196" y="108">CLEAR SPACE / 1X ALL SIDES</text>
                <text x="196" y="136">REF: MARK-P / REV. 03</text>
              </g>
            </svg>
          </div>
          <span className="mcap">
            Gold line system / The break is the mark
          </span>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      {/* LA MARQUE, PORTÉE, le P brodé ton sur ton */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">In the world</span>
            <h2 className="d3">Worn quietly.</h2>
            <p className="measure" style={{ marginTop: 24 }}>
              Tone on tone on a bone coat, the P reads as a detail before it
              reads as a logo. Up close, it is the whole idea, a break kept, not
              hidden.
            </p>
          </div>
          <figure
            className="imgframe"
            style={{ aspectRatio: "10 / 9", margin: 0 }}
            data-reveal
          >
            <Image
              src="/images/blouseavecproofbroder.png"
              alt="The Proof P, embroidered tone on tone on a bone lab coat"
              fill
              sizes="(max-width: 860px) 100vw, 58vw"
              style={{ objectFit: "cover" }}
            />
          </figure>
        </div>
      </section>

      {/* SUR ÉCRAN, le P seul, objet numérique */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow eyebrow--gold" data-reveal>
            On screen
          </span>
          <figure
            style={{ margin: "22px auto 0", maxWidth: 860 }}
            data-reveal
          >
            <div className="imgframe" style={{ aspectRatio: "1529 / 1028" }}>
              <Image
                src="/images/notificationproof.png"
                alt="The Proof P alone, lit on a black phone screen"
                fill
                sizes="(max-width: 900px) 100vw, 860px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="story__caption" style={{ textAlign: "center" }}>
              The mark, on a black screen. One glance is enough.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">Usage</span>
            <h2 className="d3">Keep it clean.</h2>
          </div>
          <div data-reveal>
            <ul className="acc__list" style={{ lineHeight: 2.2 }}>
              <li>SVG for anything scalable. PNG 1024 × 1024 for social avatars.</li>
              <li>Give it room. Clear space of at least the height of the counter.</li>
              <li>Two colors only: ink #1A1815 and bone #F5F1EA. Never recolor.</li>
              <li>Keep the cut. The corner is not a mistake.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
