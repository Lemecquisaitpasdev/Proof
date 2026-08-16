# Passer Proof sur Shopify

Ce dossier contient tout ce qu'il faut pour transférer le site sur Shopify :
un thème Liquid complet (`../shopify-theme/`), le fichier d'import des
produits, et les visuels compressés.

---

## 1. Ce qui change vraiment

Le site Next.js était une **vitrine** : les trois produits étaient codés en
dur, le panier vivait dans le `localStorage` du navigateur, et le checkout
était un faux — un lien `mailto:` « Get notified at the drop ». Aucun
paiement n'était possible.

En passant sur Shopify :

| | Avant (Next.js) | Après (Shopify) |
|---|---|---|
| Produits | `lib/products.ts`, en dur | Catalogue Shopify, éditable dans l'admin |
| Conditionnements du Patch | 3 objets `variants` | 3 vraies variantes sur l'option « Pack size » |
| Panier | `localStorage`, prix calculés côté client | Panier Shopify (Ajax API), prix serveur |
| Checkout | **factice** (`mailto:`) | **Checkout Shopify réel**, paiements, taxes, livraison |
| Stock | inexistant | Suivi d'inventaire |
| Contenu éditorial | JSX | Sections éditables dans le theme editor |
| Images | 77 Mo de PNG servis en direct | CDN Shopify (WebP + tailles automatiques) |

Le design ne bouge pas : les 4 595 lignes du design system sont reprises
**telles quelles** dans `assets/proof.css`. Seules deux choses ont été
ajoutées — les familles de police (chargées depuis Google Fonts au lieu de
`next/font`) et un court bloc d'addenda pour les écarts de balisage imposés
par Liquid (le sélecteur de pack devient un `<label>`, la quantité un
`<input>`).

---

## 2. Ordre de marche

### a. Créer la bonne boutique

⚠️ **La boutique connectée à cette session est un magasin de test** :
« My Store 3 » (`cpwdvn-d3.myshopify.com`), en **roupie indonésienne (IDR)**,
fuseau Indonésie.

> **Plan: trial — you'll need to upgrade before you can start selling and unlock full features**

Avant d'importer quoi que ce soit, il faut la vraie boutique Proof, avec la
**bonne devise** : le catalogue est libellé en dollars (29 / 69 / 85 / 129 /
130). Shopify ne convertit pas les prix à l'import — il les prend au pied de
la lettre dans la devise de la boutique. Importer ce CSV dans une boutique en
IDR vendrait Le Patch **29 roupies**, soit moins d'un centime.

### b. Importer les produits

```bash
node shopify-migration/scripts/export-products.mjs   # régénère products.csv
```

Admin Shopify → **Produits → Importer** → `products.csv`.

3 produits, 5 variantes. Le fichier porte aussi les metafields `proof.*` que
le thème lit (chapitre, méthode, accroche, couverture…), en colonnes
`Metafield: …` prises en charge nativement par l'import.

Pense à créer les **définitions de metafields** (Paramètres → Metafields →
Produits / Variantes) avec le même namespace `proof` : sans elles les valeurs
sont bien importées, mais restent invisibles dans l'admin.

| Produit | Metafields | Variante | Metafields |
|---|---|---|---|
| `code`, `method`, `chapter`, `chapter_name` | texte | `coverage` | texte |
| `badge`, `cta`, `card_line`, `best_for` | texte | `note` | texte long |
| `tagline` | texte long | `badge` | texte |

### c. Téléverser les visuels

```bash
node shopify-migration/scripts/optimize-images.mjs
```

46 visuels, **76,2 Mo → 4,0 Mo** (−95 %), en WebP bornés à 2000 px. Les
originaux dans `public/` ne sont pas touchés.

Admin → **Contenu → Fichiers** pour les visuels de sections, et directement
sur chaque fiche produit pour les packshots. `images-map.csv` donne la
correspondance fichier source → fichier Shopify.

L'ordre des images compte : la **première** image d'un produit est le visuel
de la carte, la **deuxième** est celle du crossfade au survol.

### d. Installer le thème

```bash
cd shopify-theme && zip -r ../proof-theme.zip .
```

Admin → **Boutique en ligne → Thèmes → Ajouter → Importer un fichier zip**.

Ou, pour travailler en direct avec le CLI Shopify :

```bash
shopify theme dev --store cpwdvn-d3.myshopify.com
```

### e. Brancher le contenu

1. **Navigation** — créer le menu `main-menu` : Shop, Story, Science, Help.
2. **Modèle du Gel** — sur la fiche du Gel, choisir le modèle `product.gel`
   (c'est celui qui porte Deep Matrix et « Honor your story »), puis
   téléverser les visuels dans les deux sections via le theme editor.
3. **Pages** — créer les pages Story / Science / Help / Brand ; assigner
   `page.science` à la page Science (elle arrive avec ses six sections
   éditoriales déjà rédigées).
4. **Accueil** — la home arrive avec le héros et la grille produits ; pointer
   la grille sur la collection voulue et téléverser le visuel du héros.

---

## 3. Ce que le thème contient

```
shopify-theme/
  assets/      proof.css (design system porté) · proof.js (moteur, sans dépendance)
  config/      réglages du thème
  layout/      theme.liquid
  locales/     en.default.json
  sections/    announcement-bar, header, footer, cart-drawer,
               main-product, product-tech (Deep Matrix), product-honor,
               main-collection, main-cart, main-page, main-404,
               home-hero, featured-products, editorial-split
  snippets/    product-card
  templates/   index, product, product.gel, collection, cart, page,
               page.science, 404, search, blog, article, list-collections
```

`proof.js` remplace en JavaScript natif les 13 composants React : reveals et
parallaxe, tiroir panier, galerie, sélecteur de variantes, barre d'achat
collante, fondu Deep Matrix, stepper du rituel, onglets, filmstrip, modale.
Aucune dépendance, ~500 lignes.

**Deux principes tenus dans tout le thème :**

- *Le serveur fait foi.* Après chaque appel Ajax, le tiroir est re-demandé à
  Shopify (Section Rendering API) plutôt que reconstruit en JavaScript : un
  seul rendu, celui de Liquid.
- *Ça marche sans JavaScript.* Le sélecteur de conditionnement est un groupe
  de radios nommées `id` : même moteur coupé, le bon variant part au panier
  et le formulaire poste nativement.

---

## 4. Ce qui reste à faire par un humain

Ces points ne peuvent pas être tranchés par du code — ils engagent la marque
et, pour certains, sa conformité réglementaire.

1. **La devise et la boutique.** Voir §2.a. Bloquant avant toute vente.
2. **Le plan.** La boutique est en essai : *Plan: trial — you'll need to
   upgrade before you can start selling and unlock full features*.
3. **Les chiffres de l'étude.** `lib/products.ts` porte encore la mention
   « ⚠ Les pourcentages ci-dessous sont des ESPACES RÉSERVÉS ». Ils ne sont
   **pas** repris dans le CSV, et aucune section du thème ne les affiche.
   Il faut les vrais résultats — ou pas de section résultats du tout.
4. **La ligne de distinction.** « Recognized in independent lab-tech
   evaluations » est un texte générique de remplacement, sans prix réel
   derrière. Le réglage existe dans la section Deep Matrix : le laisser vide
   tant qu'il n'y a pas de distinction vérifiable.
5. **La mention réglementaire.** « Proof improves the appearance of scars… »
   est dans les réglages du thème. À faire valider selon les marchés visés :
   les allégations sur les cicatrices sont encadrées, et le cadre change d'un
   pays à l'autre.
6. **Pages légales.** CGV, confidentialité, retours, mentions légales — rien
   n'existe côté site aujourd'hui.

---

## 5. Ce qui n'a pas été porté

Honnêtement, pour que la reprise se fasse les yeux ouverts :

- **La page Story et la page Brand** n'ont pas de modèle dédié. Elles peuvent
  être montées avec la section `editorial-split` (c'est ce qui a été fait
  pour Science), mais leurs mises en page très singulières — la modale
  `StoryDialog`, la marquee presse, les tuiles de marque — demandent chacune
  une section sur mesure.
- **Les sections « Dans la vraie vie » (routine) et « résultats d'étude »**
  ont leur JavaScript prêt dans `proof.js` (filmstrip, onglets) mais pas
  encore de section Liquid : elles attendent respectivement les vraies photos
  communauté et les vrais chiffres.
- **Les avis** (`lib/reviews.ts`) sont des données de démonstration. Sur
  Shopify, ils relèvent d'une application d'avis (Judge.me, Loox…), pas du
  thème.
- **Le rendu n'a pas été vérifié dans un navigateur** : la structure, tous les
  JSON et tous les schémas de sections sont validés, mais il faut un
  `shopify theme dev` sur une vraie boutique pour contrôler le rendu réel.
