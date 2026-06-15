import type { Metadata } from "next";
import "./globals.css";
import KamonBackground from "@/components/KamonBackground";
import Splash from "@/components/Splash";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: '家紋の彫刻室 | レーザー彫刻による家紋ギフト専門店',
  description: '金属・革・ガラスへのフェムト秒レーザー彫刻。結婚式・内祝い・推し活・訪日外国人向けギフトに。世界にひとつの家紋ギフトをお届けします。',
  keywords: '家紋,レーザー彫刻,ギフト,推し活,結婚式,内祝い,訪日外国人,フェムト秒レーザー',
  openGraph: {
    title: '家紋の彫刻室 | レーザー彫刻による家紋ギフト専門店',
    description: '金属・革・ガラスへのフェムト秒レーザー彫刻。世界にひとつの家紋ギフトを。',
    url: SITE.url,
    siteName: '家紋の彫刻室',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '家紋の彫刻室',
    description: 'レーザー彫刻による家紋ギフト専門店',
  },
};

// 構造化データ（事業者情報）— 検索結果での信頼性向上
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  image: `${SITE.url}/opengraph-image`,
  telephone: '+81-48-754-6511',
  email: SITE.email,
  description: SITE.description,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'JP',
    addressRegion: SITE.addressRegion,
    addressLocality: SITE.addressLocality,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        {/* 明朝（Zen Old Mincho）＋ラテン・セリフ（Cormorant Garamond）— 参考サイト準拠 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
        {/* 構造化データ（JSON-LD） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        {/* 全ページ共通の家紋背景 */}
        <KamonBackground />

        {/* スプラッシュ（初回のみ表示） */}
        <Splash />

        {/* コンテンツ層 */}
        <div className="relative z-10 flex flex-col min-h-full">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
