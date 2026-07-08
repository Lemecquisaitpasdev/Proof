/**
 * BLOC POSOLOGIE, la voix clinique détournée.
 * L'humour sec vit ici, en mono, et nulle part ailleurs.
 */
export default function Posology({
  lines,
  sideEffects,
  title = "Posology",
}: {
  lines: string[];
  sideEffects?: string;
  title?: string;
}) {
  return (
    <div className="posology">
      <div className="posology__title">{title}</div>
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
      {sideEffects ? (
        <div>
          <em>{sideEffects}</em>
        </div>
      ) : null}
    </div>
  );
}
