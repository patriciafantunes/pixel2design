import type { Metadata } from "next";
import "../globals.css";
import { Jersey_10, Josefin_Sans } from "next/font/google";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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

export const metadata: Metadata = {
  title: "Pixel2Design",
  description: "Coming soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${jersey.variable} ${josefin.variable} antialiased`}
      >
      <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
