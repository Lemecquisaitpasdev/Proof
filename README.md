# PROOF — Premium Silicone Scar Patch

Boutique e-commerce de la marque **Proof** — patchs en silicone médical pour
cicatrices. « Honor it. Don't erase it. »

Construite selon la Direction Artistique **V2.0 « Clinical warmth »**
(juillet 2026) : le site passe du noir à la lumière — la peau est le sujet.
La rigueur d'un dispositif médical rencontre le désir d'un objet de parfumerie
de niche, dans le registre du _quiet luxury skincare_ (réfs : Dr. Barbara
Sturm, Aesop, La Mer, Rhode). Le plan de DA détaillé vit dans
[`docs/DESIGN.md`](docs/DESIGN.md).

## Stack

- [Next.js](https://nextjs.org) (App Router, rendu 100 % statique)
- React 19 + TypeScript
- CSS sur mesure, zéro framework UI ni librairie d'animation — le design
  system est implémenté dans `app/globals.css`, la motion dans un unique
  `components/Fx.tsx` (IntersectionObserver + rAF)
- Polices : Fraunces (sérif éditorial variable `opsz` + italique),
  Instrument Sans (body), IBM Plex Mono (données cliniques) — via `next/font`

## Lancer le projet

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production (statique)
npm start          # sert le build
```

## Arborescence

| Route | Contenu |
| --- | --- |
| `/` | Home — héros, produits, science, rituel, histoire |
| `/shop` | Les trois chapitres + tableau comparatif |
| `/shop/the-patch` | The Patch — $29 — Chapitre 01, L'Accident |
| `/shop/the-ritual` | The Ritual — $69 — Chapitre 02, Le Rituel (best-seller) |
| `/shop/protocol` | Protocol — $129 — Chapitre 03, Le Protocole (post-op) |
| `/shop/the-gel` | The Gel — $39 — Chapitre 04, Le Geste (visage & zones mobiles) |
| `/story` | Manifeste — kintsugi, le trait |
| `/science` | Mécanisme, preuves, ce qu'on refuse de dire |
| `/help` | FAQ + contact |
| `/checkout` | Récapitulatif du panier (paiement branché au lancement) |

Phase 2 (The Wall, Journal, Chapters) : annoncée dans le footer, à construire
après le lancement.

## Design system — repères DA

- **Couleurs** : Bone `#F5F1EA` (fond, blanc os chaud), Porcelain `#FBF9F5`
  (surfaces, plates produit), Ink `#1A1815` (texte + LA section sombre, jamais
  `#000`), Clay `#B8A088` (filets, fonds teintés), Kintsugi `#C9A227` (l'or —
  jamais en aplat), Graphite `#4A463F` (texte secondaire). L'or profond
  `#7E6412` est le seul or autorisé en petit texte (AA sur bone).
- **Le noir survit dans une seule section** (The Science) — moment de contraste
  cinématique, pas régime général.
- **Coins droits partout** (exception : pastilles badge 2 px). Filets 1 px
  clay 30 %.
- **Trois voix typographiques** : Fraunces (sérif éditorial — murmure),
  Instrument Sans (parle), IBM Plex Mono (prescrit, petites doses cliniques).
- **La ligne kintsugi** : `components/KintsugiLine.tsx` — fêlure d'or organique
  à micro-fourche, déclinée en séparateur / underline (hero « story. ») /
  strike (« with gold »). Tracé `stroke-dashoffset` au scroll ou au chargement,
  filet or au hover des liens (`.klink`). Jamais plus d'un moment or par écran.
- **Motion** : `components/Fx.tsx` — reveals fade + translateY(24 px) stagger
  60 ms, parallaxe rAF ±6–8 %, tracés. Filet de sécurité anti-flick. Tout est
  neutralisé par `prefers-reduced-motion` ; la page est complète sans JS.
- **Grille** : max 1440 px, gouttières `clamp(24→80 px)`, rythme 4/8, sections
  contemplatives plus hautes que les sections denses.

## Images produit

Déposez vos photos dans `public/products/` en les nommant par slot (voir la
table dans `lib/product-image.ts`). Slots clés : `hero`, `the-patch` /
`the-ritual` / `protocol` / `the-gel` (état primaire lumineux des cartes),
`alt-<slug>` (état hover studio), `ritual-clean` / `ritual-apply` /
`ritual-wear` (stepper), `story-object` (macro kintsugi). Dès qu'un fichier
existe il remplace le visuel CSS généré (`PlateVisual`). Formats : avif, webp,
jpg, jpeg, png.

Le brief photo complet des assets flagship à produire (portrait hero, packshots
clairs, on-skin, triptyque des gestes, macro kintsugi) est dans
[`docs/DESIGN.md`](docs/DESIGN.md) § 5.

## Panier & paiement

Le panier vit côté client (`lib/cart.tsx`, persistance `localStorage`).
La page `/checkout` est prête à être branchée sur Stripe, Shopify ou tout
autre PSP — le bouton de paiement est volontairement en mode « drop à venir ».

## Configuration

- `NEXT_PUBLIC_SITE_URL` : URL canonique du site (sitemap, robots, Open
  Graph). Par défaut `http://localhost:3000`.
