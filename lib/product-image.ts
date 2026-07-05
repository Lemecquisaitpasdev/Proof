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
  protocol: ["protocol"],
  "the-gel": ["the-gel", "produitgelsilicone"],

  // Images de galerie supplémentaires sur les fiches produit
  "the-patch-2": ["the-patch-2", "patchproofgris"],
  "the-ritual-2": ["the-ritual-2"],
  "protocol-2": ["protocol-2"],
  "the-gel-2": ["the-gel-2", "gelsilicone"],
  "the-gel-3": ["the-gel-3", "siliconegelmannequin"],

  // Héros de la home — le packshot packaging, fissure kintsugi
  hero: ["hero", "packagingproofpatch"],

  // Page Science
  "science-material": ["science-material", "produitgelsilicone"],
  "science-mechanism": ["science-mechanism", "gelsilicone"],

  // Texture de fond de section (R.03 — opacité ≤ 10 %)
  texture: ["texture", "texturegelsilicone"],

  // Visuel ordonnance, à côté du bloc posologie de la home
  ordonnance: ["ordonnance"],
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
