'use client';
import Carousel from '@/app/components/carousel';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <>
      <section className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center p-8 w-full">
          <h1 className="mb-4">Get In Touch</h1>
          <p className="max-w-[600px] mx-auto">
            Connect with us to reserve an exclusive preview of our collection, inquire about our
            trunk shows—private events where you can experience our luxury pieces in an intimate
            setting—or for collaborations and other inquiries.
          </p>
        </div>
      </section>
    </>
  );
}
