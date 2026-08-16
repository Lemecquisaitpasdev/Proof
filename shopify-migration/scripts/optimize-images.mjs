/**
 * Prépare les visuels pour le téléversement dans Shopify.
 *
 * Les PNG du site pèsent jusqu'à 2,8 Mo pièce. Shopify sert ensuite les
 * images via son CDN (redimensionnement et WebP automatiques), mais il
 * faut d'abord les téléverser : on les convertit donc en WebP, bornés à
 * 2000 px de large, ce qui reste très au-dessus de tout affichage réel.
 *
 * Les originaux ne sont jamais modifiés : la sortie va dans
 * shopify-migration/images/.
 *
 *   node shopify-migration/scripts/optimize-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "shopify-migration", "images");
const MAX_WIDTH = 2000;
const QUALITY = 82;

const sources = [];
for (const dir of ["public/products", "public/images", "public/brand"]) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const file of fs.readdirSync(abs)) {
    if (/\.(png|jpe?g|webp)$/i.test(file)) sources.push(path.join(abs, file));
  }
}

fs.mkdirSync(OUT, { recursive: true });

let before = 0;
let after = 0;
const rows = ["Source,Fichier Shopify,Avant (Ko),Après (Ko)"];

for (const src of sources) {
  const rel = path.relative(ROOT, src);
  const name = path.basename(src, path.extname(src)) + ".webp";
  const dest = path.join(OUT, name);

  const input = sharp(src);
  const meta = await input.metadata();
  const resized =
    meta.width && meta.width > MAX_WIDTH ? input.resize({ width: MAX_WIDTH }) : input;

  await resized.webp({ quality: QUALITY }).toFile(dest);

  const sizeBefore = fs.statSync(src).size;
  const sizeAfter = fs.statSync(dest).size;
  before += sizeBefore;
  after += sizeAfter;
  rows.push(
    [rel, name, Math.round(sizeBefore / 1024), Math.round(sizeAfter / 1024)].join(","),
  );
}

fs.writeFileSync(path.join(ROOT, "shopify-migration", "images-map.csv"), rows.join("\n") + "\n");

const mb = (n) => (n / 1024 / 1024).toFixed(1) + " Mo";
console.log(
  `${sources.length} visuels : ${mb(before)} → ${mb(after)} ` +
    `(${Math.round((1 - after / before) * 100)} % de moins)`,
);
