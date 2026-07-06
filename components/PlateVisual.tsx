import { BATCH } from "@/lib/products";

/**
 * PLATE — packshot CSS, version lumière.
 * Plate porcelaine, patch argile, une seule lumière douce venant du
 * haut-gauche, ombre portée neutre. La matière (grain silicone) vit
 * ici et nulle part ailleurs.
 */
export default function PlateVisual({
  layers = 1,
  label = BATCH,
  count,
}: {
  layers?: number;
  label?: string;
  count?: string;
}) {
  const n = Math.max(1, Math.min(layers, 4));
  const stack = Array.from({ length: n });

  return (
    <div className="plate">
      <div className="plate__stage">
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          {stack.map((_, i) => {
            const fromTop = n - 1 - i;
            return (
              <div
                key={i}
                className="plate__patch"
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  transform: `rotate(${-5 + fromTop * 2.2}deg) translate(${fromTop * -9}px, ${fromTop * -14}px)`,
                  opacity: i === n - 1 ? 1 : 0.9,
                  zIndex: i,
                }}
              />
            );
          })}
        </div>
      </div>
      <span className="plate__label">{label}</span>
      {count ? <span className="plate__count">{count}</span> : null}
    </div>
  );
}
