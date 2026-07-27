/**
 * Le P de Proof : géométrique, une fine fente diagonale détache un éclat
 * en haut-gauche, la coupure honorée. Source unique du tracé.
 */
export const P_PATH =
  "M22 12 L92 12 L92 66 L46 66 L46 112 L22 112 Z M46 32 L72 32 L72 48 L46 48 Z M41.8 13.8 L23.8 31.8 L20.2 28.2 L38.2 10.2 Z";

export default function PMark({
  fill = "currentColor",
  className,
}: {
  fill?: string;
  className?: string;
}) {
  return (
    <svg viewBox="16 6 80 110" className={className} aria-hidden="true">
      <path fill={fill} fillRule="evenodd" d={P_PATH} />
    </svg>
  );
}
