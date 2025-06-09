'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  if (isHomePage) {
    return null;
  }
  return (
    <header className="w-screen p-4 overflow-hidden absolute top-0 left-0 flex justify-center">
      <Link href="/">
        <Image
          src="/images/bnr-logo.png"
          alt="Arpinomoda Logo"
          width={27167}
          height={3358}
          className="w-[100px] h-auto mx-auto"
        />
      </Link>
    </header>
  );
}
