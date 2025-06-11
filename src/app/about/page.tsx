import { Section, SectionInner } from '@/components/ui/components';
export default function Page() {
  return (
    <Section>
      <SectionInner>
        <h1 className="mb-4">About Us</h1>
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-12">
          <p className="text-left">
            Our story begins with a small olive grove nestled in Arpino, a village in Italy, where
            patience shapes the production of quality goods. With a deep affinity for the groves,
            the surrounding community, and its traditions, our founder was inspired by their
            enduring values of artistry and care. The name Arpinō pays homage to this community and
            their dedication to producing exceptional goods in small batches.
          </p>
          <p className="text-left">
            Curating an exclusive collection of garments crafted from the finest Italian
            materials—such as fur, cashmere, and silk—Arpinō blends tradition with contemporary
            sophistication. Following in the footsteps of the community that inspired this label, we
            offer bespoke Italian-made luxury knits and outerwear that reflect individuality, honor
            heritage, and timeless craftsmanship.
          </p>
        </div>
      </SectionInner>
    </Section>
  );
}
