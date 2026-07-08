import type { Metadata } from "next";
import KintsugiLine from "@/components/KintsugiLine";
import Posology from "@/components/Posology";

export const metadata: Metadata = {
  title: "Help",
  description:
    "How to apply, wear and reuse your Proof patch. Shipping, returns, and when to expect changes in the appearance of your scar.",
};

const FAQ = [
  {
    section: "The patch",
    items: [
      {
        q: "How do I apply it",
        a: "Wash the area with mild soap, pat it dry, and place the patch over the scar. Press for ten seconds. No creams or oils underneath, the patch commits to clean skin only.",
      },
      {
        q: "How long do I wear it each day",
        a: "12 to 23 hours. Take it off to wash, let your skin breathe a moment, put it back. Consistency matters more than perfection, a missed day is a comma, not a full stop.",
      },
      {
        q: "How do I reuse it",
        a: "Rinse the patch with lukewarm water at night, let it air-dry adhesive side up, and reapply in the morning. One patch lasts up to 14 days of daily wear.",
      },
      {
        q: "When will I see a change",
        a: "Most people notice changes in texture and color after 8 to 12 weeks of consistent wear. Older scars move slower. This is a ritual measured in weeks, not days.",
      },
      {
        q: "Can I use it on a fresh, post-op scar",
        a: "Only once the wound is fully closed, no scabs, no openings, stitches out, and your clinician agrees. Protocol includes a timing guide for exactly this.",
      },
      {
        q: "What if my skin reacts",
        a: "Medical-grade silicone is generally well tolerated. If redness or irritation appears, take a break and shorten wear time. If it persists, stop and talk to a clinician.",
      },
    ],
  },
  {
    section: "Orders",
    items: [
      {
        q: "Where do you ship",
        a: "Worldwide. Orders leave within 48 hours; most destinations take 3 to 7 business days. Tracking follows by email.",
      },
      {
        q: "What is the return policy",
        a: "30 days, no interrogation. Scars are personal; so is a return policy. Write to us and we make it simple.",
      },
      {
        q: "Which chapter should I pick",
        a: "New scar and curiosity: The Patch. A scar you are serious about: The Ritual, six weeks is where texture and color settle. Post-surgery: Protocol, sixteen weeks of coverage.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow enter">Help</span>
          <h1 className="d1 enter" style={{ "--d": ".1s" } as React.CSSProperties}>
            Questions, answered.
          </h1>
          <p
            className="lead measure enter"
            style={{ "--d": ".22s" } as React.CSSProperties}
          >
            Short answers, no hotline music. If it is not here, write to us.
          </p>
        </div>
      </section>

      {FAQ.map((group, gi) => (
        <section
          className="section"
          key={group.section}
          style={gi > 0 ? { paddingTop: 0 } : undefined}
        >
          <div className="container split">
            <div data-reveal>
              <span className="eyebrow eyebrow--gold">
                {String(gi + 1).padStart(2, "0")} · {group.section}
              </span>
            </div>
            <div className="faq" data-reveal>
              {group.items.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <div className="faq__a">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      <section className="section">
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">Contact</span>
            <h2 className="d3">A human answers.</h2>
          </div>
          <div data-reveal>
            <p className="measure">
              Write to{" "}
              <a
                href="mailto:contactus@trackk.fr"
                className="klink"
                style={{ color: "var(--kintsugi-ink)" }}
              >
                contactus@trackk.fr
              </a>{" "}
            , answers within 24 hours, Monday to Friday.
            </p>
            <div style={{ marginTop: 28 }}>
              <Posology
                title="Support, posology"
                lines={[
                  "One email. Any question.",
                  "Response time : under 24 h, Mon–Fri.",
                ]}
                sideEffects="Side effects : answers written by a person."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
