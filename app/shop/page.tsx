import type { Metadata } from "next";
import KintsugiLine from "@/components/KintsugiLine";
import Posology from "@/components/Posology";
import ProductCard from "@/components/ProductCard";
import { formatPrice, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Four chapters. The Patch at $29, The Ritual at $69, Protocol at $129, The Gel at $39. Medical-grade silicone that improves the appearance of scars.",
};

export default function ShopPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow enter">The shop</span>
          <h1 className="d1 enter" style={{ "--d": ".1s" } as React.CSSProperties}>
            Four chapters.
          </h1>
          <p
            className="lead measure enter"
            style={{ "--d": ".22s" } as React.CSSProperties}
          >
            Every scar gets a chapter. Three patches, one gel — pick where
            yours starts.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards" data-reveal-group>
            {products.map((p) => (
              <div key={p.slug} data-reveal>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container sep">
        <KintsugiLine variant="separator" />
      </div>

      <section className="section">
        <div className="container">
          <span className="eyebrow" data-reveal>
            La planche — compare
          </span>
          <div className="specs-scroll" data-reveal>
            <table className="specs">
              <thead>
                <tr>
                  <th scope="col">Chapter</th>
                  {products.map((p) => (
                    <th scope="col" key={p.slug}>
                      {p.chapter}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  {products.map((p) => (
                    <td key={p.slug} className="is-ink">
                      {p.name}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Inside</th>
                  {products.map((p) => (
                    <td key={p.slug}>{p.cardLine}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Covers</th>
                  {products.map((p) => (
                    <td key={p.slug}>{p.coverage}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Best for</th>
                  {products.map((p) => (
                    <td key={p.slug}>{p.bestFor}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Price</th>
                  {products.map((p) => (
                    <td key={p.slug} className="is-ink num">
                      {formatPrice(p.price)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 24, maxWidth: 560 }} data-reveal>
            <Posology
              title="Dispensing note"
              lines={[
                "Same medical-grade silicone in every chapter.",
                "Patch for coverage. Gel for the zones that move.",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
