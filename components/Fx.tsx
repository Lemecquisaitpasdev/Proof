"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * FX — le moteur de motion, unique et léger.
 * - [data-reveal]        fade + translateY(24px) à l'entrée, une fois.
 * - [data-reveal-group]  ses enfants [data-reveal] reçoivent --i (stagger 60ms).
 * - [data-draw]          .is-drawn à l'entrée (lignes kintsugi, schéma).
 * - [data-parallax]      translateY ±6–8% au scroll, rAF, transform only.
 * Tout est neutralisé par prefers-reduced-motion ; sans JS la page est
 * entièrement visible (les styles sont conditionnés à html.js).
 */
export default function Fx() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Stagger — indice --i par groupe */
    document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      group
        .querySelectorAll<HTMLElement>(":scope [data-reveal]")
        .forEach((el, i) => el.style.setProperty("--i", String(i)));
    });

    /* Reveals + tracés */
    const reveal = (el: Element) =>
      el.classList.add(el.hasAttribute("data-draw") ? "is-drawn" : "is-in");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          io.unobserve(entry.target);
          pending.delete(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    const observed: Element[] = [];
    const pending = new Set<Element>();
    document.querySelectorAll("[data-reveal], [data-draw]").forEach((el) => {
      if (el.classList.contains("is-in") || el.classList.contains("is-drawn")) return;
      io.observe(el);
      observed.push(el);
      pending.add(el);
    });

    /* Filet de sécurité — un flick très rapide peut faire manquer l'IO :
       tout élément déjà entré dans le viewport est révélé sans attendre. */
    let sweepRaf = 0;
    const sweep = () => {
      sweepRaf = 0;
      const line = window.innerHeight * 0.92;
      for (const el of pending) {
        if (el.getBoundingClientRect().top < line) {
          reveal(el);
          io.unobserve(el);
          pending.delete(el);
        }
      }
      if (pending.size === 0) {
        window.removeEventListener("scroll", onSweep);
      }
    };
    const onSweep = () => {
      if (!sweepRaf) sweepRaf = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onSweep, { passive: true });

    /* Parallaxe */
    const layers = reduced
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;

    const paint = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of layers) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) continue;
        const p = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
        const strength = Number(el.dataset.parallax) || 6;
        el.style.transform = `translate3d(0, ${(-p * strength).toFixed(3)}%, 0)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    if (layers.length) {
      paint();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    return () => {
      observed.forEach((el) => io.unobserve(el));
      io.disconnect();
      window.removeEventListener("scroll", onSweep);
      if (sweepRaf) cancelAnimationFrame(sweepRaf);
      if (layers.length) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
