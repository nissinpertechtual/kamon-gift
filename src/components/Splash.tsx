'use client';

import { useEffect, useState } from 'react';
import KamonBackground from './KamonBackground';
import Logo from './Logo';

export default function Splash() {
  // セッション内で初回のみ表示（リピート訪問・ページ遷移では出さない）
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('splash-shown')) return;
    sessionStorage.setItem('splash-shown', '1');
    const raf = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="splash-animate"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: '#0b0c0e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <KamonBackground />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* 落款ロゴ */}
        <Logo size={132} color="#e9e7e1" />

        {/* 英語サブタイトル */}
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#9aa0a6',
            margin: 0,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          KAMON NO CHOUKOKU-SHITSU
        </p>
      </div>
    </div>
  );
}
