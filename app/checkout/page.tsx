"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import Posology from "@/components/Posology";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const lines = Object.entries(items)
    .map(([slug, qty]) => ({ product: getProduct(slug), qty }))
    .filter((l) => l.product);

  return (
    <section className="pagehead section">
      <div className="container">
        <span className="eyebrow">Checkout</span>
        <h1 className="h1 h1--page">Your ritual.</h1>

        {lines.length === 0 ? (
          <div style={{ marginTop: 48, maxWidth: 560 }}>
            <p className="lead">
              Nothing here yet. Three chapters are waiting in the shop.
            </p>
            <Link href="/shop" className="btn btn--primary" style={{ marginTop: 28 }}>
              Open the shop
            </Link>
          </div>
        ) : (
          <div className="checkout-grid" style={{ marginTop: 56 }}>
            <div>
              <div className="specs-scroll">
                <table className="specs">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map(({ product, qty }) =>
                      product ? (
                        <tr key={product.slug}>
                          <td className="is-os">
                            {product.name} — {product.chapter}
                          </td>
                          <td>{qty}</td>
                          <td>{formatPrice(product.price * qty)}</td>
                        </tr>
                      ) : null,
                    )}
                    <tr>
                      <th scope="row">Total</th>
                      <td />
                      <td className="is-os">{formatPrice(total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={clear}
                className="mono"
                style={{
                  marginTop: 16,
                  color: "var(--os-40)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                }}
              >
                Empty the cart
              </button>
            </div>

            <div>
              <Posology
                title="Payment — status"
                lines={[
                  "Checkout opens with the first drop.",
                  "Your cart is saved on this device.",
                ]}
                sideEffects="Side effects : anticipation."
              />
              <a
                className="btn btn--primary btn--block"
                style={{ marginTop: "var(--gut)" }}
                href={`mailto:contactus@trackk.fr?subject=PROOF%20—%20First%20drop&body=Keep%20me%20posted%20for%20the%20first%20drop.%20My%20ritual%20:%20${encodeURIComponent(
                  lines
                    .map(({ product, qty }) => `${qty} × ${product?.name}`)
                    .join(", "),
                )}%20(${encodeURIComponent(formatPrice(total))})`}
              >
                Get notified at the drop
              </a>
              <Link
                href="/shop"
                className="btn btn--ghost btn--block"
                style={{ marginTop: "var(--gut)" }}
              >
                Continue the ritual
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
