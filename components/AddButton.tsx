"use client";

import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

export function AddToRitual({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      className="btn btn--primary"
      onClick={() => add(product.slug)}
    >
      Add to ritual — {formatPrice(product.price)}
    </button>
  );
}

export function CardAdd({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      className="card__add"
      onClick={() => add(product.slug)}
      aria-label={`Add ${product.name} to your ritual`}
    >
      Add
    </button>
  );
}
