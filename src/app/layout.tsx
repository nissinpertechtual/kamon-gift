import type { Metadata } from "next";
import "./globals.css";
import KamonBackground from "@/components/KamonBackground";

export const metadata: Metadata = {
  title: "家紋の彫刻室",
  description: "オリジナル家紋のレーザー彫刻ギフト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col relative">
        <KamonBackground />
        <div className="relative z-10 flex flex-col min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
