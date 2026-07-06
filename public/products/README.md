# Images produit — déposez vos fichiers ici

Déposez une image dans ce dossier et le site l'utilise automatiquement à la
place du visuel CSS généré (`PlateVisual`). Les noms de fichiers actuels de la
marque sont déjà reconnus (majuscules/minuscules indifférentes) ; la table
complète des slots vit dans `lib/product-image.ts`.

## Vos fichiers → où ils apparaissent (DA V2.0)

| Votre fichier | Emplacement sur le site |
| --- | --- |
| `siliconegelmannequin.png` | **Héros** (portrait lumineux, cicatrice assumée) + étape « Wear » du rituel |
| `patchProof.png` | **The Patch** — carte shop (état primaire, macro sur peau) + étape « Apply » |
| `texturegelsilicone.png` | **The Gel** — carte shop (état primaire, texture) + étape « Clean » + macro texture |
| `patchproofeditionslimitee.png` | **The Ritual** — état hover studio + galerie fiche |
| `packagingproofpatch.png` | **Story** (macro kintsugi, parallaxe) + hover Protocol |
| `produitgelsilicone.png` | The Gel — hover studio + galerie ; Science 01 |
| `gelsilicone.png` | The Gel — galerie fiche ; Science 02 |
| `Patchproofgris.png` | The Patch — hover studio + galerie fiche |
| `ordonnancepatchsilicone.png` | **Non utilisée** — visuel hors marque, à retirer |

Les cartes The Ritual et Protocol n'ont pas de photo primaire claire : elles
affichent la plate CSS (`PlateVisual`, patch argile sur porcelaine) jusqu'à ce
qu'un fichier `the-ritual.png` / `protocol.png` soit déposé.

## Slots reconnus

Primaires clairs : `hero`, `the-patch`, `the-ritual`, `protocol`, `the-gel`.
Hover studio : `alt-the-patch`, `alt-the-ritual`, `alt-protocol`, `alt-the-gel`.
Rituel : `ritual-clean`, `ritual-apply`, `ritual-wear`.
Galeries PDP : `<slug>-2`, `<slug>-3`. Story : `story-object`. Science :
`science-material`, `science-mechanism`. Macro : `texture`.
Extensions dans l'ordre : `.avif`, `.webp`, `.jpg`, `.jpeg`, `.png`.

Next.js redimensionne et optimise tout seul — visez ≥ 1200 px de large, ratio
vertical 4:5 pour les cartes et le hero. Après ajout/suppression, relancez
`npm run dev` ou refaites un build.

## Rappels DA V2.0 « Clinical warmth »

- **Lumière, pas noir** : fonds bone / porcelaine / plâtre chaud, pas de fond
  noir plein (le noir est réservé à la seule section Science).
- Lumière naturelle latérale douce, rasante (≈ 20°) pour révéler la texture
  silicone ; une seule ombre portée neutre.
- Peau réelle, cicatrice visible et assumée, jamais lissée. Zéro avant/après.
- Chaque image doit pouvoir être confondue avec une campagne de soin de luxe
  (Sturm / Aesop / La Mer / Rhode) — jamais avec une photo de pharmacie.

Le brief photo complet (cadrage, lumière, sujet) des assets flagship à produire
est dans `docs/DESIGN.md` § 5.
