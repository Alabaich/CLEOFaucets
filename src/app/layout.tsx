import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/footer";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cleo Faucets",
  description: "Discover Cleo Faucets - premium faucets and plumbing fixtures.",
  icons: {
    icon: "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/favicons%2Ffavicon.ico?alt=media&token=71c59d6e-a6d0-4471-b277-ae7675233ecf", // Default favicon
    apple: "https://firebasestorage.googleapis.com/v0/b/cleo-plumbing.firebasestorage.app/o/favicons%2Fapple-touch-icon.png?alt=media&token=b0674a5d-8493-4147-95a3-bdfd6b7973c1", // Apple touch icon
  },
  openGraph: {
    title: "Cleo Faucets - Modern Faucets and Plumbing Fixtures",
    description:
      "Discover Cleo Faucets, a premium provider of modern kitchen and bathroom fixtures.",
    url: "https://www.cleofaucets.com",
    siteName: "Cleo Faucets",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cleo Faucets - Modern Faucets and Plumbing Fixtures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleo Faucets - Modern Faucets and Plumbing Fixtures",
    description:
      "Discover Cleo Faucets, a premium provider of modern kitchen and bathroom fixtures.",
    images: ["/og-image.png"],
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
        <a href="#main-content" className="skip-link text-[#000000]">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
