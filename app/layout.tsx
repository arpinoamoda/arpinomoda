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
  title: "Arpinomode – Luxury Apparel by Mina Ely",
  description:
    "Discover Mina Ely’s luxury style at Arpinomode. Explore fashion crafted for sophisticated expression.",
  keywords: [
    "arpinomode",
    "Mina Ely",
    "luxury fashion",
    "designer apparel",
    "modern streetwear",
  ],
  metadataBase: new URL("https://www.arpinomode.com"),
  openGraph: {
    title: "Arpinomode – Luxury Apparel by Mina Ely",
    description:
      "Discover Mina Ely’s luxury style at Arpinomode. Explore fashion crafted for sophisticated expression.",
    url: "https://www.arpinomode.com",
    siteName: "Arpinomode",
    images: [
      {
        url: "/images/bnr-logo.png",
        width: 1200,
        height: 630,
        alt: "Mina Ely designer fashion – Arpinomode",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpinomode – Luxury Apparel by Mina Ely",
    description:
      "Explore Mina Ely’s elegant designs exclusively at Arpinomode.",
    images: ["/images/bnr-logo.png"],
  },
  alternates: {
    canonical: "https://www.arpinomode.com",
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
