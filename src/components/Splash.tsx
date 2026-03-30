'use client';

import { useEffect, useState } from 'react';
import KamonBackground from './KamonBackground';

export default function Splash() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const shown = localStorage.getItem('splash_shown');
    if (!shown) {
      setVisible(true);
      const timer = setTimeout(() => {
        localStorage.setItem('splash_shown', 'true');
        setVisible(false);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="splash-animate"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: '#0a0a0a',
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
        {/* 家紋SVGロゴ */}
        <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
          <circle cx="36" cy="36" r="30" fill="none" stroke="#c9a84c" strokeWidth="1.2" />
          <circle cx="36" cy="36" r="18" fill="none" stroke="#c9a84c" strokeWidth="1" />
          <circle cx="36" cy="36" r="8"  fill="none" stroke="#c9a84c" strokeWidth="0.8" />
          <line x1="36" y1="6"  x2="36" y2="66" stroke="#c9a84c" strokeWidth="0.8" />
          <line x1="6"  y1="36" x2="66" y2="36" stroke="#c9a84c" strokeWidth="0.8" />
          <line x1="15" y1="15" x2="57" y2="57" stroke="#c9a84c" strokeWidth="0.6" />
          <line x1="57" y1="15" x2="15" y2="57" stroke="#c9a84c" strokeWidth="0.6" />
        </svg>

        {/* 日本語タイトル */}
        <p
          style={{
            fontSize: '22px',
            letterSpacing: '0.3em',
            color: '#c9a84c',
            margin: 0,
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
          }}
        >
          家紋の彫刻室
        </p>

        {/* 英語サブタイトル */}
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#888',
            margin: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          KAMON NO CHOUKOKU-SHITSU
        </p>
      </div>
    </div>
  );
}
