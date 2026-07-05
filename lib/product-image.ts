import fs from "node:fs";
import path from "node:path";

/**
 * Résout l'image d'un « slot » d'affichage à partir des fichiers présents
 * dans /public/products. Retourne son chemin public, ou null → les
 * composants retombent sur le visuel CSS généré (règle R.01).
 *
 * Chaque slot accepte un nom canonique + les noms de fichiers réels de la
 * marque (insensible à la casse). Serveur uniquement.
 */
const DIR = path.join(process.cwd(), "public", "products");
const EXTS = new Set([".avif", ".webp", ".jpg", ".jpeg", ".png"]);

const ALIASES: Record<string, string[]> = {
  // Produits — carte shop + fiche
  "the-patch": ["the-patch", "patchproof"],
  "the-ritual": ["the-ritual", "patchproofeditionslimitee"],
  protocol: ["protocol", "packagingproofpatch"],

  // Seconde image de galerie sur les fiches produit
  "the-patch-2": ["the-patch-2", "patchproofgris"],
  "the-ritual-2": ["the-ritual-2"],
  "protocol-2": ["protocol-2"],

  // Héros de la home
  hero: ["hero", "siliconegelmannequin"],

  // Page Science
  "science-material": ["science-material", "produitgelsilicone"],
  "science-mechanism": ["science-mechanism", "gelsilicone"],

  // Texture de fond de section (R.03 — opacité ≤ 10 %)
  texture: ["texture", "texturegelsilicone"],

  // Visuel ordonnance, à côté du bloc posologie de la home
  ordonnance: ["ordonnance", "ordonnancepatchsilicone"],
};

export function productImage(slot: string): string | null {
  let entries: string[];
  try {
    entries = fs.readdirSync(DIR);
  } catch {
    return null;
  }

  const wanted = ALIASES[slot] ?? [slot];
  for (const want of wanted) {
    for (const file of entries) {
      const ext = path.extname(file);
      if (!EXTS.has(ext.toLowerCase())) continue;
      if (path.basename(file, ext).toLowerCase() === want.toLowerCase()) {
        return `/products/${file}`;
      }
    }
  }
  return null;
}
