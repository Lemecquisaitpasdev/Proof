"use client";

import { useEffect, useRef, useState } from "react";
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
      Add to ritual · {formatPrice(product.price)}
    </button>
  );
}

/* Quick-add, feedback en place : « Added ✓ » 1.5s, le compteur du
   header fait le spring. Le drawer ne s'ouvre pas ici. */
export function CardAdd({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onClick = () => {
    add(product.slug, { open: false });
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      className={added ? "card__add is-added" : "card__add"}
      onClick={onClick}
      aria-label={`Add ${product.name} to your ritual`}
      aria-live="polite"
    >
      {added ? "Added ✓" : "Add"}
    </button>
  );
}
