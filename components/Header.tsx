"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Story" },
  { href: "/science", label: "Science" },
  { href: "/help", label: "Help" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [pop, setPop] = useState(false);
  const prev = useRef(count);

  useEffect(() => {
    if (count > prev.current) {
      setPop(true);
      const t = setTimeout(() => setPop(false), 500);
      prev.current = count;
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  return (
    <header className="header">
      <div className="container header__in">
        <Link href="/" className="logo" aria-label="Proof, home">
          Proof
        </Link>
        <nav className="nav" aria-label="Main">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href || pathname.startsWith(`${href}/`)
                  ? "klink is-active"
                  : "klink"
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <button type="button" className="cartbtn" onClick={open}>
          Cart
          <em
            key={count}
            className={pop ? "cartbtn__count is-pop" : "cartbtn__count"}
          >
            ({count})
          </em>
        </button>
      </div>
    </header>
  );
}
