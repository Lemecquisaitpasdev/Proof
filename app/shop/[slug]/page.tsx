import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Trait from "@/components/Trait";
import Posology from "@/components/Posology";
import PatchVisual from "@/components/PatchVisual";
import ProductCard from "@/components/ProductCard";
import { AddToRitual } from "@/components/AddButton";
import { BATCH, formatPrice, getProduct, products } from "@/lib/products";
import { productImage } from "@/lib/product-image";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${formatPrice(product.price)}`,
    description: product.metaDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug);
  const photo = productImage(product.slug);
  const photo2 = productImage(`${product.slug}-2`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Proof — ${product.name}`,
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
      <section className="pagehead" style={{ paddingTop: 48 }}>
        <div className="container">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/shop">The Shop</Link>
            <span>/</span>
            <span style={{ color: "var(--os-55)" }}>{product.name}</span>
          </nav>

          <div className="pdp">
            <div className="pdp__gallery">
              <div className="pdp__visual">
                {photo ? (
                  <Image
                    src={photo}
                    alt={`${product.name} — silicone scar patch`}
                    fill
                    sizes="(max-width: 900px) 100vw, 550px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                ) : (
                  <PatchVisual
                    layers={product.layers}
                    count={product.coverage}
                    label={BATCH}
                  />
                )}
              </div>
              {photo2 ? (
                <div className="imgframe">
                  <Image
                    src={photo2}
                    alt={`${product.name} — detail`}
                    fill
                    sizes="(max-width: 900px) 100vw, 550px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : null}
            </div>

            <div>
              {product.badge ? (
                <span className="badge" style={{ marginBottom: 20 }}>
                  {product.badge}
                </span>
              ) : null}
              <span className="eyebrow" style={{ marginBottom: 16 }}>
                {product.chapter} — {product.chapterName}
              </span>
              <h1 className="h2" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
                {product.name}
              </h1>
              <div className="pdp__price" style={{ marginTop: 16 }}>
                {formatPrice(product.price)}
              </div>
              <p className="lead" style={{ marginTop: 24 }}>
                {product.tagline}
              </p>

              <div style={{ marginTop: 32 }}>
                <AddToRitual product={product} />
              </div>
              <p className="pdp__micro">
                Ships in 48 h — 30-day returns — worldwide
              </p>

              <div style={{ marginTop: 40 }}>
                <h2 className="h3" style={{ marginBottom: 14 }}>
                  What&apos;s inside
                </h2>
                <ul className="pdp__list">
                  {product.contents.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight section">
        <div className="container split">
          <div>
            <span className="eyebrow">The chapter</span>
            <h2 className="h2">{product.chapterName}.</h2>
          </div>
          <div>
            {product.narrative.map((par) => (
              <p key={par} className="measure">
                {par}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <Trait />
      </div>

      <section className="section">
        <div className="container split">
          <div style={{ display: "grid", gap: "var(--gut)" }}>
            <Posology lines={product.posology} sideEffects={product.sideEffects} />
          </div>
          <div>
            <span className="eyebrow">Specifications</span>
            <div className="specs-scroll">
              <table className="specs" style={{ minWidth: 0 }}>
                <tbody>
                  <tr>
                    <th scope="row">Material</th>
                    <td className="is-os">Medical-grade silicone</td>
                  </tr>
                  <tr>
                    <th scope="row">Size</th>
                    <td>5 × 15 cm — cut to fit</td>
                  </tr>
                  <tr>
                    <th scope="row">Wear</th>
                    <td>12–23 h per day</td>
                  </tr>
                  <tr>
                    <th scope="row">Reuse</th>
                    <td>Up to 14 days per patch</td>
                  </tr>
                  <tr>
                    <th scope="row">Coverage</th>
                    <td>{product.coverage}</td>
                  </tr>
                  <tr>
                    <th scope="row">Batch</th>
                    <td>{BATCH}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="eyebrow">Continue the story</span>
          <div className="minicards">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
