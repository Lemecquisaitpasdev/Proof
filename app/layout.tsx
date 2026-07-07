import type { Metadata, Viewport } from "next";
import {
  Archivo,
  IBM_Plex_Mono,
  Instrument_Sans,
  Playfair_Display,
} from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { products } from "@/lib/products";
import { productImage } from "@/lib/product-image";
import Topbar from "@/components/Topbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Fx from "@/components/Fx";
import "./globals.css";

// Display — la voix qui crie (Archivo Expanded Black, capitales), sur le clair
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Presse — wordmarks sérif (Vogue, Harper's Bazaar, Marie Claire)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Proof — Premium Silicone Scar Patch",
    template: "%s — Proof",
  },
  description:
    "Medical-grade silicone patches that improve the appearance of scars. Honor it. Don't erase it.",
  openGraph: {
    title: "Proof — Premium Silicone Scar Patch",
    description:
      "Medical-grade silicone patches that improve the appearance of scars. Honor it. Don't erase it.",
    siteName: "Proof",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F1EA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const thumbs = Object.fromEntries(
    products.map((p) => [p.slug, productImage(p.slug)]),
  );

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${plexMono.variable} ${playfair.variable}`}
    >
      <body>
        {/* marque le JS disponible avant peinture — les reveals restent
            visibles sans JavaScript */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <CartProvider>
          <Fx />
          <Topbar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer thumbs={thumbs} />
        </CartProvider>
      </body>
    </html>
  );
}
