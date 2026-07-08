"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

/**
 * BUY-BOX de la fiche produit + barre d'achat collante mobile.
 * Sélecteur de quantité minimal, ajout au panier, feedback en place.
 * La barre mobile apparaît dès que le bouton d'achat principal sort du
 * cadre (sentinelle + IntersectionObserver).
 */
export default function PdpBuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [barVisible, setBarVisible] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setBarVisible(
          !entry.isIntersecting && entry.boundingClientRect.top < 0,
        );
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onAdd = () => add(product.slug, { qty });

  return (
    <>
      <div className="pdp__price num">{formatPrice(product.price)}</div>
      <p className="lead" style={{ marginTop: 24 }}>
        {product.tagline}
      </p>

      <div className="pdp__buy">
        <div className="qty qty--pdp" aria-label="Quantity">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="num">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button type="button" className="btn btn--primary" onClick={onAdd}>
          Add to ritual · {formatPrice(product.price * qty)}
        </button>
      </div>
      <p className="pdp__micro">Ships in 48 h, 30-day returns, worldwide</p>
      <div ref={sentinel} aria-hidden="true" />

      {/* barre collante mobile */}
      <div
        className={barVisible ? "buybar is-visible" : "buybar"}
        aria-hidden={!barVisible}
      >
        <div className="buybar__name">
          {product.name}
          <small className="num">{formatPrice(product.price)}</small>
        </div>
        <button type="button" className="btn btn--primary" onClick={onAdd}>
          Add · {formatPrice(product.price * qty)}
        </button>
      </div>
    </>
  );
}
