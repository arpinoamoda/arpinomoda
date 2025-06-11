'use client';
import Carousel from '@/app/components/carousel';
import EmailSubscription from '@/app/components/email-subscription';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <>
      {/* Banner */}
      <section
        className="min-h-screen w-full flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner-image.jpg')" }}
      >
        <Image
          src="/images/bnr-logo.png"
          alt="Arpinomoda Logo"
          width={834}
          height={334}
          className="max-w-[300px]"
        />
      </section>
      {/* Launching... */}
      <section className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center p-8 w-full">
          <h1 className="mb-4">Launching Soon...</h1>
          <p className="max-w-[600px] mx-auto">
            Arpinō is a timeless expression of bespoke luxury, sophisticated style, and Italian
            craftsmanship. We believe luxury is not just worn, but lived— to be experienced and
            cherished for years to come.
          </p>
        </div>
      </section>
      {/* Video */}
      <section className="relative min-h-screen w-full flex justify-center items-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="/videos/main-video.mp4"
            type="video/mp4"
          />
          <source
            src="/videos/main-video.webm"
            type="video/webm"
          />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      </section>
      {/* About */}
      <section className="w-full flex flex-col justify-center items-center">
        <div className="text-center px-8 w-full">
          <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-12 my-48">
            <p className="text-left">
              Our story begins with a small olive grove nestled in Arpino, a village in Italy, where
              patience shapes the production of quality goods. With a deep affinity for the groves,
              the surrounding community, and its traditions, our founder was inspired by their
              enduring values of artistry and care. The name Arpinō pays homage to this community
              and their dedication to producing exceptional goods in small batches.
            </p>
            <p className="text-left">
              Curating an exclusive collection of garments crafted from the finest Italian
              materials—such as fur, cashmere, and silk—Arpinō blends tradition with contemporary
              sophistication. Following in the footsteps of the community that inspired this label,
              we offer bespoke Italian-made luxury knits and outerwear that reflect individuality,
              honor heritage, and timeless craftsmanship.
            </p>
          </div>
          <div className="max-w-[1000px] mx-auto">
            <h2 className="mb-4">An invitation to elegance</h2>
          </div>
        </div>
        <Carousel />
        <div className="mt-24 px-8">
          <p>Be the first to discover Arpino’s debut collection.</p>
        </div>
        <div className="w-full mt-8">
          <EmailSubscription />
        </div>
      </section>
      {/* Contact */}
      <section className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center p-8 w-full">
          <h1 className="mb-4">Get In Touch</h1>
          <p className="max-w-[600px] mx-auto">
            At Arpinō the art of luxury is celebrated in its purest form — tailored to your
            individual tastes, with expert guidance and unparalleled attention to detail.
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
        </div>
      </section>
    </>
  );
}
