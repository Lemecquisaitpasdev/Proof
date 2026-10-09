import type { Metadata } from "next";
import KintsugiLine from "@/components/KintsugiLine";
import Posology from "@/components/Posology";
import ProductCard from "@/components/ProductCard";
import { formatPrice, isLive, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The Gel at $85, medical-grade silicone that improves the appearance of scars. The Patch and The Protocol are in research and development.",
};

export default function ShopPage() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow enter">The shop</span>
          <h1 className="d1 enter" style={{ "--d": ".1s" } as React.CSSProperties}>
            Three instruments.
          </h1>
          <p
            className="lead measure enter"
            style={{ "--d": ".22s" } as React.CSSProperties}
          >
            The patch for the zones that hold still, the gel for the ones
            that move, and the protocol that runs both.
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
            The bench, compared
          </span>
          <div className="specs-scroll" data-reveal>
            <table className="specs">
              <thead>
                <tr>
                  <th scope="col">Reference</th>
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
                      {isLive(p) ? (
                        <>
                          {p.variants?.length ? "From " : ""}
                          {formatPrice(p.price)}
                        </>
                      ) : (
                        <span className="specs__rnd">In R&amp;D</span>
                      )}
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
                "Same medical-grade silicone in all three.",
                "Patch for coverage. Gel for the zones that move.",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
