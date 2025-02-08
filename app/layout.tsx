import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Jersey_10 } from "next/font/google";

const jersey = Jersey_10({
  subsets: ['latin'],
  variable: '--font-jersey10',
  weight: "400",
  display: 'swap',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${jersey.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
