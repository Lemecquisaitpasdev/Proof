# Images produit — déposez vos fichiers ici

Déposez une image dans ce dossier et le site l'utilise automatiquement à la
place du visuel CSS généré (carte boutique + fiche produit). Aucun code à
toucher.

## Convention de nommage

Le nom du fichier = le slug du produit :

| Fichier | Produit | Où elle apparaît |
| --- | --- | --- |
| `the-patch.jpg` | The Patch — $29 | Carte shop + fiche produit |
| `the-ritual.jpg` | The Ritual — $69 | Carte shop + fiche produit |
| `protocol.jpg` | Protocol — $129 | Carte shop + fiche produit |
| `hero.jpg` | — | Visuel du héros de la page d'accueil |

Formats acceptés : `.avif`, `.webp`, `.jpg`, `.jpeg`, `.png` (premier trouvé
dans cet ordre). Next.js redimensionne et optimise tout seul — visez
simplement ≥ 1200 px de large.

Après ajout ou suppression d'une image, relancez `npm run dev` (ou refaites
un build) pour que le changement soit pris en compte.

## Rappels DA — règle R.01

- Fond charbon dégradé, jamais de fond blanc.
- Lumière directionnelle unique venant du haut-gauche, ombres longues.
- Surfaces : pierre brute, travertin sombre, béton.
- Chaque image doit pouvoir être confondue avec une campagne de parfum —
  jamais avec une photo de pharmacie.
- Zéro avant/après. La retouche lisse les fonds, jamais les gens.

Le reste du dossier `public/` sert aux fichiers statiques classiques
(og-image, favicons additionnels, etc.) — tout ce qui s'y trouve est servi à
la racine du site.
