"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice, resolveLine } from "@/lib/products";
import Posology from "@/components/Posology";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const lines = Object.entries(items)
    .map(([key, qty]) => ({ key, line: resolveLine(key), qty }))
    .filter((l) => l.line);

  return (
    <section className="pagehead section">
      <div className="container">
        <span className="mlabel">Checkout / Order file</span>
        <h1 className="d1" style={{ marginTop: 16 }}>Your protocol.</h1>

        {lines.length === 0 ? (
          <div style={{ marginTop: 48, maxWidth: 560 }}>
            <p className="lead">
              Nothing on file yet. The protocol line is waiting.
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
                    {lines.map(({ key, line, qty }) =>
                      line ? (
                        <tr key={key}>
                          <td className="is-ink">
                            {line.label}, {line.product.chapter}
                          </td>
                          <td>{qty}</td>
                          <td>{formatPrice(line.price * qty)}</td>
                        </tr>
                      ) : null,
                    )}
                    <tr>
                      <th scope="row">Total</th>
                      <td />
                      <td className="is-ink">{formatPrice(total)}</td>
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
                  color: "var(--dim)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                }}
              >
                Empty the cart
              </button>
            </div>

            <div>
              <Posology
                title="Payment, status"
                lines={[
                  "Checkout opens with the first drop.",
                  "Your cart is saved on this device.",
                ]}
                sideEffects="Observed effects: anticipation."
              />
              <a
                className="btn btn--primary btn--block"
                style={{ marginTop: "var(--gut)" }}
                href={`mailto:contactus@trackk.fr?subject=PROOF%20,%20First%20drop&body=Keep%20me%20posted%20for%20the%20first%20drop.%20My%20ritual%20:%20${encodeURIComponent(
                  lines
                    .map(({ line, qty }) => `${qty} × ${line?.label}`)
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
