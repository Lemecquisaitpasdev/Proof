import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReserveForm from "@/components/ReserveForm";
import { getProduct } from "@/lib/products";
import { productImage } from "@/lib/product-image";
import { RESERVE, pad3 } from "@/lib/reserve";

export const metadata: Metadata = {
  title: "Reserve your bottle",
  description:
    "Batch 017 is in the lab. Reserve The Gel today, no card and no payment. When it ships, your bottle is held for 48 hours.",
  robots: { index: false },
};

export default function ReservePage() {
  const product = getProduct(RESERVE.product);
  if (!RESERVE.open || !product) notFound();

  return (
    <ReserveForm
      batch={pad3(RESERVE.firstBatch)}
      product={{
        name: product.name,
        chapter: product.chapter,
        line: product.cardLine,
        price: product.price,
        image: productImage(product.slug),
      }}
    />
  );
}
