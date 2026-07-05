/**
 * « AS SEEN IN » — wordmarks presse en défilement lent.
 * Logos typographiques : chaque titre garde sa voix, la teinte reste Os.
 */
const PRESS: { name: string; cls: string }[] = [
  { name: "Vogue", cls: "pw-vogue" },
  { name: "Elle", cls: "pw-elle" },
  { name: "Harper's Bazaar", cls: "pw-bazaar" },
  { name: "Allure", cls: "pw-allure" },
  { name: "Marie Claire", cls: "pw-mc" },
  { name: "Cosmopolitan", cls: "pw-cosmo" },
  { name: "Glamour", cls: "pw-glamour" },
  { name: "Byrdie", cls: "pw-byrdie" },
];

export default function PressMarquee() {
  const seq = (hidden: boolean) => (
    <div className="press__seq" aria-hidden={hidden || undefined}>
      {PRESS.map(({ name, cls }) => (
        <span key={name} className={`pw ${cls}`}>
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <div className="press" role="note" aria-label="As seen in the press">
      <span className="press__label">As seen in</span>
      <div className="press__viewport">
        <div className="press__track">
          {seq(false)}
          {seq(true)}
        </div>
      </div>
    </div>
  );
}
