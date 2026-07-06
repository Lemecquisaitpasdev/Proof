/**
 * LE MÉCANISME — la science comme objet éditorial (Sturm-style).
 * Coupe minimaliste : le patch silicone en surface (fêlure d'or), la zone
 * d'occlusion et d'hydratation piégée dessous, la cicatrice qui s'aplanit,
 * le collagène qui se régule. Traits fins, labels mono, dessiné au scroll
 * ([data-draw] → .is-drawn). Tout est déclaratif, aucune lib.
 */
export default function Mechanism() {
  return (
    <svg
      className="mechanism"
      viewBox="0 0 640 400"
      role="img"
      aria-label="Cross-section: a silicone patch seals the scar surface, occlusion and hydration let the tissue regulate its own collagen."
      data-draw
    >
      {/* patch silicone — la ligne d'or, en surface, presque plate */}
      <path
        className="m-line m-line--gold"
        d="M90 150 L250 150 Q320 132 390 150 L550 150"
        pathLength={1}
        vectorEffect="non-scaling-stroke"
      />

      {/* surface de la peau + relief de la cicatrice */}
      <path
        className="m-line"
        d="M90 250 L235 250 C275 250 288 200 320 200 C352 200 365 250 405 250 L550 250"
        pathLength={1}
        vectorEffect="non-scaling-stroke"
      />

      {/* derme — tissu sous la peau, traits doux */}
      <path
        className="m-line m-line--soft"
        d="M90 288 L550 288"
        pathLength={1}
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="m-line m-line--soft"
        d="M90 320 L550 320"
        pathLength={1}
        vectorEffect="non-scaling-stroke"
      />

      {/* hydratation piégée entre patch et peau */}
      <circle className="m-dot" cx="150" cy="192" r="2.4" />
      <circle className="m-dot" cx="205" cy="182" r="2.4" />
      <circle className="m-dot" cx="262" cy="188" r="2.4" />
      <circle className="m-dot" cx="378" cy="186" r="2.4" />
      <circle className="m-dot" cx="435" cy="184" r="2.4" />
      <circle className="m-dot" cx="490" cy="190" r="2.4" />

      <text x="90" y="128" className="m-label m-label--gold">
        Silicone patch — occlusive layer
      </text>
      <text x="320" y="172" className="m-label" textAnchor="middle">
        Hydration retained
      </text>
      <text x="90" y="352" className="m-label">
        Dermis · collagen self-regulates
      </text>
      <text x="550" y="270" className="m-label" textAnchor="end">
        Scar surface
      </text>
    </svg>
  );
}
