import PromoBanner from "../components/common/PromoBanner";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
});

const integral = localFont({
  src: "./fonts/Integralcf-bold.otf",
  variable: "--font-integral",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portstyle.shop"),
  title: {
    default: "PortStyle | 프리미엄 트렌디 패션 쇼핑몰",
    template: "%s | PortStyle"
  },
  description: "PortStyle에서 당신만의 스타일을 완성하세요. 남녀 모두를 위한 세련된 의류와 최신 트렌드 아이템을 만나보실 수 있습니다.",
  keywords: ["패션", "쇼핑몰", "의류", "트렌드", "PortStyle", "PORTSTYLE"],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PortStyle - 당신의 스타일을 완성하다",
    description: "트렌디한 남녀 패션의 모든 것, PortStyle에서 확인하세요.",
    type: "website",
    locale: "ko_KR",
    url: "https://portstyle.shop",
    siteName: "PortStyle",
  },
};

import QueryProvider from "../providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${satoshi.variable} ${integral.variable} font-sans`}>
        <QueryProvider>
          <PromoBanner />
          <NavBar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
