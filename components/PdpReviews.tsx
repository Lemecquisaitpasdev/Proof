"use client";

import { useMemo, useState } from "react";
import type { Review, ReviewSet } from "@/lib/reviews";

/** Étoiles pleines / demies / vides, à partir d'une note sur 5. */
function Stars({ value, size = 15 }: { value: number; size?: number }) {
  const id = useMemo(
    () => `half-${Math.random().toString(36).slice(2, 8)}`,
    [],
  );
  return (
    <span className="stars" role="img" aria-label={`${value} out of 5`}>
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill =
          value >= i + 1
            ? "currentColor"
            : value > i
              ? `url(#${id})`
              : "transparent";
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              d="M10 1.5 12.4 7l6 .5-4.5 3.9 1.4 5.8L10 14.1 4.7 17.2l1.4-5.8L1.6 7.5l6-.5z"
              fill={fill}
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </span>
  );
}

const SORTS = [
  { key: "recent", label: "Most recent" },
  { key: "highest", label: "Highest rated" },
  { key: "helpful", label: "Most helpful" },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

/**
 * AVIS — la preuve, en langage de fiche. Note moyenne, tri, et une liste
 * où chaque avis porte sa fiche à gauche (ancienneté de la cicatrice,
 * zone, protocole) et son témoignage à droite.
 */
export default function PdpReviews({
  set,
  productName,
}: {
  set: ReviewSet;
  productName: string;
}) {
  const [sort, setSort] = useState<SortKey>("recent");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(() => {
    const list: Review[] = [...set.items];
    if (sort === "highest") list.sort((a, b) => b.stars - a.stars);
    if (sort === "helpful") list.sort((a, b) => b.helpful - a.helpful);
    return list;
  }, [set.items, sort]);

  return (
    <section className="reviews" id="reviews" aria-label="Reviews">
      <div className="container">
        <div className="reviews__head" data-reveal>
          <div>
            <div className="reviews__score">
              <span className="reviews__avg num">{set.rating.toFixed(1)}</span>
              <Stars value={set.rating} size={19} />
            </div>
            <span className="mlabel" style={{ display: "block", marginTop: 12 }}>
              Average rating
            </span>
            <p className="reviews__count">
              Based on {set.count.toLocaleString("en-US")} reviews
            </p>
          </div>

          <div className="reviews__sort">
            <label className="mlabel mlabel--plain" htmlFor="review-sort">
              Sort
            </label>
            <select
              id="review-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ul className="reviews__list">
          {items.map((r, i) => (
            <li className="review" key={r.id}>
              <div className="review__who">
                <span className="review__name">{r.name}</span>
                {r.verified ? (
                  <span className="review__verified">Verified buyer</span>
                ) : null}
                <dl className="review__facets">
                  <div>
                    <dt>Reviewing</dt>
                    <dd>{productName}</dd>
                  </div>
                  {r.facets.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="review__body">
                <div className="review__top">
                  <Stars value={r.stars} />
                  <span className="review__age">{r.age}</span>
                </div>
                <h3 className="review__title">{r.title}</h3>
                <p className="review__text">{r.body}</p>

                {r.scale ? (
                  <div className="review__scale">
                    <span className="review__q">{r.scale.question}</span>
                    <div
                      className="review__track"
                      role="img"
                      aria-label={`${r.scale.question} ${r.scale.value} out of 5`}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className={
                            n === r.scale!.value
                              ? "review__notch is-on"
                              : "review__notch"
                          }
                        />
                      ))}
                    </div>
                    <div className="review__ends">
                      <span>{r.scale.low}</span>
                      <span>{r.scale.high}</span>
                    </div>
                  </div>
                ) : null}

                <button
                  type="button"
                  className="review__helpful"
                  aria-pressed={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  Helpful ({r.helpful + (open === i ? 1 : 0)})
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
