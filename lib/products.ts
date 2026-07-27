export type Product = {
  slug: string;
  name: string;
  /* Nomenclature codifiée façon spec sheet : PR-01…PR-04 */
  code: string;
  /* Méthode, en annotation mono : OCCLUSION THERAPY, etc. */
  method: string;
  /* CTA propre au produit — jamais « Buy now » */
  cta: string;
  /* Quatre bénéfices, disposés autour du swatch de matière (PDP) */
  benefits: { title: string; sub: string }[];
  price: number;
  chapter: string;
  chapterName: string;
  badge?: string;
  cardLine: string;
  tagline: string;
  bestFor: string;
  coverage: string;
  layers: number;
  contents: string[];
  posology: string[];
  sideEffects: string;
  narrative: string[];
  specs: [string, string][];
  faq: { q: string; a: string }[];
  metaDescription: string;
};

export const BATCH = "Batch Nº 017";
export const REF_PREFIX = "REF: SCAR";

export const products: Product[] = [
  {
    slug: "the-patch",
    name: "The Patch",
    code: "PR-01",
    method: "Occlusion therapy · 12–23 h",
    cta: "Claim your proof",
    benefits: [
      { title: "Occlusive seal", sub: "Hydration held at the surface" },
      { title: "Cut to fit", sub: "Any scar, any length" },
      { title: "Fourteen days", sub: "Rinse, air-dry, reapply" },
      { title: "Worn unseen", sub: "Sits flat under clothing" },
    ],
    price: 29,
    chapter: "PR-01",
    chapterName: "The Accident",
    cardLine: "1 reusable patch · medical-grade silicone · 5 × 15 cm",
    tagline:
      "One medical-grade silicone patch. Fourteen days of occlusion therapy. Worn like armor, not like a bandage.",
    bestFor: "First scar. First protocol.",
    coverage: "Up to 14 days",
    layers: 1,
    contents: [
      "1 × silicone patch, 5 × 15 cm",
      "1 × storage card",
      "Application protocol",
    ],
    posology: [
      "Apply once daily on clean skin.",
      "Wear time: 12–23 h.",
      "Rinse, air-dry, reapply. Up to 14 days.",
    ],
    sideEffects: "Observed effects: a ritual kept. A scar carried differently.",
    narrative: [
      "It happened. What it left behind is not a flaw to manage. It is a record, and records deserve care.",
      "One patch. Cut to size. Worn twelve to twenty-three hours a day, rinsed at night, returned each morning. Fourteen days, one gesture. This is where the protocol begins.",
    ],
    specs: [
      ["Reference", "PR-01 / SCAR-01"],
      ["Material", "Medical-grade silicone"],
      ["Method", "Occlusion therapy"],
      ["Size", "5 × 15 cm, cut to fit"],
      ["Wear", "12–23 h per day"],
      ["Service life", "Up to 14 days per patch"],
      ["Batch", BATCH],
    ],
    faq: [
      {
        q: "Can I cut it to my scar",
        a: "Yes. One clean cut. Leave about one centimeter of margin so the patch anchors on intact skin.",
      },
      {
        q: "What about showers",
        a: "Remove, shower, rinse the patch in lukewarm water, pat dry, reapply. Adhesion returns as it air-dries.",
      },
      {
        q: "When do I see a change",
        a: "Texture and color usually begin to move after 8 to 12 weeks of consistent wear. One patch is the first fourteen days. Most people continue with The Ritual.",
      },
    ],
    metaDescription:
      "PR-01, The Patch. One reusable medical-grade silicone patch, 5 × 15 cm. Fourteen days of occlusion therapy to improve the appearance of a scar.",
  },
  {
    slug: "the-ritual",
    name: "The Ritual",
    code: "PR-02",
    method: "Occlusion therapy · 6 weeks",
    cta: "Start your ritual",
    benefits: [
      { title: "Six-week course", sub: "Three patches, in rotation" },
      { title: "Occlusive seal", sub: "Hydration held at the surface" },
      { title: "One daily gesture", sub: "Ninety seconds, every morning" },
      { title: "Texture and color", sub: "Appearance improves over weeks" },
    ],
    price: 69,
    chapter: "PR-02",
    chapterName: "The Ritual",
    badge: "Most chosen",
    cardLine: "3 patches · six weeks of daily wear · ritual card",
    tagline:
      "Three patches. Six weeks of daily occlusion, the window where texture and color settle. The habit, engineered.",
    bestFor: "The daily discipline.",
    coverage: "Up to 6 weeks",
    layers: 3,
    contents: [
      "3 × silicone patches, 5 × 15 cm",
      "1 × ritual card, the six-week course",
      "1 × storage tin",
    ],
    posology: [
      "Apply once daily on clean skin.",
      "Wear time: 12–23 h.",
      "One patch every 14 days. Three patches. Six weeks.",
    ],
    sideEffects: "Observed effects: a discipline that holds. A mirror that reports differently.",
    narrative: [
      "A scar does not change in a weekend. It changes under discipline, the same quiet gesture, every day, until the tissue answers.",
      "Three patches, fourteen days each. Six weeks of consistent occlusion, the span where the appearance of texture and color usually begins to settle.",
    ],
    specs: [
      ["Reference", "PR-02 / SCAR-02"],
      ["Material", "Medical-grade silicone"],
      ["Method", "Occlusion therapy"],
      ["Contains", "3 patches, 5 × 15 cm"],
      ["Wear", "12–23 h per day"],
      ["Rotation", "One patch every 14 days"],
      ["Coverage", "Up to 6 weeks"],
      ["Batch", BATCH],
    ],
    faq: [
      {
        q: "Why six weeks",
        a: "Scar tissue remodels slowly. Six weeks of daily occlusion is the span where texture and color usually begin to settle.",
      },
      {
        q: "What if I miss a day",
        a: "A missed day is a pause, not a failure. Reapply the next morning and continue. Consistency over perfection.",
      },
      {
        q: "Does it work on older scars",
        a: "Mature scars respond too, on a slower clock. Give an older scar the full six weeks before judging.",
      },
    ],
    metaDescription:
      "PR-02, The Ritual. Three medical-grade silicone patches, six weeks of daily occlusion therapy to improve the appearance of scars.",
  },
  {
    slug: "protocol",
    name: "The Proof Protocol",
    code: "PR-03",
    method: "Post-op protocol · 16 weeks",
    cta: "Begin the protocol",
    benefits: [
      { title: "Sixteen weeks", sub: "The full post-op window" },
      { title: "Eight patches", sub: "Placed end to end if needed" },
      { title: "Surgical lines", sub: "5 × 15 cm, cut to fit" },
      { title: "Priority support", sub: "Answers within 24 hours" },
    ],
    price: 129,
    chapter: "PR-03",
    chapterName: "The Protocol",
    badge: "The complete protocol",
    cardLine: "8 patches · sixteen weeks · post-op guide",
    tagline:
      "The complete protocol. Eight patches, sixteen weeks of coverage through the months when a scar decides what it becomes.",
    bestFor: "Post-op. The long game.",
    coverage: "Up to 16 weeks",
    layers: 4,
    contents: [
      "8 × silicone patches, 5 × 15 cm",
      "1 × post-op timing guide",
      "1 × storage tin",
      "Priority support, answers within 24 h",
    ],
    posology: [
      "Start once the incision is fully closed.",
      "Apply once daily on clean skin.",
      "Wear time: 12–23 h. Sixteen weeks.",
    ],
    sideEffects: "Observed effects: patience. A surgeon who asks where you got it.",
    narrative: [
      "Surgery closes one chapter and opens another. The four months that follow are when scar tissue is most active, and most responsive.",
      "Once the incision is closed and your clinician agrees, the protocol takes over. Eight patches. Sixteen weeks. One gesture a day, held through the window that matters most.",
    ],
    specs: [
      ["Reference", "PR-03 / SCAR-03"],
      ["Material", "Medical-grade silicone"],
      ["Method", "Post-op occlusion protocol"],
      ["Contains", "8 patches, 5 × 15 cm"],
      ["Start", "Once the incision is fully closed"],
      ["Wear", "12–23 h per day"],
      ["Coverage", "Up to 16 weeks"],
      ["Batch", BATCH],
    ],
    faq: [
      {
        q: "When do I start after surgery",
        a: "Once the wound is fully closed, no scabs, no openings, stitches out, and your clinician agrees. The included guide covers timing, procedure by procedure.",
      },
      {
        q: "C-section, abdominoplasty, cardiac, does it fit",
        a: "The 5 × 15 cm format covers most surgical lines. Place patches end to end for longer incisions. Count roughly one patch per 15 cm per two weeks.",
      },
      {
        q: "Why sixteen weeks",
        a: "The first four months post-op are when scar tissue is most active, and most responsive. Sixteen weeks holds you through that window.",
      },
    ],
    metaDescription:
      "PR-03, The Proof Protocol. Eight medical-grade silicone patches and a post-op guide. Sixteen weeks of coverage for surgical scars.",
  },
  {
    slug: "the-gel",
    name: "The Gel",
    code: "PR-04",
    method: "Film therapy · twice daily",
    cta: "Add the gesture",
    benefits: [
      { title: "Featherlight finish", sub: "Clean, comfortable wear" },
      { title: "Sixty seconds", sub: "Dries to an invisible film" },
      { title: "Makeup ready", sub: "Layers under SPF" },
      { title: "Zones that move", sub: "Face, joints, knuckles" },
    ],
    price: 39,
    chapter: "PR-04",
    chapterName: "The Gesture",
    badge: "New",
    cardLine: "30 ml silicone gel · twice daily · face & mobile zones",
    tagline:
      "The same medical-grade silicone, as a sixty-second film. For the face, the joints, every zone a patch cannot hold.",
    bestFor: "Face. Joints. Zones that move.",
    coverage: "≈ 8 weeks, twice daily",
    layers: 1,
    contents: [
      "1 × silicone gel, 30 ml / 1.0 fl oz",
      "Airless pump, precise dosing",
      "Application protocol",
    ],
    posology: [
      "Apply a thin layer twice daily on clean skin.",
      "Dry-down: ≈ 60 seconds.",
      "Makeup and SPF layer over it once dry.",
    ],
    sideEffects: "Observed effects: a sixty-second discipline. An invisible film that holds.",
    narrative: [
      "Some scars live on skin that moves. A jaw. A knuckle. An eyebrow. Zones where a patch lifts, folds, or shows.",
      "One pump. A thin film. Sixty seconds to dry, invisible under makeup and SPF. The same silicone discipline, translated for the zones the world reads first.",
    ],
    specs: [
      ["Reference", "PR-04 / SCAR-04"],
      ["Material", "Medical-grade silicone gel"],
      ["Method", "Thin-film occlusion"],
      ["Volume", "30 ml / 1.0 fl oz"],
      ["Use", "Twice daily, thin layer"],
      ["Dry-down", "≈ 60 seconds"],
      ["Supply", "≈ 8 weeks, twice daily"],
      ["Batch", BATCH],
    ],
    faq: [
      {
        q: "Patch or gel, which one",
        a: "Patch for flat zones you can cover: torso, arms, legs. Gel for the face, the joints, skin that moves. Many run both, patch by night, gel by day.",
      },
      {
        q: "Does it work under makeup",
        a: "Yes. Let it dry about sixty seconds, then layer makeup or SPF. It sets as a thin, matte, invisible film.",
      },
      {
        q: "How long does one bottle last",
        a: "About eight weeks at twice daily on a 10 cm scar. Shorter scars stretch it further.",
      },
    ],
    metaDescription:
      "PR-04, The Gel. Medical-grade silicone gel, 30 ml. Dries in sixty seconds, invisible under makeup and SPF. For facial scars and zones that move.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(n: number): string {
  return `$${n}`;
}
