'use client';

import { useEffect, useState } from 'react';
import KamonBackground from './KamonBackground';
import Logo from './Logo';

export default function Splash() {
  // ページロード毎に毎回表示する
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="splash-animate"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: '#f4f0e7',
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
        <Logo size={132} color="#2a2620" />

        {/* 英語サブタイトル */}
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#6f675a',
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
