"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";
import { Header } from "@/types/homepage";

export default function Navigation({ header, lang }: { header: Header; lang: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="container flex justify-between items-center py-2">
      {/* Logo */}
      <Link href={`/${lang}/`}>
        <Image src={logo} width={104} height={52} alt="Pixel2Design Logo" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-x-8 uppercase items-center justify-between w-full">
        <div className="pl-8 flex gap-x-8">
          {header.headerlinks.map((link, index) => (
            <Link key={index} className="hover:text-rose-red" href={`/${lang}${link?.slug?.current ? `/${link.slug.current}` : ""}`}>
              {link.title}
            </Link>
          ))}
        </div>

        <LocaleSwitcher />
      </div>

      {/* Mobile Menu Button */}
      <button title="Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden flex flex-col gap-1.5">
        <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-royal-purple/50 bg-opacity-50 transition-opacity duration-300 z-20 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 p-6 z-30 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-2xl">
          &times;
        </button>

        <div className="flex flex-col gap-y-6 mt-12 uppercase">
          {header.headerlinks.map((link, index) => (
            <Link
              key={index}
              href={`/${lang}${link?.slug?.current ? `/${link.slug.current}` : ""}`}
              className="text-lg hover:text-rose-red"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
}
