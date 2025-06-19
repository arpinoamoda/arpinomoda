import Carousel from '@/app/components/carousel';
import EmailSubscription from '@/app/components/email-subscription';
import { Section, SectionInner } from '@/components/ui/components';
import Link from 'next/link';
export default function About() {
  return (
    <>
      <Section>
        <SectionInner>
          <h1 className="h1">Arpinomoda – Luxury Fashion by Mina Ely</h1>
          <h2 className="mb-4">From Italy, With Intention</h2>
          <p className="max-w-[600px] mx-auto">
            Arpinō is a timeless expression of bespoke luxury, sophisticated style, and Italian
            craftsmanship. We believe luxury is not just worn, but lived— to be experienced and
            cherished for years to come.
          </p>
          <p className="max-w-[600px] mx-auto mt-4">
            <Link
              href="https://github.com/arpinoamoda/lookbooks/raw/main/Arpino_SS25_Lookbook.pdf"
              target="_blank"
            >
              Discover the SS25 collection
            </Link>
          </p>
        </SectionInner>
      </Section>
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
      <Section>
        <div className="flex flex-col">
          <SectionInner>
            <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-12 my-48">
              <p className="text-left">
                Our story begins with a small olive grove nestled in Arpino, a village in Italy,
                where patience shapes the production of quality goods. With a deep affinity for the
                groves, the surrounding community, and its traditions, our founder was inspired by
                their enduring values of artistry and care. The name Arpinō pays homage to this
                community and their dedication to producing exceptional goods in small batches.
              </p>
              <p className="text-left">
                Curating an exclusive collection of garments crafted from the finest Italian
                materials—such as fur, cashmere, and silk—Arpinō blends tradition with contemporary
                sophistication. Following in the footsteps of the community that inspired this
                label, we offer bespoke Italian-made luxury knits and outerwear that reflect
                individuality, honor heritage, and timeless craftsmanship.
              </p>
            </div>
            <div className="max-w-[1000px] mx-auto">
              <h2 className="mb-4">An invitation to elegance</h2>
            </div>
          </SectionInner>
          <Carousel />
          <div className="mt-24 px-8 text-center">
            <p>Be the first to discover Arpino’s debut collection.</p>
          </div>
          <div className="w-full mt-8">
            <EmailSubscription />
          </div>
        </div>
      </Section>
    </>
  );
}
