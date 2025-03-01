
import { Analytics } from '@vercel/analytics/next';
import "../globals.css";
import { Jersey_10, Josefin_Sans } from "next/font/google";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SmoothScrollWrapper from '@/components/SmoothScroll'
import { getMeta } from '@/lib/sanity/queries/meta';
import { Lang } from '@/types/lang'

const jersey = Jersey_10({
  subsets: ['latin'],
  variable: '--font-jersey10',
  weight: "400",
  display: 'swap',
})

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefinsans',
  weight: "400",
  display: 'swap',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <SmoothScrollWrapper>
        <body
          className={`${jersey.variable} ${josefin.variable} antialiased`}
        >
          <Navigation />
          {children}
          <Footer />
          <Analytics />
        </body>
      </SmoothScrollWrapper>
    </html>
  );
}
