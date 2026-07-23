# PROOF — Design System V3 « Laboratory of proof »

Dark / Gold / Kintsugi. Le vide sombre est le luxe. Référence structurelle :
case study Covalent (Obrazur Brands), transposé — jamais copié.

## Ratio visuel

90 % dark · 8 % bone/argent (sections accent) · 2 % or.
L'or n'est jamais un aplat : filets, points, la lumière dans une fissure.

## Tokens (app/globals.css `:root`)

| Token | Valeur | Rôle |
|---|---|---|
| `--base` | `#0F0D0A` | champ de la page, noir profond chaud |
| `--surface` | `#1A1712` | surfaces posées : cartes, drawer, blueprint |
| `--contrast` | `#EDE8DF` | bone : texte, boutons primaires, sections accent |
| `--dim` | `#A89F90` | voix secondaire sur dark (≥ 7:1) |
| `--kintsugi` | `#C9A227` | or, gros corps et filets uniquement |
| `--gold-deep` | `#D8B848` | or lisible en petit texte sur dark (≥ 8:1) |
| `--clay` | `#B8A088` | métal chaud, résidus V2 |
| `--hairline(-strong)` | bone α .16/.34 | filets 1px |

Les sections accent claires posent `background: var(--contrast)` et parlent
en `--base-55/70` (`.science`, `.feature`, `.brand-tile__art--ink`).

## Typographie

- **Display** — Archivo Expanded Black, capitales. `.d1/.d2/.d3`,
  `.statement` (52→176 px, un seul message par écran),
  `.code-giant` (PR‑0X en contour, jamais rempli).
- **Texte** — Instrument Sans 16 px / 1.65.
- **Annotations** — IBM Plex Mono, petites capitales espacées :
  `.mlabel` (`● LABEL / REF`), `.mcap` (légende d'image),
  `.refline` (pied de section), `.assure` (bandeau réassurance).

## Langage rapport de laboratoire

- Nomenclature produit : **PR-01** The Patch · **PR-02** The Ritual ·
  **PR-03** The Proof Protocol (héros du panier) · **PR-04** The Gel.
  Champs `code`, `method`, `cta` dans `lib/products.ts`.
- Chaque image porte sa légende `.mcap` (`● PHOTO 01 / SILHOUETTE STUDY`).
- Références fictives crédibles : `REF: SCAR-01`, `[ BATCH 4099XF ]`.
- CTA : « Begin the protocol », « Start your ritual », « Claim your proof ».
  Jamais « Buy now ».

## Système kintsugi

`components/KintsugiLine.tsx` (underline / strike / separator, dessin au
scroll par stroke-dashoffset). Blueprint du symbole sur `/brand` : le P en
filet, cercles de construction, points d'ancrage or, cotes 1X/3X.

## Motion

`components/Fx.tsx` — IntersectionObserver reveals (fade + translateY),
parallax rAF transform-only, draws SVG. Easing `cubic-bezier(0.16,1,0.3,1)`.
`prefers-reduced-motion` neutralise tout. Aucune animation gratuite.

## Garde-fous

- Claims : « improves the appearance », jamais heal/cure/disappear.
- Contraste AA minimum sur dark ; petits textes or → `--gold-deep`.
- Packshots clairs conservés tels quels : tuiles cliniques sur champ sombre.
- En cas d'hésitation : sobriété et précision.
