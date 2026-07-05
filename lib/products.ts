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
  metaDescription: string;
};

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
    metaDescription:
      "Eight medical-grade silicone patches, a post-op timing guide and sixteen weeks of coverage. The complete protocol for surgical scars.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(n: number): string {
  return `$${n}`;
}

export const BATCH = "Batch Nº 017";
