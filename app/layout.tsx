import type { Metadata } from "next";
import { Bricolage_Grotesque, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

// Display face: a characterful grotesque with optical contrast — more taste,
// less template, than the previous geometric Poppins.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "2 Gals Landscaping & Construction | West Houston",
  description:
    "Woman-owned Houston landscaping & construction. We design, build, and care for outdoor spaces across West Houston, crafted to grow beautifully and last for years.",
  openGraph: {
    title: "2 Gals Landscaping & Construction",
    description:
      "We design, build, and care for outdoor spaces across West Houston.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${bricolage.variable}`}>
      {/* Extensions (ColorZilla, etc.) inject attributes onto <body> before
          hydration; suppress the resulting one-level attribute mismatch. */}
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* JS-off users (and crawlers) skip the loading cover and get the page. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>.preloader{display:none!important}</style>",
          }}
        />
        {children}
      </body>
    </html>
  );
}
