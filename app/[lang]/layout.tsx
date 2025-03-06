import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { Jersey_10, Josefin_Sans } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScrollWrapper from "@/components/SmoothScroll";
import { getMeta } from "@/lib/sanity/queries/meta";
import { getHeaderLinks } from "@/lib/sanity/queries/header";
import { getFooterData } from "@/lib/sanity/queries/footer";
import { Lang } from "@/types/lang";

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

// Usar getServerSideProps ou getStaticProps para resolver params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }> ;
}) {
  const { lang } = await params; // 'params' já resolvido aqui
  const metadata = await getMeta(lang);

  return {
    title: metadata?.title || "Pixel2Design",
    description: metadata?.metadescription || "Pixel2Design",
    openGraph: {
      title: metadata?.metatitle || "Pixel2Design",
      description: metadata?.metadescription || "Pixel2Design",
      images: metadata?.ogImage ? [metadata.ogImage] : [],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Lang }>;
}>) {
  const { lang } = await params; // Usando diretamente 'params.lang', já resolvido
  const header = await getHeaderLinks(lang); // Fetch server-side
  const footerData = await getFooterData(lang);

  return (
    <html lang={lang}>
      <SmoothScrollWrapper>
        <body className={`${jersey.variable} ${josefin.variable} antialiased`}>
          <Navigation header={header} lang={lang} />
          {children}
          <Footer footerData={footerData} />
          <Analytics />
        </body>
      </SmoothScrollWrapper>
    </html>
  );
}
