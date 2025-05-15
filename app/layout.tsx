import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arpinomoda – Luxury Apparel by Mina Ely",
  description:
    "Discover Mina Ely’s luxury style at Arpinomoda. Explore fashion crafted for sophisticated expression.",
  keywords: [
    "arpinomoda",
    "Mina Ely",
    "luxury fashion",
    "designer apparel",
    "modern streetwear",
  ],
  metadataBase: new URL("https://www.arpinomoda.ca"),
  openGraph: {
    title: "Arpinomoda – Luxury Apparel by Mina Ely",
    description:
      "Discover Mina Ely’s luxury style at Arpinomoda. Explore fashion crafted for sophisticated expression.",
    url: "https://www.arpinomoda.ca",
    siteName: "Arpinomoda",
    images: [
      {
        url: "/images/bnr-logo.png",
        width: 1200,
        height: 630,
        alt: "Mina Ely designer fashion – Arpinomoda",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpinomoda – Luxury Apparel by Mina Ely",
    description:
      "Explore Mina Ely’s elegant designs exclusively at Arpinomoda.",
    images: ["/images/bnr-logo.png"],
  },
  alternates: {
    canonical: "https://www.arpinomoda.ca",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
