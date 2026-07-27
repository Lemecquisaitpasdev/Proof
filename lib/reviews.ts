/**
 * AVIS PRODUIT — DONNÉES D'AMORÇAGE
 *
 * ⚠ Tout ce fichier est un jeu de démonstration : la note, le nombre
 * d'avis et les témoignages sont des espaces réservés destinés à câbler
 * et valider l'interface. Ils doivent être remplacés par le flux réel
 * (Okendo, Yotpo, Judge.me, Shopify Product Reviews…) avant toute mise
 * en ligne. Aucun avis fictif ne doit être publié comme authentique.
 *
 * Pour la même raison, ces chiffres ne sont volontairement PAS exposés
 * en `aggregateRating` dans le JSON-LD de la fiche produit : une note
 * fabriquée remonterait telle quelle dans les résultats de recherche.
 */

export type Review = {
  id: string;
  name: string;
  verified: boolean;
  /* libellé relatif figé — évite toute dérive entre serveur et client */
  age: string;
  stars: number;
  title: string;
  body: string;
  facets: [string, string][];
  scale?: { question: string; value: number; low: string; high: string };
  helpful: number;
};

export type ReviewSet = {
  rating: number;
  count: number;
  items: Review[];
};

const FACETS_COMMON: [string, string][] = [
  ["Scar age", "6 to 12 months"],
  ["Zone", "Forearm"],
  ["Protocol", "Daily, 12 h+"],
];

export const REVIEWS: Record<string, ReviewSet> = {
  "the-gel": {
    rating: 4.7,
    count: 343,
    items: [
      {
        id: "g1",
        name: "Loan T.",
        verified: true,
        age: "3 days ago",
        stars: 5,
        title: "Disappears on the skin",
        body: "I was sceptical about a gel on my jawline. It dries in about a minute, you cannot see it, and makeup goes straight over. Eight weeks in, the line is flatter than it was.",
        facets: [
          ["Scar age", "8 months"],
          ["Zone", "Jawline"],
          ["Protocol", "Twice daily"],
        ],
        scale: {
          question: "How did the appearance change?",
          value: 4,
          low: "Barely",
          high: "Clearly",
        },
        helpful: 24,
      },
      {
        id: "g2",
        name: "Melina B.",
        verified: true,
        age: "1 week ago",
        stars: 4,
        title: "Good for knuckles, needs patience",
        body: "A patch never held on my hand. The gel does. It is not overnight, you have to keep the gesture, but the texture has softened and the color is closer to the rest.",
        facets: [
          ["Scar age", "2 years"],
          ["Zone", "Knuckles"],
          ["Protocol", "Twice daily"],
        ],
        helpful: 11,
      },
      {
        id: "g3",
        name: "Andrés R.",
        verified: true,
        age: "3 weeks ago",
        stars: 5,
        title: "The bottle lasts",
        body: "One pump covers a ten-centimetre line. Two months on the first bottle. The pump doses cleanly and nothing dries out in the neck.",
        facets: [
          ["Scar age", "14 months"],
          ["Zone", "Shoulder"],
          ["Protocol", "Twice daily"],
        ],
        helpful: 7,
      },
    ],
  },
  "the-patch": {
    rating: 4.8,
    count: 512,
    items: [
      {
        id: "p1",
        name: "Sarah K.",
        verified: true,
        age: "5 days ago",
        stars: 5,
        title: "Held for fourteen days",
        body: "Cut it in two, one half on the scar, one kept for later. It stayed put under a shirt all day and the tack came back every morning after rinsing.",
        facets: FACETS_COMMON,
        scale: {
          question: "How did the appearance change?",
          value: 4,
          low: "Barely",
          high: "Clearly",
        },
        helpful: 31,
      },
      {
        id: "p2",
        name: "Tom W.",
        verified: true,
        age: "2 weeks ago",
        stars: 5,
        title: "A first step that convinced me",
        body: "Bought one to test before committing. Fourteen days later I moved to the six-week course. It is the ritual that does the work, the patch just makes it easy.",
        facets: [
          ["Scar age", "4 months"],
          ["Zone", "Knee"],
          ["Protocol", "Daily, 14 h"],
        ],
        helpful: 18,
      },
      {
        id: "p3",
        name: "Inès D.",
        verified: true,
        age: "1 month ago",
        stars: 4,
        title: "Discreet, that is what I wanted",
        body: "Almost invisible under clothes. It lifts slightly at the edge after a long day, but pressing it back for ten seconds is enough.",
        facets: [
          ["Scar age", "9 months"],
          ["Zone", "Collarbone"],
          ["Protocol", "Daily, 12 h"],
        ],
        helpful: 9,
      },
    ],
  },
  "the-ritual": {
    rating: 4.9,
    count: 887,
    items: [
      {
        id: "r1",
        name: "Camille P.",
        verified: true,
        age: "4 days ago",
        stars: 5,
        title: "Six weeks, and the mirror agrees",
        body: "The rotation card is what kept me honest. Three patches, one every fortnight. At the end of the course the relief had visibly settled.",
        facets: [
          ["Scar age", "7 months"],
          ["Zone", "Abdomen"],
          ["Protocol", "Daily, 16 h"],
        ],
        scale: {
          question: "How did the appearance change?",
          value: 5,
          low: "Barely",
          high: "Clearly",
        },
        helpful: 46,
      },
      {
        id: "r2",
        name: "Jonas M.",
        verified: true,
        age: "2 weeks ago",
        stars: 5,
        title: "Worth the step up",
        body: "Started with one patch, came back for the course. Same material, but having the full six weeks in the tin removes every excuse.",
        facets: FACETS_COMMON,
        helpful: 22,
      },
      {
        id: "r3",
        name: "Priya N.",
        verified: true,
        age: "1 month ago",
        stars: 5,
        title: "The tin matters more than I expected",
        body: "Somewhere clean to put the patch at night is half the discipline. Small thing, well thought out.",
        facets: [
          ["Scar age", "18 months"],
          ["Zone", "Forearm"],
          ["Protocol", "Daily, 20 h"],
        ],
        helpful: 14,
      },
    ],
  },
  protocol: {
    rating: 4.9,
    count: 264,
    items: [
      {
        id: "x1",
        name: "Dr. Hélène V.",
        verified: true,
        age: "1 week ago",
        stars: 5,
        title: "What I hand to post-op patients",
        body: "The timing guide answers the question they always ask, when to start. Sixteen weeks of coverage in one box removes the reordering gap.",
        facets: [
          ["Scar age", "Post-op, 6 weeks"],
          ["Zone", "Abdomen"],
          ["Protocol", "Daily, 18 h"],
        ],
        scale: {
          question: "How did the appearance change?",
          value: 5,
          low: "Barely",
          high: "Clearly",
        },
        helpful: 58,
      },
      {
        id: "x2",
        name: "Marcus L.",
        verified: true,
        age: "3 weeks ago",
        stars: 5,
        title: "Cardiac line, end to end",
        body: "Two patches placed end to end covered the whole incision. Four months later the line is flatter and much closer to my skin tone.",
        facets: [
          ["Scar age", "Post-op, 4 months"],
          ["Zone", "Sternum"],
          ["Protocol", "Daily, 20 h"],
        ],
        helpful: 33,
      },
      {
        id: "x3",
        name: "Yuki S.",
        verified: true,
        age: "2 months ago",
        stars: 4,
        title: "Support answered in a day",
        body: "Asked when to start after a C-section. Clear answer within the day, with the caveat to check with my surgeon first. That is the right answer.",
        facets: [
          ["Scar age", "Post-op, 8 weeks"],
          ["Zone", "Lower abdomen"],
          ["Protocol", "Daily, 14 h"],
        ],
        helpful: 12,
      },
    ],
  },
};

export function getReviews(slug: string): ReviewSet | null {
  return REVIEWS[slug] ?? null;
}
