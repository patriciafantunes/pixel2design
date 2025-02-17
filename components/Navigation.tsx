import Image from 'next/image'
import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'

export default function Navigation() {
  return (
    <div className="container flex gap-x-8 items-center uppercase">
      <Image
        src="/logo.png"
        width={104}
        height={52}
        alt="Pixel2Design Logo"
      />
      <Link href="/">Homepage</Link>
      <Link href="/services">Services</Link>
      <LocaleSwitcher />
    </div>
  );
}
