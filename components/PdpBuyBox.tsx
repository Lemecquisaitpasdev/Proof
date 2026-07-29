"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, makeKey, type Product } from "@/lib/products";

/**
 * BUY-BOX de la fiche produit + barre d'achat collante mobile.
 * Sélecteur de quantité minimal, ajout au panier, feedback en place.
 * La barre mobile apparaît dès que le bouton d'achat principal sort du
 * cadre (sentinelle + IntersectionObserver).
 */
export default function PdpBuyBox({
  product,
  children,
}: {
  product: Product;
  children?: React.ReactNode;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  /* conditionnement retenu : la variante « most chosen » si elle existe */
  const [variantId, setVariantId] = useState(
    () =>
      product.variants?.find((v) => v.badge)?.id ??
      product.variants?.[0]?.id ??
      "",
  );
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

  const variant = product.variants?.find((v) => v.id === variantId);
  const unitPrice = variant?.price ?? product.price;
  const onAdd = () => add(makeKey(product.slug, variant?.id), { qty });
  const installment = `$${(unitPrice / 4).toFixed(2)}`;

  return (
    <>
      <div className="pdp__price num">{formatPrice(unitPrice)}</div>
      <p className="pdp__desc">{product.tagline}</p>

      {product.variants?.length ? (
        <div className="packs" role="radiogroup" aria-label="Pack size">
          <span className="pdp__qtylabel">Pack size</span>
          <div className="packs__row">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={v.id === variantId}
                className={v.id === variantId ? "pack is-on" : "pack"}
                onClick={() => setVariantId(v.id)}
              >
                {v.badge ? (
                  <span className="pack__badge">{v.badge}</span>
                ) : null}
                <span className="pack__label">{v.label}</span>
                <span className="pack__cover">{v.coverage}</span>
                <span className="pack__price num">{formatPrice(v.price)}</span>
              </button>
            ))}
          </div>
          {variant ? <p className="packs__note">{variant.note}</p> : null}
        </div>
      ) : null}

      <div className="pdp__qtyrow">
        <span className="pdp__qtylabel">Quantity</span>
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
      </div>

      <button
        type="button"
        className="btn btn--primary btn--pill pdp__cta"
        onClick={onAdd}
      >
        {product.cta} · {formatPrice(unitPrice * qty)}
      </button>
      <p className="pdp__pay">
        or 4 interest-free payments of <b className="num">{installment}</b>
      </p>
      <p className="pdp__micro">Ships in 48 h, 30-day returns, worldwide</p>
      <div ref={sentinel} aria-hidden="true" />

      <div className="acc">
        <details open>
          <summary>What&apos;s inside</summary>
          <div className="acc__body">
            <ul className="acc__list">
              {(variant?.contents ?? product.contents).map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </details>
        {children}
      </div>

      {/* barre collante mobile */}
      <div
        className={barVisible ? "buybar is-visible" : "buybar"}
        aria-hidden={!barVisible}
      >
        <div className="buybar__name">
          {variant ? `${product.name}, ${variant.label}` : product.name}
          <small className="num">{formatPrice(unitPrice)}</small>
        </div>
        <button type="button" className="btn btn--primary" onClick={onAdd}>
          {product.cta} · {formatPrice(unitPrice * qty)}
        </button>
      </div>
    </>
  );
}
