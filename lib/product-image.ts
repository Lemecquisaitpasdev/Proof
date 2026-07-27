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
  /* Cards shop, état PRIMAIRE, toujours lumineux : photo claire si elle
     existe, sinon la plate CSS (pas d'alias → null). */
  "the-patch": ["the-patch", "patchproof"],
  "the-ritual": ["the-ritual"],
  protocol: ["protocol"],
  "the-gel": ["the-gel", "gelensiliconesurfondblanc", "texturegelsilicone"],

  /* Cards shop, état HOVER : l'objet photographié au studio. */
  "alt-the-patch": ["alt-the-patch", "patchproofgris"],
  "alt-the-ritual": ["alt-the-ritual", "patchproofeditionslimitee"],
  "alt-protocol": ["alt-protocol", "packagingproofpatch"],
  "alt-the-gel": ["alt-the-gel", "gelsiliconeavecboiteproduit", "produitgelsilicone"],

  /* Galeries PDP */
  "the-patch-2": ["the-patch-2", "patchproofgris"],
  "the-patch-3": ["the-patch-3", "patchpackaging"],
  "the-ritual-2": ["the-ritual-2", "patchproofeditionslimitee"],
  "protocol-2": ["protocol-2", "packagingproofpatch"],
  "the-gel-2": ["the-gel-2", "photogelavecfond", "produitgelsilicone"],
  "the-gel-3": ["the-gel-3", "photogelmarketing", "gelsilicone"],
  /* La bille de gel tenue à la pince chirurgicale, plan macro éditorial. */
  "the-gel-4": ["the-gel-4", "moleculedegelcapturer"],
  "the-gel-5": ["the-gel-5", "mannequinmetisse"],
  "the-gel-6": ["the-gel-6", "applicationdegelmen"],

  /* Héros de la home, portrait lumineux, cicatrice visible, assumée. */
  hero: ["hero", "gelensiliconenutulisationfemme", "siliconegelmannequin"],

  /* Le Rituel, Clean / Apply / Wear (crossfade du stepper) */
  "ritual-clean": ["ritual-clean", "photogelsalledebain", "texturegelsilicone"],
  "ritual-apply": ["ritual-apply", "patchproof"],
  "ritual-wear": ["ritual-wear", "gelsiliconesurhomme", "siliconegelmannequin"],

  /* Page Science */
  "science-material": ["science-material", "analyticprecision"],
  "science-mechanism": ["science-mechanism", "technologie3couchescellulaire"],
  "science-pattern": ["science-pattern", "cellulesiliconemotif"],

  /* Story, l'objet, packaging à la fissure kintsugi */
  "story-object": ["story-object", "packagingproofpatch"],

  /* La section « objet » de la home, bouchons acier embossés P */
  bouchon: ["bouchon", "bouchonproduit"],

  /* Macro texture silicone */
  texture: ["texture", "texturegelsilicone"],

  /* Panneaux plein écran des fiches produit */
  "patch-panel-a": ["patch-panel-a", "patchpackaging"],
  "patch-panel-b": ["patch-panel-b", "mannequinproof"],

  "gel-panel-a": ["gel-panel-a", "gelsiliconesurhomme", "siliconegelmannequin"],
  "gel-panel-b": ["gel-panel-b", "photogelmarketing", "photogelavecfond"],
  "gel-panel-c": [
    "gel-panel-c",
    "gelensiliconenutulisationfemme",
    "photogelsalledebain",
  ],
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
