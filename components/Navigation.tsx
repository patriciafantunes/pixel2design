"use client"

import Image from "next/image"
import logo from '@/public/logo.png'
import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import { useParams } from "next/navigation";
import { getHeaderLinks } from "@/lib/sanity/queries/header";
import { Header } from '@/types/homepage';
import { useState, useEffect } from 'react'
import { Lang } from '@/types/lang'

export default function Navigation() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "pt";// Extract locale from the route

  const [header, setHeader] = useState<Header | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchHeaderLinks() {
      try {
        const data = await getHeaderLinks(lang);
        if (isMounted) {
          if (data) {
            setHeader(data);
            setError(null); // Clear any previous errors
          } else {
            setError('No header data found');
          }
        }
      } catch (error) {
        if (isMounted) {
          setError("Error fetching header links");
          console.error("Error fetching header links:", error);
        }
      }
    }

    fetchHeaderLinks();

    return () => {
      isMounted = false;
    };
  }, [lang]);

  if (error) return <p>{error}</p>;
  if (!header) return <p>Loading...</p>;

  return (
    <div className="container flex gap-x-8 py-2 items-center justify-between uppercase">
      <div className="flex gap-x-8 py-2 items-center">
        <Link href={`/${lang}/`}>
          <Image
            src={logo}
            width={104}
            height={52}
            alt="Pixel2Design Logo"
          />
        </Link>
        {header.headerlinks.map((link, index) => (
          <Link key={index} className="hover:text-rose-red" href={`/${lang}${link?.slug?.current ? `/${link.slug.current}` : ""}`}>{link.title}</Link>
        ))}
      </div>
      
      <LocaleSwitcher />
    </div>
  );
}