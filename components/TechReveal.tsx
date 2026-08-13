"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  base: string;
  baseAlt: string;
  overlay: string;
  /* Temps d'affichage de chaque état avant le fondu suivant */
  dwellMs?: number;
};

/**
 * DEEP MATRIX — révélation en boucle. La structure en couches reste au fond ;
 * toutes les ~5 s, le second visuel (la blouse Proof brodée) se fond
 * par-dessus, tient, puis se retire — puis ça recommence, à l'infini.
 *
 * Idiome de crossfade du repo (cf. RitualSteps) : deux <Image fill> empilés,
 * la couche du dessus bascule .is-active et le fondu se joue en CSS.
 *
 * Respecte prefers-reduced-motion : sans mouvement, seule la base est montrée
 * et aucun timer ne tourne.
 */
export default function TechReveal({
  base,
  baseAlt,
  overlay,
  dwellMs = 5000,
}: Props) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setShown((s) => !s), dwellMs);
    return () => window.clearInterval(id);
  }, [dwellMs]);

  return (
    <>
      <Image
        src={base}
        alt={baseAlt}
        fill
        sizes="(max-width: 900px) 100vw, 46vw"
        priority
        style={{ objectFit: "cover" }}
      />
      <Image
        src={overlay}
        alt=""
        aria-hidden="true"
        fill
        sizes="(max-width: 900px) 100vw, 46vw"
        className={`tech__over${shown ? " is-active" : ""}`}
        style={{ objectFit: "cover" }}
      />
    </>
  );
}
