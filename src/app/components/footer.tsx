'use client';
import Image from 'next/image';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="w-screen border-t border-t-black border-dashed p-8 overflow-hidden">
      <Link
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <Image
          src="/images/bnr-logo.png"
          alt="Arpinomoda Logo"
          width={27167}
          height={3358}
          className="w-[150px] h-auto mx-auto"
        />
      </Link>
    </footer>
  );
}
