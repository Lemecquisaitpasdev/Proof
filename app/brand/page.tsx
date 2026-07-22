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
