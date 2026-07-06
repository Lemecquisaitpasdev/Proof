import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Product } from "@/lib/products";
import { productImage } from "@/lib/product-image";
import PlateVisual from "@/components/PlateVisual";
import { CardAdd } from "@/components/AddButton";

/**
 * Card sans bordure — l'image fait la card. État primaire lumineux
 * (photo claire ou plate CSS) ; au hover, crossfade vers la photo studio
 * de l'objet, et prix + Add remontent en fondu. En tactile, tout est
 * visible d'emblée.
 */
export default function ProductCard({ product }: { product: Product }) {
  const photo = productImage(product.slug);
  const alt = productImage(`alt-${product.slug}`);
  const patchCount = product.layers === 4 ? 8 : product.layers;

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
            alt={`${product.name} — medical-grade silicone scar care`}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <PlateVisual
            layers={product.layers}
            count={`${String(patchCount).padStart(2, "0")} patch${patchCount > 1 ? "es" : ""}`}
          />
        )}
        {alt ? (
          <span className="card__alt" aria-hidden="true">
            <Image
              src={alt}
              alt=""
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </span>
        ) : null}
      </Link>
      <div className="card__body">
        <span className="card__chapter">
          {product.chapter} — {product.chapterName}
        </span>
        <h3 className="card__name">
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="card__desc">{product.cardLine}</p>
        <div className="card__foot">
          <span className="card__price">{formatPrice(product.price)}</span>
          <CardAdd product={product} />
        </div>
      </div>
    </article>
  );
}
