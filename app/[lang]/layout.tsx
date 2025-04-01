import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { Jersey_10, Josefin_Sans } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScrollWrapper from "@/components/SmoothScroll";
import { getHeaderLinks } from "@/lib/sanity/queries/header";
import { getFooterData } from "@/lib/sanity/queries/footer";
import { Lang } from "@/types/lang";
import { i18n } from "../../i18n-config";

const jersey = Jersey_10({
  subsets: ["latin"],
  variable: "--font-jersey10",
  weight: "400",
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefinsans",
  weight: "400",
  display: "swap",
});


export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Lang }>;
}>) {
  const { lang } = await params; // Usando diretamente 'params.lang', já resolvido

  const header = await getHeaderLinks(lang || i18n.defaultLocale); // Fetch server-side
  const footerData = await getFooterData(lang || i18n.defaultLocale);

  return (
    <html lang={lang || i18n.defaultLocale}>
      <SmoothScrollWrapper>
        <body className={`${jersey.variable} ${josefin.variable} antialiased`}>
          <Navigation header={header} lang={lang || i18n.defaultLocale} />
          {children}
          <Footer footerData={footerData} />
          <Analytics />
        </body>
      </SmoothScrollWrapper>
    </html>
  );
}
