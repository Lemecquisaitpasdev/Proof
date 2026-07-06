"use client";

import { useState } from "react";

/**
 * Newsletter — input minimaliste : border-bottom 1px, la ligne devient
 * or au focus. Pré-lancement : l'inscription part par e-mail.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    window.location.href = `mailto:contactus@trackk.fr?subject=PROOF%20—%20First%20drop&body=${encodeURIComponent(
      `Keep me posted for the first drop. — ${email.trim()}`,
    )}`;
    setSent(true);
  };

  return (
    <div className="newsletter">
      <h4>The first drop</h4>
      <p>One email when Batch Nº 017 ships. Nothing else.</p>
      <form className="newsletter__row" onSubmit={submit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          aria-label="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" aria-label="Subscribe">
          {sent ? "✓" : "→"}
        </button>
      </form>
    </div>
  );
}
