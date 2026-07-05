import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import PatchVisual from "@/components/PatchVisual";
import { CardAdd } from "@/components/AddButton";

export default function ProductCard({ product }: { product: Product }) {
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
        <PatchVisual
          layers={product.layers}
          count={`${String(product.layers === 4 ? 8 : product.layers).padStart(2, "0")} patch${(product.layers === 4 ? 8 : product.layers) > 1 ? "es" : ""}`}
        />
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
