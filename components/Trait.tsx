"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LE TRAIT — la signature.
 * Ligne brisée tracée à partir d'une vraie cicatrice. Or Cicatrice, 1.4 px.
 * Au scroll, elle se referme : tracé gauche → droite, 2 s, easing organique.
 * Jamais plus d'un trait visible par écran.
 */
export default function Trait() {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={`trait${drawn ? " trait--drawn" : ""}`}
      viewBox="0 0 1200 20"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 11 L142 11 L171 6.4 L214 14.2 L301 9.6 L466 11.4 L511 4.6 L557 15.4 L644 9.9 L820 11.5 L863 7.1 L933 13.6 L1041 10.4 L1200 11"
        pathLength={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
