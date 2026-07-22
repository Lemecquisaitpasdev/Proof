import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import KintsugiLine from "@/components/KintsugiLine";
import PlateVisual from "@/components/PlateVisual";
import ProductCard from "@/components/ProductCard";
import PdpBuyBox from "@/components/PdpBuyBox";
import { BATCH, formatPrice, getProduct, products } from "@/lib/products";
import { productImage } from "@/lib/product-image";

type Props = { params: Promise<{ slug: string }> };

/* Compagnons éditorialisés, « complete the ritual » */
const PAIRS: Record<string, string[]> = {
  "the-patch": ["the-ritual", "the-gel"],
  "the-ritual": ["protocol", "the-gel"],
  protocol: ["the-ritual", "the-gel"],
  "the-gel": ["the-ritual", "the-patch"],
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name}, ${formatPrice(product.price)}`,
    description: product.metaDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const primary = productImage(product.slug);
  /* galerie : visuel principal + objet studio + détails, dédupliqués */
  const gallery = Array.from(
    new Set(
      [
        primary,
        productImage(`alt-${product.slug}`),
        productImage(`${product.slug}-2`),
        productImage(`${product.slug}-3`),
        productImage(`${product.slug}-4`),
      ].filter((g): g is string => g !== null),
    ),
  );

  /* tuiles de la grille 2 colonnes : les photos réelles, complétées par le
     packshot CSS pour toujours remplir un nombre pair de cases (≥ 2) */
  const tiles: (string | null)[] = [...gallery];
  while (tiles.length < 2 || tiles.length % 2 !== 0) tiles.push(null);

  const companions = (PAIRS[product.slug] ?? [])
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Proof, ${product.name}`,
    description: product.metaDescription,
    brand: { "@type": "Brand", name: "Proof" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/PreOrder",
    },
  };

  return (
    <>
      <section className="pagehead" style={{ paddingTop: 40 }}>
        <div className="container">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/shop" className="klink">
              The Shop
            </Link>
            <span>/</span>
            <span style={{ color: "var(--graphite)" }}>{product.name}</span>
          </nav>

          <div className="pdp">
            {/* GALERIE, grille 2 colonnes */}
            <div className="pdp__gallery">
              {tiles.map((src, i) => (
                <div className="pdp__visual" key={src ?? `plate-${i}`}>
                  {src ? (
                    <Image
                      src={src}
                      alt={
                        i === 0
                          ? `${product.name}, medical-grade silicone scar care`
                          : `${product.name}, view ${i + 1}`
                      }
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 45vw, 28vw"
                      style={{ objectFit: "cover" }}
                      priority={i === 0}
                    />
                  ) : (
                    <PlateVisual
                      layers={product.layers}
                      count={product.coverage}
                      label={BATCH}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* BUY-BOX */}
            <div className="pdp__buybox">
              {product.badge ? (
                <span className="badge">{product.badge}</span>
              ) : null}
              <span className="eyebrow eyebrow--gold" style={{ marginBottom: 16 }}>
                {product.chapter} · {product.chapterName}
              </span>
              <h1 className="pdp__title">{product.name}</h1>

              <PdpBuyBox product={product} />

              <div className="acc">
                <details open>
                  <summary>What&apos;s inside</summary>
                  <div className="acc__body">
                    <ul className="acc__list">
                      {product.contents.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </details>
                <details>
                  <summary>How to use</summary>
                  <div className="acc__body">
                    <ul className="acc__list">
                      {product.posology.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </details>
                <details>
                  <summary>Shipping &amp; returns</summary>
                  <div className="acc__body">
                    <p>
                      Ships worldwide within 48 hours; most destinations arrive
                      in 3 to 7 business days, tracked by email. Thirty-day
                      returns, no interrogation.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Clinical evidence</summary>
                  <div className="acc__body">
                    <p>
                      Silicone sheeting has been used on scars since 1983 and is
                      listed as a first-line, non-invasive option in
                      international scar-management guidelines. Proof improves
                      the appearance of scars, texture, color and relief. We
                      don&apos;t claim more than that.
                    </p>
                    <Link
                      href="/science"
                      className="tlink klink"
                      style={{ marginTop: 12 }}
                    >
                      Read the science
                    </Link>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LE CHAPITRE */}
      <section className="section">
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">The chapter</span>
            <h2 className="d3">{product.chapterName}.</h2>
          </div>
          <div data-reveal>
            {product.narrative.map((par, i) => (
              <p key={par} className={i === 0 ? "exergue" : "measure"}>
                {par}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS + FAQ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">Specifications</span>
            <h2 className="d3">On the record.</h2>
          </div>
          <div data-reveal>
            <div className="specs-scroll">
              <table className="specs specs--kv">
                <tbody>
                  {product.specs.map(([label, value], i) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td className={i === 0 ? "is-ink" : undefined}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">Questions</span>
            <h2 className="d3">Before you commit.</h2>
          </div>
          <div className="faq" data-reveal>
            {product.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <div className="faq__a">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETE THE RITUAL, cross-sell éditorialisé */}
      {companions.length > 0 ? (
        <section className="section pairing" style={{ paddingTop: "var(--sec)" }}>
          <div className="container">
            <span className="eyebrow eyebrow--gold" data-reveal>
              Complete the ritual
            </span>
            <p className="d3 measure" style={{ marginBottom: 48 }} data-reveal>
              Patch by night, gel by day. Most people run more than one chapter.
            </p>
            <div className="cards cards--pair" data-reveal-group>
              {companions.map((p) => (
                <div key={p.slug} data-reveal>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
