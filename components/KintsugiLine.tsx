/**
 * LA LIGNE KINTSUGI, la signature.
 * Une fêlure réparée à l'or : trait organique irrégulier, micro-fourche
 * aux deux tiers. Or mat 1.3px, jamais en aplat. Elle se dessine
 * (stroke-dashoffset) au scroll via Fx ([data-draw]) ou au chargement
 * (variant onload, hero).
 */
type Variant = "separator" | "underline" | "strike";

const PATHS: Record<Variant, { viewBox: string; main: string; fork: string }> = {
  separator: {
    viewBox: "0 0 1200 24",
    main: "M0 13.2 C 88 11.4, 152 15.6, 238 12.4 C 322 9.4, 384 14.6, 472 12.6 C 560 10.6, 612 8.4, 702 12.8 C 790 17, 862 10.6, 952 12.2 C 1042 13.8, 1122 11.6, 1200 12.8",
    fork: "M702 12.8 C 744 10.6, 788 9.2, 838 9.6",
  },
  underline: {
    viewBox: "0 0 300 14",
    main: "M2 8.6 C 40 7, 72 10.6, 112 8.4 C 152 6.4, 182 10.4, 226 8.2 C 258 6.8, 282 9, 298 8",
    fork: "M196 8.7 C 222 7.2, 244 6, 266 5.2",
  },
  strike: {
    viewBox: "0 0 300 14",
    main: "M2 7.4 C 44 8.8, 78 5.6, 118 7.6 C 158 9.6, 190 5.4, 232 7.4 C 262 8.8, 284 6.6, 298 7.2",
    fork: "M118 7.6 C 148 9.2, 172 10.4, 198 10.8",
  },
};

export default function KintsugiLine({
  variant = "separator",
  onload = false,
  className,
}: {
  variant?: Variant;
  /** dessinée au chargement (hero) plutôt qu'au scroll */
  onload?: boolean;
  className?: string;
}) {
  const { viewBox, main, fork } = PATHS[variant];
  const cls = ["kline", onload ? "kline--onload" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      className={cls}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      data-draw={onload ? undefined : ""}
    >
      <path d={main} pathLength={1} vectorEffect="non-scaling-stroke" />
      <path d={fork} pathLength={1} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
