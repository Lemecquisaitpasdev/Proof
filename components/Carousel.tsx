"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

type Props = {
  /** nom du carrousel, lu par les lecteurs d'écran */
  label: string;
  /** avance automatique, en ms ; absent → défilement manuel seulement */
  autoplay?: number;
  className?: string;
  children: React.ReactNode;
};

/* délai de reprise de l'autoplay après une interaction (toucher, flèche) */
const RESUME_AFTER = 6000;

/**
 * Carrousel tactile, une diapositive à la fois, aimantée (scroll-snap).
 * Défilement natif conservé ; les flèches et la barre de progression ne
 * sont que des raccourcis.
 *
 * Il ne s'active que là où sa piste déborde : si le CSS l'étale en grille
 * (bureau), il n'y a rien à faire défiler, donc pas d'autoplay ; le CSS
 * masque alors les contrôles.
 *
 * L'autoplay se met en pause hors écran, onglet masqué, au survol souris,
 * au focus clavier et pendant RESUME_AFTER après un geste ; il est coupé
 * par prefers-reduced-motion. La barre active se remplit sur la durée du cycle
 * (animation CSS relancée à chaque diapositive).
 *
 * ⚠ Aucun [data-reveal] ne doit porter une className pilotée ici (cf.
 * PdpRoutine) : seuls les contrôles changent de classe.
 */
export default function Carousel({ label, autoplay, className, children }: Props) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const track = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [index, setIndex] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(false);
  /* incrémenté à chaque avance : relance l'animation de la barre active */
  const [cycle, setCycle] = useState(0);

  const step = useCallback(() => {
    const el = track.current;
    const items = el?.children;
    if (!el || !items || items.length < 2) return el?.clientWidth ?? 1;
    return (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft;
  }, []);

  /* index courant, déduit de la position de défilement */
  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEnabled(max > 2);
    const i = el.scrollLeft >= max - 2 ? n - 1 : Math.round(el.scrollLeft / step());
    setIndex(Math.max(0, Math.min(n - 1, i)));
  }, [n, step]);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const target = ((i % n) + n) % n;
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({
        left: Math.min(target * step(), max),
        behavior: reduced ? "auto" : "smooth",
      });
      setCycle((c) => c + 1);
    },
    [n, reduced, step],
  );

  /* un geste de l'utilisateur suspend l'autoplay, puis il reprend */
  const hold = useCallback(() => {
    setHeld(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setHeld(false), RESUME_AFTER);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), sync()));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", hold);
    el.addEventListener("wheel", hold, { passive: true });

    const ro = new ResizeObserver(sync);
    ro.observe(el);

    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);

    sync();
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("wheel", hold);
      ro.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [hold, sync]);

  const running = Boolean(autoplay) && enabled && visible && !held && !hover && !reduced;

  useEffect(() => {
    if (!running || !autoplay) return;
    const t = setTimeout(() => {
      if (document.visibilityState === "visible") go(index + 1);
      else setCycle((c) => c + 1);
    }, autoplay);
    return () => clearTimeout(t);
  }, [running, autoplay, index, cycle, go]);

  const ctrlClass = [
    "carousel__ctrl",
    running ? "is-running" : "is-paused",
    autoplay && !reduced ? "has-timer" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={["carousel", className].filter(Boolean).join(" ")}
      style={{ "--carousel-dur": `${autoplay ?? 0}ms` } as React.CSSProperties}
      /* pause au survol d'une vraie souris et au focus clavier seulement :
         en tactile, un tap émule un survol (et parfois un focus) qui ne
         finit jamais, l'autoplay resterait figé — le tap passe par hold() */
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div
        className="carousel__track"
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
      >
        {slides.map((slide, i) => (
          <div
            className="carousel__slide"
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* affichés ou non par le CSS (mise en page), jamais après coup par JS :
          pas de saut de mise en page à l'hydratation */}
      <div className={ctrlClass}>
        <button
          type="button"
          className="carousel__btn"
          aria-label="Previous"
          onClick={() => (hold(), go(index - 1))}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="carousel__count" aria-live={running ? "off" : "polite"}>
          {String(index + 1).padStart(2, "0")}
          <span> / {String(n).padStart(2, "0")}</span>
        </span>

        <span className="carousel__bars" aria-hidden="true">
          {slides.map((_, i) => (
            <span
              key={i === index ? `on-${index}-${cycle}-${running}` : i}
              className={i === index ? "carousel__bar is-on" : "carousel__bar"}
            >
              <i />
            </span>
          ))}
        </span>

        <button
          type="button"
          className="carousel__btn"
          aria-label="Next"
          onClick={() => (hold(), go(index + 1))}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
