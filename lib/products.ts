export type Product = {
  slug: string;
  name: string;
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

export const products: Product[] = [
  {
    slug: "the-patch",
    name: "The Patch",
    price: 29,
    chapter: "Chapitre 01",
    chapterName: "L'Accident",
    cardLine: "1 reusable patch · medical-grade silicone · 5 × 15 cm",
    tagline:
      "The entry ticket. One medical-grade silicone patch, reusable for fourteen days, to start telling the story properly.",
    bestFor: "First scar. First test.",
    coverage: "Up to 14 days",
    layers: 1,
    contents: [
      "1 × silicone patch — 5 × 15 cm",
      "1 × storage card",
      "Application guide",
    ],
    posology: [
      "Apply once daily on clean skin.",
      "Wear time : 12–23 h.",
      "Rinse, air-dry, reuse — up to 14 days.",
    ],
    sideEffects: "Side effects : pride, confidence, questions at parties.",
    narrative: [
      "It happened. The bike, the kitchen counter, the appendix — the details are yours. What it left behind is an opening sentence, and opening sentences deserve better than being mumbled.",
      "One patch. Cut it to size if you want. Wear it twelve to twenty-three hours a day, rinse it at night, and put it back in the morning. Fourteen days to see what a ritual feels like.",
    ],
    specs: [
      ["Material", "Medical-grade silicone"],
      ["Size", "5 × 15 cm — cut to fit"],
      ["Wear", "12–23 h per day"],
      ["Reuse", "Up to 14 days per patch"],
      ["Coverage", "Up to 14 days"],
      ["Batch", BATCH],
    ],
    faq: [
      {
        q: "Can I cut it to my scar",
        a: "Yes. Scissors, one clean cut, done. Leave about one centimeter of margin around the scar so the patch anchors on intact skin.",
      },
      {
        q: "What about showers",
        a: "Take it off, shower, rinse the patch with lukewarm water, pat dry, put it back. The tack returns as it air-dries.",
      },
      {
        q: "When do I see a change",
        a: "Texture and color usually start moving after 8 to 12 weeks of consistent wear. One patch is the first fourteen days of that story — most people continue with The Ritual.",
      },
    ],
    metaDescription:
      "One reusable medical-grade silicone patch, 5 × 15 cm. Fourteen days of daily wear to improve the appearance of a scar. The entry ticket.",
  },
  {
    slug: "the-ritual",
    name: "The Ritual",
    price: 69,
    chapter: "Chapitre 02",
    chapterName: "Le Rituel",
    badge: "Most chosen",
    cardLine: "3 patches · six weeks of daily wear · ritual card",
    tagline:
      "The designated best-seller. Three patches, six weeks of daily wear — the window where texture and color settle.",
    bestFor: "The daily habit.",
    coverage: "Up to 6 weeks",
    layers: 3,
    contents: [
      "3 × silicone patches — 5 × 15 cm",
      "1 × ritual card — the six-week course",
      "1 × storage tin",
    ],
    posology: [
      "Apply once daily on clean skin.",
      "Wear time : 12–23 h.",
      "One patch every 14 days. Three patches. Six weeks.",
    ],
    sideEffects:
      "Side effects : a routine you actually keep. Compliments from strangers.",
    narrative: [
      "A scar does not change over a weekend. It changes because you show up every day, the way anything worth keeping gets kept.",
      "Three patches, fourteen days each. Six weeks of the same quiet gesture every morning — the span most people need before the mirror starts reporting differently.",
    ],
    specs: [
      ["Material", "Medical-grade silicone"],
      ["Contains", "3 patches — 5 × 15 cm"],
      ["Wear", "12–23 h per day"],
      ["Rotation", "One patch every 14 days"],
      ["Coverage", "Up to 6 weeks"],
      ["Batch", BATCH],
    ],
    faq: [
      {
        q: "Why six weeks",
        a: "Because that is where the needle moves. Scar tissue remodels slowly; six weeks of daily occlusion is the span where texture and color usually begin to settle.",
      },
      {
        q: "What if I miss a day",
        a: "A missed day is a comma, not a full stop. Put the patch back on the next morning and keep going — consistency over perfection.",
      },
      {
        q: "Does it work on older scars",
        a: "Older scars respond too, they just negotiate slower. Give a mature scar the full six weeks before you judge the conversation.",
      },
    ],
    metaDescription:
      "Three medical-grade silicone patches and a six-week ritual card. The best-seller — six weeks of daily wear to improve the appearance of scars.",
  },
  {
    slug: "protocol",
    name: "Protocol",
    price: 129,
    chapter: "Chapitre 03",
    chapterName: "Le Protocole",
    cardLine: "8 patches · sixteen weeks · post-op guide",
    tagline:
      "Post-op, done seriously. Eight patches and sixteen weeks of coverage through the months where appearance changes the most.",
    bestFor: "Post-op. The long game.",
    coverage: "Up to 16 weeks",
    layers: 4,
    contents: [
      "8 × silicone patches — 5 × 15 cm",
      "1 × post-op timing guide",
      "1 × storage tin",
      "Priority support — answers within 24 h",
    ],
    posology: [
      "Start once the incision is fully closed.",
      "Apply once daily on clean skin.",
      "Wear time : 12–23 h. Sixteen weeks.",
    ],
    sideEffects:
      "Side effects : patience. A surgeon who asks where you got it.",
    narrative: [
      "Surgery closes one chapter and opens another. The months that follow are when a scar decides what it will look like for years — and when consistent silicone coverage earns its reputation.",
      "Once your incision is closed and your clinician gives the green light, the protocol takes over: eight patches, sixteen weeks, one gesture a day. The long game, played properly.",
    ],
    specs: [
      ["Material", "Medical-grade silicone"],
      ["Contains", "8 patches — 5 × 15 cm"],
      ["Start", "Once the incision is fully closed"],
      ["Wear", "12–23 h per day"],
      ["Coverage", "Up to 16 weeks"],
      ["Batch", BATCH],
    ],
    faq: [
      {
        q: "When do I start after surgery",
        a: "Once the wound is fully closed — no scabs, no openings, stitches out — and your clinician agrees. The included guide walks through the timing, procedure by procedure.",
      },
      {
        q: "C-section, abdominoplasty, cardiac — does it fit",
        a: "The 5 × 15 cm format covers most surgical lines, and patches can be placed end to end for longer incisions. Cut to fit; count roughly one patch per 15 cm per two weeks.",
      },
      {
        q: "Why sixteen weeks",
        a: "The first four months post-op are when scar tissue is most active — and most responsive. Sixteen weeks of coverage carries you through the window that matters most.",
      },
    ],
    metaDescription:
      "Eight medical-grade silicone patches, a post-op timing guide and sixteen weeks of coverage. The complete protocol for surgical scars.",
  },
  {
    slug: "the-gel",
    name: "The Gel",
    price: 39,
    chapter: "Chapitre 04",
    chapterName: "Le Geste",
    badge: "New",
    cardLine: "30 ml silicone gel · twice daily · face & mobile zones",
    tagline:
      "The same medical-grade silicone, in sixty seconds. For the face, the joints, and every zone a patch can't hold.",
    bestFor: "Face. Joints. Zones that move.",
    coverage: "≈ 8 weeks, twice daily",
    layers: 1,
    contents: [
      "1 × silicone gel — 30 ml / 1.0 fl oz",
      "Airless pump — precise dosing",
      "Application guide",
    ],
    posology: [
      "Apply a thin layer twice daily on clean skin.",
      "Dry-down : ≈ 60 seconds.",
      "Makeup and SPF layer over it once dry.",
    ],
    sideEffects: "Side effects : a sixty-second habit you keep.",
    narrative: [
      "Some scars live on skin that moves — a jaw, a knuckle, an eyebrow. Zones where a patch lifts, folds, or simply shows. That is what the gel is for.",
      "One pump, a thin film, sixty seconds. It dries invisible, holds through the day, and disappears under makeup or SPF. The same silicone discipline, translated for the zones the world looks at first.",
    ],
    specs: [
      ["Material", "Medical-grade silicone gel"],
      ["Volume", "30 ml / 1.0 fl oz"],
      ["Use", "Twice daily — thin layer"],
      ["Dry-down", "≈ 60 seconds"],
      ["Supply", "≈ 8 weeks, twice daily"],
      ["Batch", BATCH],
    ],
    faq: [
      {
        q: "Patch or gel — which one",
        a: "Patch for flat zones you can cover: torso, arms, legs. Gel for the face, the joints, and skin that moves. Plenty of people run both — patch at night, gel by day.",
      },
      {
        q: "Does it work under makeup",
        a: "Yes. Let it dry for about sixty seconds, then layer makeup or SPF over it. It sets as a thin, matte, invisible film.",
      },
      {
        q: "How long does one bottle last",
        a: "About eight weeks at twice daily on a 10 cm scar. Shorter scars stretch it further.",
      },
    ],
    metaDescription:
      "Medical-grade silicone gel, 30 ml. Dries in sixty seconds, invisible under makeup and SPF. For facial scars, joints, and zones a patch can't hold.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(n: number): string {
  return `$${n}`;
}
