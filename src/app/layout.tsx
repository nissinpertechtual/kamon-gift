import type { Metadata } from "next";
import "./globals.css";
import KamonBackground from "@/components/KamonBackground";
import Splash from "@/components/Splash";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: '家紋の彫刻室 | レーザー彫刻による家紋ギフト専門店',
  description: '金属・革・ガラスへのフェムト秒レーザー彫刻。結婚式・内祝い・推し活・訪日外国人向けギフトに。世界にひとつの家紋ギフトをお届けします。',
  keywords: '家紋,レーザー彫刻,ギフト,推し活,結婚式,内祝い,訪日外国人,フェムト秒レーザー',
  openGraph: {
    title: '家紋の彫刻室',
    description: 'レーザー彫刻による家紋ギフト専門店',
    url: 'https://kamongift.com',
    siteName: '家紋の彫刻室',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
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
