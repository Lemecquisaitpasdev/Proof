"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * GALERIE PDP : une grande image principale, puis un rail HORIZONTAL de
 * vignettes cliquables (crossfade au changement), disposé sous l'image —
 * façon La Prairie. Sans photo, on retombe sur le packshot CSS (`plate`).
 */
export default function PdpGallery({
  images,
  alt,
  plate,
}: {
  images: string[];
  alt: string;
  plate: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const hasPhotos = images.length > 0;
  const slides = hasPhotos ? images : [null];

  return (
    <div className="pdpg">
      <div className="pdpg__stage">
        {slides.map((src, i) => (
          <div
            key={src ?? `plate-${i}`}
            className={i === active ? "pdpg__slide is-active" : "pdpg__slide"}
            aria-hidden={i !== active}
          >
            {src ? (
              <Image
                src={src}
                alt={i === 0 ? alt : `${alt}, view ${i + 1}`}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            ) : (
              plate
            )}
          </div>
        ))}
      </div>

      {slides.length > 1 ? (
        <div className="pdpg__rail" role="tablist" aria-label="Product views">
          {slides.map((src, i) => (
            <button
              type="button"
              key={src ?? `thumb-${i}`}
              className={i === active ? "pdpg__thumb is-active" : "pdpg__thumb"}
              onClick={() => setActive(i)}
              aria-label={`View ${i + 1}`}
              aria-selected={i === active}
              role="tab"
            >
              {src ? (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="64px"
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
