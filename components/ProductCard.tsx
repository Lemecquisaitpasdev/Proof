import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Product } from "@/lib/products";
import { productImage } from "@/lib/product-image";
import PatchVisual from "@/components/PatchVisual";
import { CardAdd } from "@/components/AddButton";

export default function ProductCard({ product }: { product: Product }) {
  const photo = productImage(product.slug);

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
            alt={`${product.name} — silicone scar patch`}
            fill
            sizes="(max-width: 860px) 100vw, 360px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <PatchVisual
            layers={product.layers}
            count={`${String(product.layers === 4 ? 8 : product.layers).padStart(2, "0")} patch${(product.layers === 4 ? 8 : product.layers) > 1 ? "es" : ""}`}
          />
        )}
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
