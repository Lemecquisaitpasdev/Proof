"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { resolveLine } from "@/lib/products";

/* clé de ligne : « slug » ou « slug#variantId » (cf. lib/products) */
export type CartItems = Record<string, number>;

type CartContextValue = {
  items: CartItems;
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (key: string, opts?: { open?: boolean; qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "proof-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItems>({});
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItems;
        const clean: CartItems = {};
        for (const [key, qty] of Object.entries(parsed)) {
          if (resolveLine(key) && Number.isInteger(qty) && qty > 0) {
            clean[key] = Math.min(qty, 99);
          }
        }
        setItems(clean);
      }
    } catch {
      // storage unavailable, cart stays in memory
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable, cart stays in memory
    }
  }, [items, hydrated]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const add = useCallback(
    (key: string, opts?: { open?: boolean; qty?: number }) => {
      const q = Math.max(1, Math.floor(opts?.qty ?? 1));
      setItems((prev) => ({
        ...prev,
        [key]: Math.min((prev[key] ?? 0) + q, 99),
      }));
      if (opts?.open !== false) setIsOpen(true);
    },
    [],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[key];
      } else {
        next[key] = Math.min(qty, 99);
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => setItems({}), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const { count, total } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const [key, qty] of Object.entries(items)) {
      const line = resolveLine(key);
      if (!line) continue;
      count += qty;
      total += qty * line.price;
    }
    return { count, total };
  }, [items]);

  const value = useMemo(
    () => ({ items, count, total, isOpen, open, close, add, setQty, clear }),
    [items, count, total, isOpen, open, close, add, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
