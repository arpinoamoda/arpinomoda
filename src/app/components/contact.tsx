'use client';
import { Section, SectionInner } from '@/components/ui/components';
import Link from 'next/link';
export default function contact() {
  return (
    <Section>
      <SectionInner>
        <h1 className="mb-4">Get In Touch</h1>
        <p className="max-w-[600px] mx-auto">
          At Arpinō the art of luxury is celebrated in its purest form — tailored to your individual
          tastes, with expert guidance and unparalleled attention to detail.
        </p>
        <p className="max-w-[600px] mx-auto mt-4">
          Reserve an exclusive preview of our debut collection, where each piece is thoughtfully
          curated just for you.
        </p>
        <div className="max-w-[600px] mx-auto mt-8 flex flex-col sm:flex-row gap-4 text-center justify-center">
          <Link href="/contact">Contact Us</Link>
          <Link href="https://www.instagram.com/arpinomoda/">Instagram</Link>
          <Link href="https://www.linkedin.com/company/arpin%C5%8D/">LinkedIn</Link>
          <Link href="/media">Media Lounge</Link>
        </div>
      </SectionInner>
    </Section>
  );
}
