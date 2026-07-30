/**
 * LA GAMME — trois instruments.
 *
 * PR-01  The Patch      un patch, vendu par conditionnement (1 / 3 / 8)
 * PR-02  The Gel        30 ml, pour les zones qu'un patch ne tient pas
 * PR-03  The Protocol   le gel et les patchs, ensemble
 *
 * Le Patch porte des `variants` : le prix, la couverture et le contenu
 * dépendent du conditionnement choisi. Le panier indexe alors la ligne
 * sur une clé composée « slug#variantId » (cf. parseKey / resolveLine).
 */

export type Variant = {
  id: string;
  label: string;
  patches: number;
  price: number;
  coverage: string;
  badge?: string;
  note: string;
  contents: string[];
};

export type Product = {
  slug: string;
  name: string;
  /* Nomenclature codifiée façon spec sheet : PR-01…PR-03 */
  code: string;
  /* Méthode, en annotation mono : OCCLUSION THERAPY, etc. */
  method: string;
  /* CTA propre au produit — jamais « Buy now » */
  cta: string;
  /* Quatre bénéfices, disposés autour du swatch de matière (PDP) */
  benefits: { title: string; sub: string }[];
  /* Conditionnements, si le produit se décline */
  variants?: Variant[];
  /* Panneaux plein écran, facultatifs, fiche produit */
  quickSpecs?: {
    image: string;
    headline: string;
    rows: [string, string][];
  };
  targets?: { image: string; label: string; words: string[] };
  /* ⚠ Les pourcentages ci-dessous sont des ESPACES RÉSERVÉS. Ils doivent
     être remplacés par les résultats de l'étude réelle (ou la section
     retirée) avant toute mise en ligne. Aucun chiffre inventé ne doit
     être publié comme preuve. */
  results?: {
    image: string;
    tabs: {
      label: string;
      footnote: string;
      rows: { pct: string; claim: string }[];
    }[];
  };
  /* « Dans la vraie vie » — la même bouteille, photographiée dans les
     routines où elle finit réellement (clichés communauté, pas studio).
     Facultatif : ne s'affiche que là où des photos sont fournies. */
  routine?: {
    label: string;
    headline: string;
    lead: string;
    shots: { image: string; caption: string }[];
  };
  /* Prix d'entrée : celui de la première variante si le produit se décline */
  price: number;
  /* Mention portée par le packshot CSS quand aucune photo n'existe */
  plateLabel: string;
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
      { title: "Fourteen days", sub: "Per patch, rinse and reapply" },
      { title: "Worn unseen", sub: "Sits flat under clothing" },
    ],
    variants: [
      {
        id: "x1",
        label: "1 patch",
        patches: 1,
        price: 29,
        coverage: "14 days",
        note: "The first fortnight. Test the gesture.",
        contents: [
          "1 × silicone patch, 5 × 15 cm",
          "1 × storage card",
          "Application protocol",
        ],
      },
      {
        id: "x3",
        label: "3 patches",
        patches: 3,
        price: 69,
        coverage: "6 weeks",
        badge: "Most chosen",
        note: "The window where texture and color settle.",
        contents: [
          "3 × silicone patches, 5 × 15 cm",
          "1 × ritual card, the six-week course",
          "1 × storage tin",
        ],
      },
      {
        id: "x8",
        label: "8 patches",
        patches: 8,
        price: 129,
        coverage: "16 weeks",
        badge: "Post-op",
        note: "The full window after surgery.",
        contents: [
          "8 × silicone patches, 5 × 15 cm",
          "1 × post-op timing guide",
          "1 × storage tin",
          "Priority support, answers within 24 h",
        ],
      },
    ],
    quickSpecs: {
      image: "patch-panel-a",
      headline: "One sachet. One patch. Fourteen days of occlusion.",
      rows: [
        ["Good for", "Torso, arms, legs, flat zones"],
        ["Feels like", "A second skin you forget"],
        ["Looks like", "A soft matte line under clothing"],
        ["FYI", "Reusable · Trimmable · Dermatologist reviewed"],
      ],
    },
    targets: {
      image: "patch-panel-b",
      label: "Wear the patch to soften:",
      words: ["Texture", "Color", "Relief"],
    },
    price: 29,
    plateLabel: "1 to 8 patches",
    chapter: "PR-01",
    chapterName: "The Accident",
    cardLine: "Medical-grade silicone · 5 × 15 cm · 1, 3 or 8 patches",
    tagline:
      "Medical-grade silicone, cut to your scar. Choose the run: a fortnight, six weeks, or the full post-op window.",
    bestFor: "Torso, arms, legs. Flat zones.",
    coverage: "14 days to 16 weeks",
    layers: 3,
    contents: [
      "Silicone patches, 5 × 15 cm",
      "Storage card or tin, by pack size",
      "Application protocol",
    ],
    posology: [
      "Apply once daily on clean skin.",
      "Wear time: 12–23 h.",
      "Rinse, air-dry, reapply. One patch lasts 14 days.",
    ],
    sideEffects: "Observed effects: a ritual kept. A scar carried differently.",
    narrative: [
      "It happened. What it left behind is not a flaw to manage. It is a record, and records deserve care.",
      "One patch, cut to size, worn twelve to twenty-three hours a day. Rinsed at night, returned each morning. Fourteen days per patch. How many you take is only a question of how far into the protocol you already are.",
    ],
    specs: [
      ["Reference", "PR-01 / SCAR-01"],
      ["Material", "Medical-grade silicone"],
      ["Method", "Occlusion therapy"],
      ["Size", "5 × 15 cm, cut to fit"],
      ["Wear", "12–23 h per day"],
      ["Service life", "14 days per patch"],
      ["Pack sizes", "1, 3 or 8 patches"],
      ["Batch", BATCH],
    ],
    faq: [
      {
        q: "Which pack size do I need",
        a: "One patch covers a fortnight. Three carry the six weeks where texture and color usually begin to settle. Eight cover the four months after surgery, when scar tissue is most responsive.",
      },
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
        a: "Texture and color usually begin to move after 8 to 12 weeks of consistent wear. One patch is the first fourteen days of that.",
      },
    ],
    metaDescription:
      "PR-01, The Patch. Reusable medical-grade silicone, 5 × 15 cm, in packs of 1, 3 or 8. Occlusion therapy to improve the appearance of scars.",
  },
  {
    slug: "the-gel",
    name: "The Gel",
    code: "PR-02",
    method: "Film therapy · twice daily",
    cta: "Add the gesture",
    benefits: [
      { title: "Featherlight finish", sub: "Clean, comfortable wear" },
      { title: "Sixty seconds", sub: "Dries to an invisible film" },
      { title: "Makeup ready", sub: "Layers under SPF" },
      { title: "Zones that move", sub: "Face, joints, knuckles" },
    ],
    quickSpecs: {
      image: "gel-panel-a",
      headline: "A sixty-second film. For every zone a patch cannot hold.",
      rows: [
        ["Good for", "Face, joints, zones that move"],
        ["Feels like", "A weightless second skin"],
        ["Looks like", "Nothing at all, once dry"],
        ["FYI", "Fragrance-free · Non-comedogenic · Dermatologist reviewed"],
      ],
    },
    targets: {
      image: "gel-panel-b",
      label: "Wear the gel to soften:",
      words: ["Texture", "Color", "Relief"],
    },
    results: {
      image: "gel-panel-c",
      tabs: [
        {
          label: "Immediate",
          footnote:
            "Placeholder figures. Replace with the results of the consumer perception study before launch.",
          rows: [
            { pct: "00%", claim: "Agreed the gel dries to an invisible film" },
            { pct: "00%", claim: "Agreed the scar feels softer to the touch" },
            { pct: "00%", claim: "Agreed it layers cleanly under makeup" },
            { pct: "00%", claim: "Agreed they would keep the daily gesture" },
          ],
        },
        {
          label: "After 8 weeks",
          footnote:
            "Placeholder figures. Replace with the results of the consumer perception study before launch.",
          rows: [
            { pct: "00%", claim: "Agreed the scar looks flatter" },
            { pct: "00%", claim: "Agreed the color looks closer to their skin" },
            { pct: "00%", claim: "Agreed the texture looks smoother" },
            { pct: "00%", claim: "Agreed they carry the scar more openly" },
          ],
        },
      ],
    },
    routine: {
      label: "In real routines",
      headline: "They made the protocol part of their routine.",
      lead: "The same bottle, photographed where it actually ends up — the travel tray, the vanity, the shave shelf. Proof earns its place next to the things people already reach for.",
      shots: [
        { image: "routine-shelf", caption: "The morning shelf" },
        { image: "routine-vanity", caption: "The vanity" },
        { image: "routine-shave", caption: "The shave shelf" },
        { image: "routine-carry", caption: "The carry-on" },
        { image: "routine-car", caption: "The passenger seat" },
        { image: "routine-pouch", caption: "The pouch" },
        { image: "routine-summer", caption: "The beach bag" },
      ],
    },
    price: 39,
    plateLabel: "30 ml",
    chapter: "PR-02",
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
    sideEffects:
      "Observed effects: a sixty-second discipline. An invisible film that holds.",
    narrative: [
      "Some scars live on skin that moves. A jaw. A knuckle. An eyebrow. Zones where a patch lifts, folds, or shows.",
      "One pump. A thin film. Sixty seconds to dry, invisible under makeup and SPF. The same silicone discipline, translated for the zones the world reads first.",
    ],
    specs: [
      ["Reference", "PR-02 / SCAR-02"],
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
        a: "Patch for flat zones you can cover: torso, arms, legs. Gel for the face, the joints, skin that moves. Many run both, patch by night, gel by day. That pairing is The Protocol.",
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
      "PR-02, The Gel. Medical-grade silicone gel, 30 ml. Dries in sixty seconds, invisible under makeup and SPF. For facial scars and zones that move.",
  },
  {
    slug: "protocol",
    name: "The Protocol",
    code: "PR-03",
    method: "Full protocol · patch by night, gel by day",
    cta: "Begin the protocol",
    benefits: [
      { title: "Patch by night", sub: "Occlusion where skin is still" },
      { title: "Gel by day", sub: "A film where skin moves" },
      { title: "Six weeks", sub: "Three patches, one bottle" },
      { title: "Every zone", sub: "Torso, limbs, face, joints" },
    ],
    quickSpecs: {
      image: "protocol-panel-a",
      headline: "Both instruments. One discipline, morning and night.",
      rows: [
        ["Good for", "Anyone running more than one zone"],
        ["Feels like", "Two gestures, ninety seconds each"],
        ["Looks like", "Nothing anyone else has to notice"],
        ["FYI", "Reusable patches · Refillable gel · Dermatologist reviewed"],
      ],
    },
    targets: {
      image: "protocol-panel-b",
      label: "Run the protocol to soften:",
      words: ["Texture", "Color", "Relief"],
    },
    /* Prix de l'ensemble : à arbitrer. 3 patchs (69) + gel (39) = 108 pris
       séparément ; la valeur ci-dessous est un point de départ. */
    price: 95,
    plateLabel: "Patch + gel",
    chapter: "PR-03",
    chapterName: "The Protocol",
    badge: "The complete protocol",
    cardLine: "3 patches + 30 ml gel · six weeks · both zones",
    tagline:
      "The patch and the gel, together. Occlusion on the zones that hold still, a film on the ones that move. Six weeks of both.",
    bestFor: "The complete protocol.",
    coverage: "6 weeks, both zones",
    layers: 4,
    contents: [
      "3 × silicone patches, 5 × 15 cm",
      "1 × silicone gel, 30 ml / 1.0 fl oz",
      "1 × ritual card, the six-week course",
      "1 × storage tin",
      "Priority support, answers within 24 h",
    ],
    posology: [
      "Patch on the flat zones, 12–23 h a day.",
      "Gel on the face and joints, twice daily.",
      "One patch every 14 days. Three patches. Six weeks.",
    ],
    sideEffects:
      "Observed effects: a discipline that holds on every zone at once.",
    narrative: [
      "Most scars do not sit politely on one kind of skin. A line runs from the collarbone to the jaw, crosses a shoulder, folds at a knuckle. One instrument never covers all of it.",
      "So the protocol runs both. The patch seals the zones that hold still, twelve to twenty-three hours a day. The gel films the ones that move, twice daily, invisible in sixty seconds. Six weeks, morning and night, nothing left uncovered.",
    ],
    specs: [
      ["Reference", "PR-03 / SCAR-03"],
      ["Material", "Medical-grade silicone, patch and gel"],
      ["Method", "Occlusion and thin-film, combined"],
      ["Contains", "3 patches, 5 × 15 cm + 30 ml gel"],
      ["Wear", "Patch 12–23 h · Gel twice daily"],
      ["Coverage", "6 weeks, both zones"],
      ["Batch", BATCH],
    ],
    faq: [
      {
        q: "Why run both",
        a: "Because a scar rarely stays on one kind of skin. The patch holds where the surface is flat and still. The gel covers the face, the joints, anywhere a patch would lift or show.",
      },
      {
        q: "Do I use them on the same spot",
        a: "No need. Split by zone: patch on the torso, arms and legs, gel on the face and joints. On one long scar crossing both, patch the flat part and film the rest.",
      },
      {
        q: "Is it cheaper than buying separately",
        a: "Yes, the protocol is priced below the two taken apart. It also removes the reordering gap, which is what usually breaks a six-week course.",
      },
    ],
    metaDescription:
      "PR-03, The Protocol. Three medical-grade silicone patches and a 30 ml gel. Occlusion on still zones, a film on moving ones, six weeks of both.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/* ---- Lignes de panier : « slug » ou « slug#variantId » ---- */

export function makeKey(slug: string, variantId?: string): string {
  return variantId ? `${slug}#${variantId}` : slug;
}

export function parseKey(key: string): { slug: string; variantId?: string } {
  const [slug, variantId] = key.split("#");
  return { slug, variantId: variantId || undefined };
}

export type Line = {
  product: Product;
  variant?: Variant;
  /* nom affiché, conditionnement compris */
  label: string;
  price: number;
};

export function resolveLine(key: string): Line | null {
  const { slug, variantId } = parseKey(key);
  const product = getProduct(slug);
  if (!product) return null;

  if (!product.variants?.length) {
    return { product, label: product.name, price: product.price };
  }

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  return {
    product,
    variant,
    label: `${product.name}, ${variant.label}`,
    price: variant.price,
  };
}

export function formatPrice(n: number): string {
  return `$${n}`;
}
