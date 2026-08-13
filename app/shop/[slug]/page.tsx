import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import KintsugiLine from "@/components/KintsugiLine";
import PlateVisual from "@/components/PlateVisual";
import PdpGallery from "@/components/PdpGallery";
import ProductCard from "@/components/ProductCard";
import PdpBuyBox from "@/components/PdpBuyBox";
import PdpResults from "@/components/PdpResults";
import PdpReviews from "@/components/PdpReviews";
import PdpRoutine from "@/components/PdpRoutine";
import TechReveal from "@/components/TechReveal";
import { BATCH, formatPrice, getProduct, products } from "@/lib/products";
import { productImage } from "@/lib/product-image";
import { getReviews } from "@/lib/reviews";

type Props = { params: Promise<{ slug: string }> };

/* Compagnons éditorialisés, « complete the ritual » */
const PAIRS: Record<string, string[]> = {
  "the-patch": ["protocol", "the-gel"],
  "the-gel": ["protocol", "the-patch"],
  protocol: ["the-patch", "the-gel"],
};

/* Un tirage du spread « Honor your story » : image + légende mono. */
type HonorShot = {
  src: string;
  alt: string;
  caption: string;
  w: number;
  h: number;
};

function HonorFigure({ shot, variant }: { shot: HonorShot; variant: string }) {
  return (
    <figure className={`honor__fig honor__fig--${variant}`} data-reveal>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        sizes="(max-width: 900px) 90vw, 42vw"
      />
      <figcaption>{shot.caption}</figcaption>
    </figure>
  );
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name}, ${formatPrice(product.price)}`,
    description: product.metaDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const primary = productImage(product.slug);
  /* galerie : visuel principal + objet studio + détails, dédupliqués */
  const gallery = Array.from(
    new Set(
      [
        primary,
        productImage(`alt-${product.slug}`),
        productImage(`${product.slug}-2`),
        productImage(`${product.slug}-3`),
        productImage(`${product.slug}-4`),
        productImage(`${product.slug}-5`),
        productImage(`${product.slug}-6`),
      ].filter((g): g is string => g !== null),
    ),
  );

  /* swatch de matière, commun aux quatre fiches */
  const texture = productImage("texture");

  /* panneaux plein écran, facultatifs */
  const panelA = product.quickSpecs ? productImage(product.quickSpecs.image) : null;
  const panelB = product.targets ? productImage(product.targets.image) : null;
  const panelC = product.results ? productImage(product.results.image) : null;

  /* visuels de la technologie propriétaire (Deep Matrix) : la base résolue par
     slot, plus le visuel de crossfade optionnel (chemin public direct) */
  const techImage = product.tech ? productImage(product.tech.image) : null;
  const techImageAlt = product.tech?.imageAlt ?? null;

  /* « Dans la vraie vie » — clichés communauté, uniquement ceux résolus */
  const routineShots = (product.routine?.shots ?? [])
    .map((s) => ({ caption: s.caption, src: productImage(s.image) }))
    .filter((s): s is { caption: string; src: string } => s.src !== null);

  /* avis — jeu d'amorçage, cf. lib/reviews.ts */
  const reviews = getReviews(product.slug);

  const companions = (PAIRS[product.slug] ?? [])
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Proof, ${product.name}`,
    description: product.metaDescription,
    brand: { "@type": "Brand", name: "Proof" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/PreOrder",
    },
  };

  return (
    <>
      <section className="pagehead" style={{ paddingTop: 40 }}>
        <div className="container">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/shop" className="klink">
              The Shop
            </Link>
            <span>/</span>
            <span style={{ color: "var(--dim)" }}>{product.name}</span>
          </nav>

          <div className="pdp">
            {/* GALERIE, grande image + rail vertical (façon Rhode) */}
            <PdpGallery
              images={gallery}
              alt={`${product.name}, medical-grade silicone scar care`}
              plate={
                <PlateVisual
                  layers={product.layers}
                  count={product.coverage}
                  label={BATCH}
                />
              }
            />

            {/* BUY-BOX — spec sheet */}
            <div className="pdp__buybox">
              <div className="code-giant" aria-hidden="true">
                {product.code}
              </div>
              {product.badge ? (
                <span className="badge">{product.badge}</span>
              ) : null}
              <span className="mlabel" style={{ display: "block", marginBottom: 14 }}>
                {product.chapter} / {product.chapterName} / Method: {product.method}
              </span>
              <h1 className="pdp__title">{product.name}</h1>

              <PdpBuyBox product={product}>
                <details>
                  <summary>How to use</summary>
                  <div className="acc__body">
                    <ul className="acc__list">
                      {product.posology.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </details>
                <details>
                  <summary>Shipping &amp; returns</summary>
                  <div className="acc__body">
                    <p>
                      Ships worldwide within 48 hours; most destinations arrive
                      in 3 to 7 business days, tracked by email. Thirty-day
                      returns, no interrogation.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Clinical evidence</summary>
                  <div className="acc__body">
                    <p>
                      Silicone sheeting has been used on scars since 1983 and is
                      listed as a first-line, non-invasive option in
                      international scar-management guidelines. Proof improves
                      the appearance of scars, texture, color and relief. We
                      don&apos;t claim more than that.
                    </p>
                    <Link
                      href="/science"
                      className="tlink klink"
                      style={{ marginTop: 12 }}
                    >
                      Read the science
                    </Link>
                  </div>
                </details>
              </PdpBuyBox>
            </div>
          </div>
        </div>
      </section>

      {/* DANS LA VRAIE VIE — le gel dans les routines de la communauté */}
      {product.routine && routineShots.length > 0 ? (
        <PdpRoutine
          label={product.routine.label}
          headline={product.routine.headline}
          lead={product.routine.lead}
          shots={routineShots}
          code={product.code}
          batch={BATCH}
        />
      ) : null}

      {/* LE CHAPITRE */}
      <section className="section">
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">The chapter</span>
            <h2 className="d3">{product.chapterName}.</h2>
          </div>
          <div data-reveal>
            {product.narrative.map((par, i) => (
              <p key={par} className={i === 0 ? "exergue" : "measure"}>
                {par}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* LA MATIÈRE — bénéfices disposés autour du swatch de silicone */}
      {texture ? (
        <section className="swatch">
          <div className="container">
            <span className="mlabel" data-reveal>
              The material / Ref: {product.code} / Medical-grade silicone
            </span>
            <div className="swatch__grid" data-reveal>
              <ul className="swatch__col swatch__col--l">
                {product.benefits.slice(0, 2).map((b) => (
                  <li className="swatch__item" key={b.title}>
                    <span className="swatch__t">{b.title}</span>
                    <span className="swatch__s">{b.sub}</span>
                  </li>
                ))}
              </ul>

              <figure className="swatch__media">
                <Image
                  src={texture}
                  alt={`${product.name}, a swatch of medical-grade silicone`}
                  fill
                  sizes="(max-width: 860px) 70vw, 30vw"
                  style={{ objectFit: "contain" }}
                />
              </figure>

              <ul className="swatch__col swatch__col--r">
                {product.benefits.slice(2).map((b) => (
                  <li className="swatch__item" key={b.title}>
                    <span className="swatch__t">{b.title}</span>
                    <span className="swatch__s">{b.sub}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="refline">
              <span>{product.method}</span>
              <span>Ref: {product.code}</span>
              <span>[ {BATCH} ]</span>
            </div>
          </div>
        </section>
      ) : null}

      {/* DEEP MATRIX — technologie propriétaire, visuel + explication */}
      {product.tech ? (
        <section className="section tech" aria-label="Deep Matrix technology">
          <div className="container tech__grid">
            <figure className="tech__media" data-reveal>
              {techImage && techImageAlt ? (
                <TechReveal
                  base={techImage}
                  baseAlt="Deep Matrix, medical-grade silicone structured in stacked layers"
                  overlay={techImageAlt}
                />
              ) : techImage ? (
                <Image
                  src={techImage}
                  alt="Deep Matrix, medical-grade silicone structured in stacked layers"
                  fill
                  sizes="(max-width: 900px) 100vw, 46vw"
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </figure>
            <div className="tech__copy" data-reveal>
              <span className="mlabel">{product.tech.label}</span>
              <h2 className="d3 tech__head">{product.tech.headline}</h2>
              {product.tech.body.map((par) => (
                <p key={par} className="measure">
                  {par}
                </p>
              ))}
              {product.tech.award ? (
                <div className="tech__award">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="12" cy="9" r="5.5" />
                    <path d="M9 13.6 7.4 21l4.6-2.7L16.6 21 15 13.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{product.tech.award}</span>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* PANNEAU 01 — la matière en bref */}
      {product.quickSpecs ? (
        <section className="panel" aria-label="At a glance">
          <div className="panel__body">
            <h2 className="d3 panel__head" data-reveal>
              {product.quickSpecs.headline}
            </h2>
            <table className="specs specs--kv panel__specs" data-reveal>
              <tbody>
                {product.quickSpecs.rows.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {panelA ? (
            <div className="panel__media">
              <Image
                src={panelA}
                alt={`${product.name}, worn on the skin`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* PANNEAU 02 — ce que le geste adoucit */}
      {product.targets ? (
        <section className="panel panel--flip" aria-label="What it softens">
          <div className="panel__body">
            <span className="mlabel" data-reveal>
              {product.targets.label}
            </span>
            <ul className="targets" data-reveal>
              {product.targets.words.map((w) => (
                <li key={w}>
                  <span className="kword kword--strike">
                    {w}
                    <KintsugiLine variant="strike" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {panelB ? (
            <div className="panel__media">
              <Image
                src={panelB}
                alt={`${product.name}, the object`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* PANNEAU 03 — les résultats de l'étude */}
      {product.results ? (
        <section className="panel" aria-label="Study results">
          <div className="panel__body">
            <PdpResults tabs={product.results.tabs} />
          </div>
          {panelC ? (
            <div className="panel__media">
              <Image
                src={panelC}
                alt={`${product.name}, applied on a scar`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* HONORE TON HISTOIRE — spread éditorial, la cicatrice assumée */}
      {product.honor ? (
        <section className="section honor" aria-label="Honor your story">
          <div className="container">
            <div className="honor__scatter">
              <div className="honor__col honor__col--lead">
                <header className="honor__intro" data-reveal>
                  <span className="mlabel mlabel--gold">{product.honor.label}</span>
                  <h2 className="d2 honor__head">{product.honor.headline}</h2>
                  <p className="honor__lead">{product.honor.lead}</p>
                </header>
                {product.honor.shots[1] ? (
                  <HonorFigure shot={product.honor.shots[1]} variant="b" />
                ) : null}
                <p className="honor__quote" data-reveal>
                  A scar is proof you healed.
                </p>
              </div>
              <div className="honor__col honor__col--main">
                {product.honor.shots[0] ? (
                  <HonorFigure shot={product.honor.shots[0]} variant="a" />
                ) : null}
                {product.honor.shots[2] ? (
                  <HonorFigure shot={product.honor.shots[2]} variant="c" />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* SPECS + FAQ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">Specifications</span>
            <h2 className="d3">On the record.</h2>
          </div>
          <div data-reveal>
            <div className="specs-scroll">
              <table className="specs specs--kv">
                <tbody>
                  {product.specs.map(([label, value], i) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td className={i === 0 ? "is-ink" : undefined}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow eyebrow--gold">Questions</span>
            <h2 className="d3">Before you commit.</h2>
          </div>
          <div className="faq" data-reveal>
            {product.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <div className="faq__a">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETE THE RITUAL, cross-sell éditorialisé */}
      {companions.length > 0 ? (
        <section className="section pairing" style={{ paddingTop: "var(--sec)" }}>
          <div className="container">
            <span className="eyebrow eyebrow--gold" data-reveal>
              Complete the ritual
            </span>
            <p className="d3 measure" style={{ marginBottom: 48 }} data-reveal>
              Patch by night, gel by day. Most people run more than one chapter.
            </p>
            <div className="cards cards--pair" data-reveal-group>
              {companions.map((p) => (
                <div key={p.slug} data-reveal>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {reviews ? (
        <PdpReviews set={reviews} productName={product.name} />
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
