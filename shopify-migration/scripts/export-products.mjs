/**
 * Génère le CSV d'import produits Shopify à partir de lib/products.ts.
 *
 * Les conditionnements du Patch (1 / 3 / 8) deviennent des variantes sur
 * l'option « Pack size ». Les mentions éditoriales que le thème lit dans
 * `product.metafields.proof.*` sont émises en colonnes « Metafield: ... »,
 * prises en charge nativement par l'import CSV de Shopify.
 *
 *   node shopify-migration/scripts/export-products.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "shopify-migration", "products.csv");

/* --- Lecture du tableau de produits ------------------------------------ */
/* products.ts est du TypeScript, mais le littéral lui-même est du JS
   valide : on isole le tableau et on l'évalue, plutôt que d'ajouter une
   chaîne de compilation pour un script qui tourne une fois. */
const source = fs.readFileSync(path.join(ROOT, "lib", "products.ts"), "utf8");
const start = source.indexOf("export const products");
/* On part du `=` : sinon le premier `[` rencontré est celui de
   l'annotation de type `Product[]`, et le tableau extrait est vide. */
const open = source.indexOf("[", source.indexOf("=", start));
let depth = 0;
let end = open;
for (let i = open; i < source.length; i += 1) {
  const ch = source[i];
  if (ch === "[") depth += 1;
  else if (ch === "]") {
    depth -= 1;
    if (depth === 0) {
      end = i;
      break;
    }
  }
}
/* Le littéral cite les constantes déclarées au-dessus de lui (BATCH,
   REF_PREFIX…) : on les remet dans la portée avant d'évaluer. */
const consts = [...source.matchAll(/export const (\w+)\s*=\s*("[^"]*"|'[^']*')/g)]
  .map(([, name, value]) => `const ${name} = ${value};`)
  .join("\n");

const products = eval(`${consts}\n(${source.slice(open, end + 1)})`);

/* --- Utilitaires -------------------------------------------------------- */
const esc = (value) => {
  const s = value === undefined || value === null ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const html = (product) => {
  const parts = [];
  if (product.tagline) parts.push(`<p><strong>${product.tagline}</strong></p>`);
  for (const par of product.narrative ?? []) parts.push(`<p>${par}</p>`);
  if (product.posology?.length) {
    parts.push("<h3>How to use</h3><ul>");
    for (const line of product.posology) parts.push(`<li>${line}</li>`);
    parts.push("</ul>");
  }
  if (product.specs?.length) {
    parts.push("<h3>Specifications</h3><table>");
    for (const [k, v] of product.specs) parts.push(`<tr><th>${k}</th><td>${v}</td></tr>`);
    parts.push("</table>");
  }
  return parts.join("");
};

/* --- Colonnes ----------------------------------------------------------- */
const COLUMNS = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "Gift Card",
  "SEO Title",
  "SEO Description",
  "Status",
  "Metafield: proof.code [single_line_text_field]",
  "Metafield: proof.method [single_line_text_field]",
  "Metafield: proof.chapter [single_line_text_field]",
  "Metafield: proof.chapter_name [single_line_text_field]",
  "Metafield: proof.badge [single_line_text_field]",
  "Metafield: proof.cta [single_line_text_field]",
  "Metafield: proof.tagline [multi_line_text_field]",
  "Metafield: proof.card_line [single_line_text_field]",
  "Metafield: proof.best_for [single_line_text_field]",
  "Variant Metafield: proof.coverage [single_line_text_field]",
  "Variant Metafield: proof.note [multi_line_text_field]",
  "Variant Metafield: proof.badge [single_line_text_field]",
];

const rows = [COLUMNS.join(",")];

for (const product of products) {
  const variants = product.variants?.length
    ? product.variants
    : [
        {
          id: "default",
          label: "Default Title",
          price: product.price,
          coverage: product.coverage,
          note: "",
          badge: "",
        },
      ];

  variants.forEach((variant, i) => {
    const first = i === 0;
    const sku = `${product.code}-${String(variant.id).toUpperCase()}`;
    rows.push(
      [
        product.slug,
        first ? product.name : "",
        first ? html(product) : "",
        first ? "Proof" : "",
        first ? product.chapterName ?? "" : "",
        first ? [product.chapter, product.method].filter(Boolean).join(", ") : "",
        first ? "TRUE" : "",
        first ? (product.variants?.length ? "Pack size" : "Title") : "",
        variant.label,
        sku,
        0,
        "shopify",
        100,
        "deny",
        "manual",
        variant.price.toFixed(2),
        "TRUE",
        "TRUE",
        "", // Image Src : les visuels sont téléversés depuis public/ (cf. images-map.csv)
        first ? 1 : "",
        first ? `${product.name}, medical-grade silicone scar care` : "",
        first ? "FALSE" : "",
        first ? `${product.name}, Proof` : "",
        first ? product.metaDescription ?? "" : "",
        first ? "active" : "",
        first ? product.code ?? "" : "",
        first ? product.method ?? "" : "",
        first ? product.chapter ?? "" : "",
        first ? product.chapterName ?? "" : "",
        first ? product.badge ?? "" : "",
        first ? product.cta ?? "" : "",
        first ? product.tagline ?? "" : "",
        first ? product.cardLine ?? "" : "",
        first ? product.bestFor ?? "" : "",
        variant.coverage ?? "",
        variant.note ?? "",
        variant.badge ?? "",
      ]
        .map(esc)
        .join(","),
    );
  });
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, rows.join("\n") + "\n", "utf8");

const variantCount = products.reduce(
  (n, p) => n + (p.variants?.length || 1),
  0,
);
console.log(
  `products.csv → ${products.length} produits, ${variantCount} variantes, ${COLUMNS.length} colonnes`,
);
