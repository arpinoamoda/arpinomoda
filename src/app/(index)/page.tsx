import Image from 'next/image';
export default function Home() {
  return (
    <>
      <section
        className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
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
      <section>swd</section>
    </>
  );
}
