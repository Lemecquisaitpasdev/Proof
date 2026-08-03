"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Shot = { caption: string; src: string };

type Props = {
  label: string;
  headline: string;
  lead: string;
  shots: Shot[];
  code: string;
  batch: string;
};

/**
 * « Dans la vraie vie » — filmstrip horizontal. Quatre clichés visibles, une
 * flèche pour faire défiler vers les suivants. Défilement natif (trackpad /
 * tactile) conservé ; les flèches ne sont qu'un raccourci. La flèche « prev »
 * n'apparaît qu'une fois qu'on a commencé à défiler.
 *
 * ⚠ Le [data-reveal] est porté par un conteneur à classe CONSTANTE
 * (.routine__reveal), jamais par l'élément dont React pilote la className :
 * <Fx/> ajoute « is-in » de façon impérative, et un re-render qui réécrirait
 * la className de ce même nœud effacerait « is-in » — la section disparaîtrait
 * au clic. Le slider stateful (is-start / is-end) est donc un enfant.
 */
export default function PdpRoutine({
  label,
  headline,
  lead,
  shots,
  code,
  batch,
}: Props) {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const slide = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".routine__shot");
    const gap = parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="section routine" aria-label="In real routines">
      <div className="container">
        <span className="mlabel" data-reveal>
          {label} / Ref: {code}
        </span>
        <div className="routine__head" data-reveal>
          <h2 className="d3">{headline}</h2>
          <p className="measure">{lead}</p>
        </div>

        {/* conteneur révélé, className constante — cf. note en tête de fichier */}
        <div className="routine__reveal" data-reveal>
          <div
            className={
              "routine__slider" +
              (atStart ? " is-start" : "") +
              (atEnd ? " is-end" : "")
            }
          >
            <div className="routine__rail" ref={rail}>
              {shots.map((shot) => (
                <figure className="routine__shot" key={shot.caption}>
                  <div className="routine__frame">
                    <Image
                      src={shot.src}
                      alt={`Proof gel in a real routine, ${shot.caption}`}
                      fill
                      sizes="(max-width: 640px) 74vw, (max-width: 900px) 46vw, 23vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </figure>
              ))}
            </div>

            <button
              type="button"
              className="routine__nav routine__nav--prev"
              aria-label="Previous routines"
              onClick={() => slide(-1)}
              disabled={atStart}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M19 12H5M11 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="routine__nav routine__nav--next"
              aria-label="More routines"
              onClick={() => slide(1)}
              disabled={atEnd}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="refline">
          <span>Photographed in the wild</span>
          <span>Ref: {code}</span>
          <span>[ {batch} ]</span>
        </div>
      </div>
    </section>
  );
}
