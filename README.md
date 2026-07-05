# PROOF — Premium Silicone Scar Patch

Boutique e-commerce de la marque **Proof** — patchs en silicone médical pour
cicatrices. « Honor it. Don't erase it. »

Construite selon la Direction Artistique V1.0 (juillet 2026) : le luxe
clinique — la rigueur d'un dispositif médical, le désir d'un objet de
parfumerie de niche, l'attitude d'un drop streetwear.

## Stack

- [Next.js](https://nextjs.org) (App Router, rendu 100 % statique)
- React 19 + TypeScript
- CSS sur mesure, zéro framework UI — le design system de la DA est implémenté
  dans `app/globals.css`
- Polices : Archivo (variable, axe `wdth` 62–125), Instrument Sans,
  IBM Plex Mono — chargées via `next/font`

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
| `/story` | Manifeste — kintsugi, le trait |
| `/science` | Mécanisme, preuves, ce qu'on refuse de dire |
| `/help` | FAQ + contact |
| `/checkout` | Récapitulatif du panier (paiement branché au lancement) |

Phase 2 (The Wall, Journal, Chapters) : annoncée dans le footer, à construire
après le lancement.

## Design system — repères DA

- **Couleurs** : Noir Encre `#0B0B0B` (fond, jamais `#000`), Charbon `#161616`
  (surfaces), Os `#EAE3D6` (texte, boutons), Peau `#C9A98C` (accents chauds),
  Or Cicatrice `#A9865A` (le trait, labels mono)
- **Radius 0. Partout. Toujours.** (verrouillé par `border-radius: 0 !important`)
- **Trois voix typographiques** : Archivo Expanded Black (crie), Instrument
  Sans (raconte), IBM Plex Mono (prescrit)
- **Le Trait** : séparateur signature en Or Cicatrice, 1.4 px, animation de
  tracé gauche → droite au scroll (2 s, easing organique,
  `prefers-reduced-motion` respecté) — composant `components/Trait.tsx`,
  jamais plus d'un par écran
- **Grille** : 12 colonnes, max 1100 px, gouttières 14 px, sections 88 px,
  rythme vertical multiple de 8

## Images produit

Déposez vos photos dans `public/products/` en les nommant par slug —
`the-patch.jpg`, `the-ritual.jpg`, `protocol.jpg`, et `hero.jpg` pour le héros
de la home. Dès qu'un fichier existe, il remplace automatiquement le visuel
CSS généré (cartes shop + fiches produit). Formats : avif, webp, jpg, jpeg,
png. Détails et rappels DA dans `public/products/README.md`.

## Panier & paiement

Le panier vit côté client (`lib/cart.tsx`, persistance `localStorage`).
La page `/checkout` est prête à être branchée sur Stripe, Shopify ou tout
autre PSP — le bouton de paiement est volontairement en mode « drop à venir ».

## Configuration

- `NEXT_PUBLIC_SITE_URL` : URL canonique du site (sitemap, robots, Open
  Graph). Par défaut `http://localhost:3000`.
