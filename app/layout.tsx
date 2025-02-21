import type { Metadata } from "next";
import "./globals.css";
import { Jersey_10, Open_Sans } from "next/font/google";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const jersey = Jersey_10({
  subsets: ['latin'],
  variable: '--font-jersey10',
  weight: "400",
  display: 'swap',
})

const opensans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
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
    <html lang="en">
      <body
        className={`${jersey.variable} ${opensans.variable} antialiased`}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
