const ITEMS = [
  "Batch Nº 017",
  "Medical-grade silicone",
  "Reusable 14 days",
  "Wear time 12–23 h",
  "5 × 15 cm",
  "Ships worldwide",
  "Honor it. Don't erase it.",
];

export default function Topbar() {
  const seq = (hidden: boolean) => (
    <div className="topbar__seq" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="topbar__item">
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="topbar" role="note" aria-label="Product facts">
      <div className="topbar__track">
        {seq(false)}
        {seq(true)}
      </div>
    </div>
  );
}
