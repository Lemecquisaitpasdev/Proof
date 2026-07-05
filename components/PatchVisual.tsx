import { BATCH } from "@/lib/products";

/**
 * R.01 — PRODUIT. Fond charbon dégradé, lumière directionnelle unique
 * venant du haut-gauche, ombres longues. Jamais de fond blanc.
 */
export default function PatchVisual({
  layers = 1,
  label = BATCH,
  count,
}: {
  layers?: number;
  label?: string;
  count?: string;
}) {
  const stack = Array.from({ length: Math.max(1, Math.min(layers, 4)) });
  const n = stack.length;

  return (
    <div className="pvisual">
      <div className="pvisual__stage">
        <div style={{ position: "relative", width: "100%", display: "grid", placeItems: "center" }}>
          {stack.map((_, i) => {
            const fromTop = n - 1 - i;
            return (
              <div
                key={i}
                className="pvisual__patch"
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  transform: `rotate(${-6 + fromTop * 2.5}deg) translate(${fromTop * -10}px, ${fromTop * -16}px)`,
                  opacity: i === n - 1 ? 1 : 0.82,
                  zIndex: i,
                }}
              />
            );
          })}
        </div>
      </div>
      <span className="pvisual__label">{label}</span>
      {count ? <span className="pvisual__count">{count}</span> : null}
    </div>
  );
}
