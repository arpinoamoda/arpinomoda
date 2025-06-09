import EmailSubscription from '@/app/components/email-subscription';

export default function Contact() {
  return (
    <>
      <section className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center p-8 w-full mx-auto">
          <h2 className="mb-4">Get In Touch</h2>
          <p className="max-w-[600px] mx-auto mb-8">
            Connect with us to reserve an exclusive preview of our collection, inquire about our
            trunk shows—private events where you can experience our luxury pieces in an intimate
            setting—or for collaborations and other inquiries.
          </p>

          <EmailSubscription />
        </div>
      </section>
    </>
  );
}
