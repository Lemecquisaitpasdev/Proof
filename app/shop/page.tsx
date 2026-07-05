import type { Metadata } from "next";
import Trait from "@/components/Trait";
import Posology from "@/components/Posology";
import ProductCard from "@/components/ProductCard";
import { formatPrice, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Three chapters. The Patch at $29, The Ritual at $69, Protocol at $129. Medical-grade silicone patches that improve the appearance of scars.",
};

export default function ShopPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow">The shop</span>
          <h1 className="h1 h1--page">Three chapters.</h1>
          <p className="lead measure">
            Every scar gets a chapter. Pick where yours starts.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <Trait />
      </div>

      <section className="section">
        <div className="container">
          <span className="eyebrow">La planche — compare</span>
          <div className="specs-scroll">
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
                    <td key={p.slug} className="is-os">
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
                    <td key={p.slug} className="is-os">
                      {formatPrice(p.price)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "var(--gut)" }}>
            <Posology
              title="Dispensing note"
              lines={[
                "All chapters : same patch, same silicone, same size.",
                "Only the duration of the ritual changes.",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
