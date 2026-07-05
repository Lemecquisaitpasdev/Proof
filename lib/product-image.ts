import fs from "node:fs";
import path from "node:path";

/**
 * Cherche une image dans /public/products pour un slug donné
 * (`the-patch`, `the-ritual`, `protocol`, ou `hero` pour la home).
 * Retourne son chemin public, ou null → les composants retombent
 * alors sur le visuel CSS généré (règle R.01).
 *
 * Serveur uniquement — ne pas importer depuis un composant client.
 */
const EXTENSIONS = ["avif", "webp", "jpg", "jpeg", "png"] as const;

export function productImage(name: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = path.join(process.cwd(), "public", "products", `${name}.${ext}`);
    if (fs.existsSync(file)) {
      return `/products/${name}.${ext}`;
    }
  }
  return null;
}
