"use client"

import Image from "next/image"
import logo from '@/public/logo.png'
import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import { useParams } from "next/navigation";

export default function Navigation() {
  const params = useParams();
  const lang = params?.lang || "pt"; // Extract locale from the route

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
        <Link className="hover:text-rose-red" href={`/${lang}/`}>Homepage</Link>
        <Link className="hover:text-rose-red" href={`/${lang}/services`}>Services</Link>
      </div>
      
      <LocaleSwitcher />
    </div>
  );
}