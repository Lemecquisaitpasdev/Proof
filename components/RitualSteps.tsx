"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * LE RITUEL — stepper éditorial.
 * Photo du geste à gauche (sticky, crossfade), les trois étapes à droite.
 * Chaque étape s'active quand elle traverse le centre du viewport — pas
 * de scroll-jack. Clic possible. Mobile : la photo active au-dessus.
 */
export type RitualStep = {
  no: string;
  name: string;
  text: string;
  image: string | null;
};

export default function RitualSteps({ steps }: { steps: RitualStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const inBand = useRef<Set<number>>(new Set());

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = refs.current.indexOf(entry.target as HTMLDivElement);
          if (idx < 0) continue;
          if (entry.isIntersecting) inBand.current.add(idx);
          else inBand.current.delete(idx);
        }
        /* plusieurs étapes dans la bande centrale → la plus haute gagne */
        if (inBand.current.size > 0) {
          setActive(Math.min(...inBand.current));
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const media = (extraClass: string) => (
    <div className={extraClass} aria-hidden="true">
      {steps.map(
        (s, i) =>
          s.image && (
            <Image
              key={s.no}
              src={s.image}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              style={{ objectFit: "cover" }}
              className={i === active ? "is-active" : undefined}
            />
          ),
      )}
    </div>
  );

  return (
    <div className="ritual ritual--live">
      {media("ritual__media")}
      <div className="ritual__steps">
        {media("ritual__mobile-media")}
        {steps.map((s, i) => (
          <div
            key={s.no}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`rstep${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="rstep__no">{s.no}</span>
            <h3 className="rstep__name">{s.name}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
