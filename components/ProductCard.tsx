import Link from "next/link";
import Image from "next/image";
import { formatPrice, isLive, type Product } from "@/lib/products";
import { productImage } from "@/lib/product-image";
import PlateVisual from "@/components/PlateVisual";
import { CardAdd } from "@/components/AddButton";
import KintsugiLine from "@/components/KintsugiLine";

/**
 * Card sans bordure, l'image fait la card. État primaire lumineux
 * (photo claire ou plate CSS) ; au hover, crossfade vers la photo studio
 * de l'objet, et prix + Add remontent en fondu. En tactile, tout est
 * visible d'emblée.
 *
 * Instrument en R&D : même gabarit, mais ni lien ni prix. La photo cède
 * la place au motif cellulaire du silicone, qu'une onde dorée propage
 * depuis le centre (cadre filet or, statut mono, titre souligné d'une
 * fêlure kintsugi) ; le pied annonce « pas encore disponible ».
 */
const CARD_SIZES = "(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw";

export default function ProductCard({ product }: { product: Product }) {
  if (!isLive(product)) {
    /* culture cellulaire : le motif silicone, rallumé par une onde qui part
       du centre. Chaque instrument est décalé dans le cycle (code PR-0x)
       pour que deux cards voisines ne pulsent pas à l'unisson. */
    const cells = productImage("science-pattern");
    const shift = (parseInt(product.code.slice(-2), 10) || 0) * 0.9;
    const cellImg = (
      <Image src={cells ?? ""} alt="" fill sizes={CARD_SIZES} style={{ objectFit: "cover" }} />
    );

    return (
      <article className="card card--rnd" aria-label={`${product.name}, in research and development`}>
        <div
          className="card__visual"
          style={{ "--rnd-shift": `-${shift}s` } as React.CSSProperties}
        >
          {cells ? (
            <span className="rnd__culture" aria-hidden="true">
              <span className="rnd__cells">{cellImg}</span>
              <span className="rnd__wave">{cellImg}</span>
              <span className="rnd__wave rnd__wave--late">{cellImg}</span>
            </span>
          ) : (
            <PlateVisual layers={product.layers} count={product.plateLabel} />
          )}
          <span className="rnd" aria-hidden="true">
            <span className="rnd__top">
              <span className="rnd__status">
                <i className="rnd__dot" />
                Status / R&amp;D
              </span>
              <span>{product.code}</span>
            </span>
            <span className="rnd__center">
              <span className="rnd__title">
                In research
                <br />
                &amp; development
              </span>
              <KintsugiLine variant="underline" className="rnd__line" />
            </span>
            <span className="rnd__bottom">Under examination at the lab</span>
          </span>
        </div>
        <div className="card__body">
          <span className="card__chapter">
            {product.chapter} · {product.chapterName}
          </span>
          <h3 className="card__name">{product.name}</h3>
          <p className="card__desc">{product.cardLine}</p>
          <p className="card__soon">In development · Not yet available</p>
        </div>
      </article>
    );
  }

  const photo = productImage(product.slug);
  const alt = productImage(`alt-${product.slug}`);
  const from = product.variants?.length
    ? Math.min(...product.variants.map((v) => v.price))
    : product.price;

  return (
    <article className="card">
      {product.badge ? (
        <span className="badge card__badge">{product.badge}</span>
      ) : null}
      <Link
        href={`/shop/${product.slug}`}
        className="card__visual"
        aria-label={product.name}
      >
        {photo ? (
          <Image
            src={photo}
            alt={`${product.name}, medical-grade silicone scar care`}
            fill
            sizes={CARD_SIZES}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <PlateVisual layers={product.layers} count={product.plateLabel} />
        )}
        {alt ? (
          <span className="card__alt" aria-hidden="true">
            <Image src={alt} alt="" fill sizes={CARD_SIZES} style={{ objectFit: "cover" }} />
          </span>
        ) : null}
      </Link>
      <div className="card__body">
        <span className="card__chapter">
          {product.chapter} · {product.chapterName}
        </span>
        <h3 className="card__name">
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="card__desc">{product.cardLine}</p>
        <div className="card__foot">
          <span className="card__price">
            {product.variants?.length ? (
              <>
                <small className="card__from">From</small> {formatPrice(from)}
              </>
            ) : (
              formatPrice(product.price)
            )}
          </span>
          <CardAdd product={product} />
        </div>
      </div>
    </article>
  );
}
