import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description =
  "Vercorp Desarrolladora habilita y lotiza terrenos en Cuzco. Ahora en venta: Killa, espacios con vista al lago en Huaypo, Valle Sagrado, a 30 minutos de Cuzco.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Vercorp Desarrolladora | Terrenos lotificados en Cuzco",
    template: "%s | Vercorp Desarrolladora",
  },
  description,
  keywords: [
    "Vercorp",
    "Vercorp Desarrolladora",
    "terrenos Cuzco",
    "lotes Cuzco",
    "habilitación urbana Cuzco",
    "venta de lotes Cuzco",
    "Killa",
    "lotes Huaypo",
    "terrenos Valle Sagrado",
    "lotes con vista al lago",
    "Fundo Lago",
    "inversión inmobiliaria Cuzco",
  ],
  authors: [{ name: "Vercorp" }],
  creator: "Vercorp",
  publisher: "Vercorp",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE.url,
    siteName: SITE.name,
    title: "Vercorp Desarrolladora | Terrenos lotificados en Cuzco",
    description,
    images: [
      {
        url: "/brand/vercorp-desarrolladora-logo-dark.png",
        width: 900,
        height: 291,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vercorp Desarrolladora | Terrenos lotificados en Cuzco",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    parentOrganization: {
      "@type": "Organization",
      name: "Vercorp",
      url: SITE.parentUrl,
    },
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cuzco",
      addressCountry: "PE",
    },
    description: "Habilitaciones urbanas y venta de terrenos lotificados en Cuzco.",
  };

  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
