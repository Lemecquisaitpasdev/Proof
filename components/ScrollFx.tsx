"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Révélation au scroll des éléments [data-reveal].
 * Sans JavaScript, html.fx n'est jamais posé : tout reste visible.
 * prefers-reduced-motion est géré côté CSS.
 */
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("fx");
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add("is-in");
      } else {
        io.observe(el);
      }
    }

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
