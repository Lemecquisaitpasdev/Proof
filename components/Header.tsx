"use client";

import Link from "next/link";
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

  return (
    <header className="header">
      <div className="container header__in">
        <Link href="/" className="logo" aria-label="Proof — home">
          Proof
        </Link>
        <nav className="nav" aria-label="Main">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href || pathname.startsWith(`${href}/`)
                  ? "is-active"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <button type="button" className="cartbtn" onClick={open}>
          Cart <em>({count})</em>
        </button>
      </div>
    </header>
  );
}
