"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import PlateVisual from "@/components/PlateVisual";

export default function CartDrawer({
  thumbs = {},
}: {
  thumbs?: Record<string, string | null>;
}) {
  const { items, total, isOpen, close, setQty } = useCart();
  const lines = Object.entries(items)
    .map(([slug, qty]) => ({ product: getProduct(slug), qty }))
    .filter((l) => l.product);

  return (
    <>
      <div
        className={`scrim${isOpen ? " is-open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        className={`drawer${isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your ritual, cart"
        aria-hidden={!isOpen}
        inert={!isOpen || undefined}
      >
        <div className="drawer__head">
          <span className="drawer__title">Your ritual</span>
          <button type="button" className="drawer__close" onClick={close}>
            Close
          </button>
        </div>

        <div className="drawer__body">
          {lines.length === 0 ? (
            <div className="drawer__empty">
              <p className="mono" style={{ color: "var(--dim)" }}>
                Your ritual is empty.
              </p>
              <p style={{ fontSize: 14.5, marginTop: 12 }}>
                Three chapters are waiting in the shop.
              </p>
              <Link
                href="/shop"
                className="btn btn--ghost"
                style={{ marginTop: 24 }}
                onClick={close}
              >
                Open the shop
              </Link>
            </div>
          ) : (
            lines.map(({ product, qty }) => {
              if (!product) return null;
              return (
                <div className="cline" key={product.slug}>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="cline__thumb"
                    onClick={close}
                    aria-label={product.name}
                  >
                    {thumbs[product.slug] ? (
                      <Image
                        src={thumbs[product.slug] as string}
                        alt=""
                        width={64}
                        height={64}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    ) : (
                      <PlateVisual layers={product.layers} label="" />
                    )}
                  </Link>
                  <div>
                    <div className="cline__name">{product.name}</div>
                    <div className="cline__meta">
                      {product.chapter} · {product.chapterName}
                    </div>
                    <div className="qty">
                      <button
                        type="button"
                        onClick={() => setQty(product.slug, qty - 1)}
                        aria-label={`Remove one ${product.name}`}
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(product.slug, qty + 1)}
                        aria-label={`Add one ${product.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cline__price">
                    {formatPrice(product.price * qty)}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {lines.length > 0 && (
          <div className="drawer__foot">
            <div className="drawer__total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="drawer__note">
              Shipping calculated at checkout, ships worldwide
            </p>
            <Link
              href="/checkout"
              className="btn btn--primary btn--block"
              onClick={close}
            >
              Checkout · {formatPrice(total)}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
