# Images produit — déposez vos fichiers ici

Déposez une image dans ce dossier et le site l'utilise automatiquement à la
place du visuel CSS généré. Aucun code à toucher, aucun renommage nécessaire :
vos noms de fichiers sont déjà reconnus (majuscules/minuscules indifférentes).

## Vos fichiers → où ils apparaissent

| Votre fichier | Emplacement sur le site |
| --- | --- |
| `patchProof.png` | **The Patch** — carte shop + fiche produit |
| `patchproofeditionslimitee.png` | **The Ritual** — carte shop + fiche produit |
| `packagingproofpatch.png` | **Protocol** — carte shop + fiche produit |
| `Patchproofgris.png` | The Patch — 2ᵉ image de la fiche produit |
| `siliconegelmannequin.png` | **Héros de la page d'accueil** |
| `produitgelsilicone.png` | Science — section 01, le matériau |
| `gelsilicone.png` | Science — section 02, le mécanisme |
| `texturegelsilicone.png` | Texture de fond (Story + Science, opacité 8 % — règle R.03) |
| `ordonnancepatchsilicone.png` | Home — à côté du bloc posologie |

## Convention générique (fonctionne aussi)

`the-patch`, `the-ritual`, `protocol` (+ suffixe `-2` pour une seconde image
de fiche), `hero`, `science-material`, `science-mechanism`, `texture`,
`ordonnance` — avec l'extension `.avif`, `.webp`, `.jpg`, `.jpeg` ou `.png`
(premier format trouvé dans cet ordre).

Next.js redimensionne et optimise tout seul — visez simplement ≥ 1200 px de
large. Après ajout ou suppression d'une image, relancez `npm run dev` ou
refaites un build.

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
