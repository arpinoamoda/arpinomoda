import EmailSubscription from '@/app/components/email-subscription';
import { Section, SectionInner } from '@/components/ui/components';
export default function Contact() {
  return (
    <Section>
      <SectionInner>
        <h2 className="mb-4">Get In Touch</h2>
        <p className="max-w-[600px] mx-auto mb-8">
          Connect with us to reserve an exclusive preview of our collection, inquire about our trunk
          shows—private events where you can experience our luxury pieces in an intimate setting—or
          for collaborations and other inquiries.
        </p>
        <EmailSubscription />
      </SectionInner>
    </Section>
  );
}
