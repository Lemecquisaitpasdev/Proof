import Link from "next/link";
import { products } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="logo" style={{ marginBottom: 18 }}>
              Proof
            </div>
            <p>
              Premium silicone scar patches. The rigor of a medical device, the
              desire of a niche perfumery object.
            </p>
          </div>
          <div>
            <h4>The Shop</h4>
            <ul>
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/shop/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>The House</h4>
            <ul>
              <li>
                <Link href="/story">Story</Link>
              </li>
              <li>
                <Link href="/science">Science</Link>
              </li>
              <li>
                <Link href="/help">Help</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Phase 2</h4>
            <ul>
              <li>
                <span className="soon">
                  The Wall<em>Soon</em>
                </span>
              </li>
              <li>
                <span className="soon">
                  Journal<em>Soon</em>
                </span>
              </li>
              <li>
                <span className="soon">
                  Chapters<em>Soon</em>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__legal">
          <p>
            Proof improves the appearance of scars. It is not intended to
            diagnose, treat, cure, or prevent any disease.
          </p>
          <p>© 2026 Proof — Honor it. Don&apos;t erase it.</p>
        </div>
        <div className="footer__mark" aria-hidden="true">
          Proof
        </div>
      </div>
    </footer>
  );
}
