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

/**
 * Bureau : logo, navigation, panier, sur une ligne.
 * Mobile (≤ 660px) : une seule ligne aussi — Menu · logo centré · panier —
 * la navigation passe dans un panneau plein écran (.mnav).
 *
 * Le panneau est rendu HORS du <header> : le flou d'arrière-plan du header
 * (backdrop-filter) crée un bloc conteneur qui enfermerait un enfant fixe.
 */
export default function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [pop, setPop] = useState(false);
  const [menu, setMenu] = useState(false);
  const prev = useRef(count);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (count > prev.current) {
      setPop(true);
      const t = setTimeout(() => setPop(false), 500);
      prev.current = count;
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  /* une navigation referme le panneau */
  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  /* panneau ouvert : défilement bloqué, Échap pour fermer, focus géré */
  useEffect(() => {
    if (!menu) return;
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    const trigger = menuBtn.current;
    return () => {
      root.style.overflow = before;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [menu]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="header">
        <div className="container header__in">
          <button
            type="button"
            ref={menuBtn}
            className="menubtn"
            aria-expanded={menu}
            aria-controls="mnav"
            onClick={() => setMenu(true)}
          >
            <span className="menubtn__icon" aria-hidden="true">
              <i />
              <i />
            </span>
            Menu
          </button>
          <Link href="/" className="logo" aria-label="Proof, home">
            Proof
          </Link>
          <nav className="nav" aria-label="Main">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={isActive(href) ? "klink is-active" : "klink"}
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

      <div
        id="mnav"
        ref={panel}
        className={menu ? "mnav is-open" : "mnav"}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menu}
        inert={!menu}
      >
        <div className="mnav__top">
          <span className="mlabel">Proof / Index</span>
          <button type="button" className="mnav__close" onClick={() => setMenu(false)}>
            Close
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="mnav__list" aria-label="Main">
          {LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={isActive(href) ? "mnav__link is-active" : "mnav__link"}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setMenu(false)}
            >
              <span className="mnav__no">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="mnav__foot">
          <Link href="/shop/the-gel" className="btn btn--primary btn--block" onClick={() => setMenu(false)}>
            Begin with the gel
          </Link>
          <p className="mnav__ref">
            <span>Medical-grade scar care</span>
            <span>Batch Nº 017</span>
          </p>
        </div>
      </div>
    </>
  );
}
