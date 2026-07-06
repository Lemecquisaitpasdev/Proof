# PROOF — DA V2.0 « Clinical Warmth »

Design plan du redesign flagship. Réfs : Dr. Barbara Sturm (autorité clinique
lumineuse), Aesop (warm minimalism littéraire), La Mer (luxe cinématique),
Rhode (modernité soft, mobile-first).

Le positionnement, le copy stratégique, la structure en chapitres, le naming
et les prix ne bougent pas. Seule l'exécution visuelle change : du noir
brutaliste vers la lumière — la peau est le sujet, le site devient lumineux.
Le noir survit en **une seule** section (The Science), comme moment La Mer.

---

## 1. Audit du code existant (V1)

**Stack.** Next 16 / React 19, App Router, CSS global unique (`globals.css`,
~1500 lignes), aucun framework CSS, aucune lib d'animation. Panier en contexte
React + localStorage. Images servies par slots (`lib/product-image.ts`).

**Composants.** Topbar (marquee specs), Header, PressMarquee, ProductCard,
PatchVisual (packshot CSS sombre), Trait (zigzag or animé), Posology,
AddButton, CartDrawer, Footer. Pages : home, shop, shop/[slug], story,
science, help, checkout, 404.

**Dettes / diagnostic.**
- Dark intégral (`#0b0b0b`), 4 fonts chargées (Archivo, Instrument, Plex
  Mono, Playfair — Playfair uniquement pour 3 wordmarks presse).
- Typo mono-registre : Archivo Black étirée ALL-CAPS partout + mono partout.
  Aucune voix sérif.
- Cards produit bordées 1px identiques, bouton « ADD » brut, PDP non
  immersive (pas de galerie sticky, pas d'accordéons, pas de cross-sell
  éditorialisé, pas de sticky bar mobile).
- Rythme uniforme : toutes les sections à 88px, mêmes fonds.
- Motion : un seul device (Trait zigzag) + hover scale images. Pas de
  reveals, pas de séquence d'entrée hero, pas de parallaxe.
- `* { border-radius: 0 !important }` (nuke global), à remplacer par une
  discipline locale.
- **Bug de contenu** : le slot `ordonnance` de la home affiche
  `ordonnancepatchsilicone.png`, qui est un visuel marketing de
  climatisation totalement hors-marque. Débranché dans la V2.

**Assets photo disponibles** (public/products) :
| Fichier | Tonalité | Usage V2 |
|---|---|---|
| siliconegelmannequin.png (1086×1448) | lumineux, portrait cicatrice visible | Hero + étape Wear |
| patchProof.png (1122×1402) | lumineux, macro patch sur peau | Étape Apply + PDP Patch |
| texturegelsilicone.png (1086×1448) | lumineux, texture gel sur porcelaine | Card The Gel + étape Clean |
| packagingproofpatch.png | sombre, boîte fissure kintsugi | Story (parallaxe) + hover Protocol |
| produitgelsilicone.png | sombre, packshot gel pierre | hover The Gel + PDP Gel |
| gelsilicone.png | sombre, gel cylindres verre | PDP Gel |
| patchproofeditionslimitee.png | sombre, patch posé noir | hover The Ritual + PDP |
| Patchproofgris.png | sombre, patch gris | hover The Patch + PDP |
| ordonnancepatchsilicone.png | HORS-MARQUE | **retiré des slots** |

---

## 2. Design tokens finaux

### Couleur

```css
--bone:      #F5F1EA;  /* fond principal — blanc os chaud */
--porcelain: #FBF9F5;  /* fond secondaire, plates produits, fiches */
--ink:       #1A1815;  /* texte + LA section sombre (jamais #000) */
--clay:      #B8A088;  /* ton peau/argile — filets, fonds teintés. Jamais en texte courant. */
--kintsugi:  #C9A227;  /* or mat — ligne cicatrice, filets, losanges. Jamais en aplat, jamais en texte < 24px. */
--graphite:  #4A463F;  /* texte secondaire — AA sur bone (≈8:1) */

/* Dérivés */
--kintsugi-ink: #7E6412;            /* or profond, seul or autorisé en petit texte (≥5:1 sur bone) */
--hairline:  rgba(184,160,136,.32); /* filet 1px clay 30% */
--ink-08 / --ink-40 / --ink-55:     /* voiles d'encre pour presse, captions */
--bone-12 / --bone-55 / --bone-70:  /* voiles d'os pour la section sombre */
```

Règles : or jamais en aplat, jamais de dégradés décoratifs, jamais de
glassmorphism, ombres uniquement neutres (`rgba(26,24,21,…)`), coins droits
partout (exception : pastilles badge 2px).

### Typographie

- **Display — Fraunces** (Google, variable, optical size large, italique
  pour les exergues). Light/Regular (340–420), casse mixte, interlettrage
  −0.015em. La voix Aesop/La Mer.
- **Body — Instrument Sans** (déjà en place). 1.65 de line-height.
- **Utility — IBM Plex Mono**, petites doses cliniques uniquement :
  posology, batch, specs, numéros R.01. Plus jamais en display.
- Archivo et Playfair Display **supprimées** (−2 familles chargées).

Échelle : display-1 `clamp(44px→96px)`, display-2 `clamp(36px→64px)`,
display-3 `clamp(28px→48px)` ; headings 32/24 ; body 18/16 ; caption 13/11.
Chiffres et prix en `font-variant-numeric: tabular-nums`.

### Grille & espace

4/8px strict. Container max **1440px**, gouttières `clamp(24px→80px)`.
Rythme vertical : sections 96–160px desktop, sections contemplatives plus
hautes que les sections denses (le rythme respire, il n'est plus uniforme).

### Motion

- Micro-interactions 150–200ms ease ; reveals 500–600ms
  `cubic-bezier(.22,1,.36,1)`, fade + translateY(24px), stagger 60ms, une
  fois (IntersectionObserver).
- Ligne kintsugi : `stroke-dashoffset` 1.2s ease-out.
- Parallaxe : translateY ±6–8%, rAF, transform only.
- Marquees : specs 60s/loop pause au hover, presse 90s.
- `prefers-reduced-motion` : tout est neutralisé (reveals visibles
  d'emblée, lignes dessinées, marquees figés, parallaxe off).
- Jamais de bounce.

---

## 3. La signature : la ligne kintsugi

Une seule fêlure d'or, déclinée. SVG path organique (courbes irrégulières,
une micro-fourche aux 2/3 — comme une réparation à l'or), stroke 1.3px
`--kintsugi`, caps ronds, `pathLength=1`.

Comportements :
1. **Hero** — souligne « story. » ; se dessine au chargement (1.2s,
   ease-out, 0.9s après le fade du titre).
2. **Séparateur de sections** — remplace le zigzag V1 ; se dessine au
   scroll (une fois).
3. **Story** — traverse « with gold » (variant strike), dessinée au scroll.
4. **Nav & liens texte** — filet or 1px qui se trace au hover (150ms,
   background-size, pas de SVG par lien).
5. **Newsletter** — border-bottom 1px devient or au focus.
6. **Boutons primaires** — au hover, scale(0.98) + filet or apparaît sous
   le bouton.

Discipline : jamais plus d'un moment or par écran. Tout le reste reste
calme autour.

---

## 4. Wireframes texte par section

**Hero (bone, min 100svh).** Eyebrow mono graphite « Premium silicone scar
patch — Batch Nº 017 » → H1 Fraunces casse mixte « Your scar has a story. »
(mots par groupes, stagger 40ms), « story. » souligné or → lead → CTA plein
ink « Shop The Ritual — $69 » + lien texte « Read the story → » → portrait
lumineux en bleed à droite, vertical, parallaxe 6%. Séquence totale < 1.6s.

**Marquee specs (porcelain).** Texte graphite, losanges or 4px en
séparateurs, 60s/loop, pause hover.

**Presse (bone).** Wordmarks ink 40% → 100% au hover, défilement 90s très
lent, masque latéral.

**Shop — Pick your chapter (bone).** Grille 4/2/1 sans bordures ; l'image
est la card : plate porcelaine, patch argile ombre douce (PlateVisual) —
The Gel en photo texture réelle. Hover : crossfade vers la photo studio de
l'objet + prix/« Add » remontent en fade 200ms (toujours visibles en
tactile). Badge pastille or/porcelaine 2px. « Chapitre 02 — Le Rituel »
conservé en mono. Quick-add : « Added ✓ » 1.5s, compteur cart avec spring.

**Science (INK — le seul moment sombre).** Split : titre + exergue Fraunces
italique bone (« We don't say heal… ») ; schéma SVG minimal du mécanisme
(patch / occlusion / hydratation / peau en coupe), traits fins bone,
labels mono, dessiné au scroll ; or autorisé en texte ici (contraste 7:1).

**Ritual (bone).** Stepper éditorial : photo du geste à gauche (sticky,
crossfade par étape), 3 étapes à droite activées au scroll (pas de
scroll-jack), R.01/R.02/R.03 en mono or profond. Mobile : photo de l'étape
active au-dessus, étapes empilées. Posology en vraie fiche médicale :
porcelaine, filet or supérieur, tampon « PROOF » en filigrane sérif, mono.

**Story (bone, contemplative).** Beaucoup de blanc. « In Japan, broken
things are repaired *with gold*. » en display-1, ligne or en strike à
travers « with gold », dessinée au scroll. Macro packaging kintsugi en
parallaxe lent. Un lien texte.

**Footer (bone).** Logo Proof en Fraunces, colonnes fines, liens graphite,
newsletter input border-bottom 1px → or au focus, Phase 2 (The Wall /
Journal — soon) conservé, filigrane PROOF ink 4%.

**PDP.** 2 colonnes : galerie sticky gauche (plate + macro texture +
on-skin + geste), buy-box droite : titre Fraunces, prix tabular, sélecteur
quantité minimal, accordéons filets clay (What's inside / How to use /
Shipping & returns / Clinical evidence), « Ships in 48h » en mono. Sticky
add-to-cart bar mobile. « Complete the ritual » : cross-sell éditorialisé
2 produits (« Patch by night, gel by day »). Narrative chapitre + FAQ
conservées, restylées.

Pages help / checkout / 404 : héritent du système, porcelaine + fiches.

---

## 5. Assets à produire (brief photo)

Le site fonctionne avec les assets actuels ; pour le niveau flagship
complet, produire :

1. **Portrait hero définitif** — 4:5 vertical, lumière naturelle latérale
   douce (fenêtre), fond bone/plâtre chaud, peau réelle avec cicatrice
   nette et assumée, regard caméra, pas de produit ou produit discret.
2. **Packshots clairs par produit** (Patch, Ritual ×3 + tin, Protocol ×8 +
   guide, Gel) — sur porcelaine/pierre claire, lumière rasante 20°
   révélant la texture silicone, ombre portée douce unique, 4:5.
3. **On-skin par produit** — patch sur épaule/abdomen, gel sur mâchoire,
   macro 1:1, lumière chaude, peau réelle non lissée.
4. **Triptyque gestes du rituel** — même modèle, même lumière : Clean (eau,
   serviette lin), Apply (doigts pressant le patch, 10 secondes), Wear
   (patch porté sous un vêtement ouvert). 4:5.
5. **Kintsugi réel** — macro céramique réparée à l'or, lumière rasante,
   fond bone (section Story).
6. **Macro texture silicone** — la surface embossée P en lumière rasante
   sur fond clair (marquee/PDP).
7. **Optionnel — boucle vidéo 6–8s** muette : étalement du gel ou flexion
   du patch, macro, pour le hero PDP (moment La Mer).

---

## 6. Checklist de sortie

- Responsive 390px parfait sur hero / shop / PDP en premier.
- AA sur bone pour tout texte ; focus visible outline or 2px offset.
- `prefers-reduced-motion` partout ; page complète sans JS.
- next/image partout, ratios fixes, priority sur le hero seulement,
  lazy sous la fold ; LCP < 2s ; zéro lib d'animation.
- Un commit logique par section.
