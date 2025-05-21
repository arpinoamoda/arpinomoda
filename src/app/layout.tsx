import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arpinomoda – Luxury Apparel by Mina Ely',
  description:
    'Discover Mina Ely’s luxury style at Arpinomoda. Explore fashion crafted for sophisticated expression.',
  keywords: ['arpinomoda', 'Mina Ely', 'luxury fashion', 'designer apparel', 'modern streetwear'],
  metadataBase: new URL('https://arpinomoda.com'),
  openGraph: {
    title: 'Arpinomoda – Luxury Apparel by Mina Ely',
    description:
      'Discover Mina Ely’s luxury style at Arpinomoda. Explore fashion crafted for sophisticated expression.',
    url: 'https://arpinomoda.com',
    siteName: 'Arpinomoda',
    images: [
      {
        url: '/images/bnr-logo.png',
        width: 1200,
        height: 630,
        alt: 'Mina Ely designer fashion – Arpinomoda',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arpinomoda – Luxury Apparel by Mina Ely',
    description: 'Explore Mina Ely’s elegant designs exclusively at Arpinomoda.',
    images: ['/images/bnr-logo.png'],
  },
  alternates: {
    canonical: 'https://arpinomoda.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
