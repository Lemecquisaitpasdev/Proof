"use client";

import { useEffect, useState } from "react";

/**
 * Mode comparaison, TEMPORAIRE : deux mises en page mobiles de l'accueil.
 *   A (défaut) — portes plein écran, R&D en duo côte à côte
 *   B (?v=b)   — portes en carrousel à aperçu, R&D en carrousel
 * Seul le CSS diffère (.home--a / .home--b). À retirer une fois le choix
 * arrêté : garder les règles de la version retenue, supprimer ce composant.
 */
export default function HomeVariant({ children }: { children: React.ReactNode }) {
  const [v, setV] = useState<"a" | "b">("a");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("v") === "b") setV("b");
  }, []);

  return <div className={`home home--${v}`}>{children}</div>;
}
