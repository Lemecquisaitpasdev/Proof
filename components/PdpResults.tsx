"use client";

import { useState } from "react";

type Tab = {
  label: string;
  footnote?: string;
  rows: { pct: string; claim: string }[];
};

/**
 * Résultats d'étude, deux temps de lecture (immédiat / après N semaines).
 * Les onglets suivent le motif tablist ARIA ; l'onglet actif est souligné
 * d'un filet d'encre, l'inactif reste lisible.
 */
export default function PdpResults({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <>
      <div className="results__tabs" role="tablist" aria-label="Study results">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "results__tab is-active" : "results__tab"}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className="results__list">
        {tab.rows.map((r) => (
          <li key={r.claim}>
            <span className="results__pct num">{r.pct}</span>
            <span className="results__claim">{r.claim}</span>
          </li>
        ))}
      </ul>

      {tab.footnote ? <p className="results__note">{tab.footnote}</p> : null}
    </>
  );
}
