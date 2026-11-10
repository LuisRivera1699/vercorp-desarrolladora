import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteSettingsProvider } from "@/components/SiteSettings";
import { TermsProvider } from "@/components/TermsModal";
import { plainPhone } from "@/lib/home/contact";
import { getSiteSettings } from "@/lib/home/fetch";
import { SITE } from "@/lib/site";
import "./globals.css";

const montserrat = localFont({
  variable: "--font-montserrat",
  src: "./fonts/Montserrat-Variable.woff2",
  weight: "300 600",
  display: "swap",
});

const cormorant = localFont({
  variable: "--font-cormorant",
  src: "./fonts/CormorantGaramond-Variable.woff2",
  weight: "400 700",
  display: "swap",
});

const zalando = localFont({
  variable: "--font-zalando",
  src: [
    { path: "./fonts/ZalandoSans-Variable.woff2", weight: "200 500", style: "normal" },
    { path: "./fonts/ZalandoSans-VariableItalic.woff2", weight: "200 500", style: "italic" },
  ],
  display: "swap",
});

const description =
  "Vercorp Desarrolladora habilita y lotiza terrenos en Cuzco. Ahora en venta: Killa, espacios con vista al lago en Huaypo, Valle Sagrado, a 30 minutos de Cuzco.";

const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE.name}, terrenos lotificados en Cuzco`,
};

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
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vercorp Desarrolladora | Terrenos lotificados en Cuzco",
    description,
    images: [ogImage.url],
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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
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
    logo: `${SITE.url}/brand/vercorp-desarrolladora-logo-dark.png`,
    image: `${SITE.url}${ogImage.url}`,
    email: settings.email,
    telephone: plainPhone(settings.phone),
    sameAs: [settings.instagram],
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
      className={`${montserrat.variable} ${cormorant.variable} ${zalando.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteSettingsProvider settings={settings}>
          <TermsProvider>{children}</TermsProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
