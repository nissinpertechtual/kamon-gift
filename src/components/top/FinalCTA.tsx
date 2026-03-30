'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// 家紋パターン（FinalCTA専用 — 少し濃い）
const FinalKamonBg = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <pattern id="kamon-final-a" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="12" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
          <circle cx="30" cy="30" r="7"  fill="none" stroke="#c9a84c" strokeWidth="0.6" />
          <circle cx="30" cy="30" r="3"  fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <line x1="30" y1="18" x2="30" y2="42" stroke="#c9a84c" strokeWidth="0.5" />
          <line x1="18" y1="30" x2="42" y2="30" stroke="#c9a84c" strokeWidth="0.5" />
        </pattern>
        <pattern id="kamon-final-b" x="30" y="30" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="12" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
          <circle cx="30" cy="30" r="7"  fill="none" stroke="#c9a84c" strokeWidth="0.6" />
          <circle cx="30" cy="30" r="3"  fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <line x1="30" y1="18" x2="30" y2="42" stroke="#c9a84c" strokeWidth="0.5" />
          <line x1="18" y1="30" x2="42" y2="30" stroke="#c9a84c" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kamon-final-a)" opacity="0.08" />
      <rect width="100%" height="100%" fill="url(#kamon-final-b)" opacity="0.08" />
    </svg>
  </div>
);

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        padding: '100px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      <FinalKamonBg />

      <div
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        {/* キャッチコピー */}
        <h2
          style={{
            fontSize: 'clamp(16px, 4vw, 24px)',
            fontWeight: 400,
            letterSpacing: '0.1em',
            color: '#f0ede6',
            marginBottom: '12px',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
          }}
        >
          はじめてのご注文も、お気軽にどうぞ。
        </h2>

        {/* サブテキスト */}
        <p
          style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '40px',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            letterSpacing: '0.05em',
          }}
        >
          家紋が分からない方も、まずはご相談ください。
        </p>

        {/* メインボタン */}
        <Link
          href="/contact"
          style={{
            display: 'inline-block',
            background: '#c9a84c',
            color: '#0a0a0a',
            padding: '18px 48px',
            fontSize: '13px',
            letterSpacing: '0.2em',
            textDecoration: 'none',
            border: 'none',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          ギフトのご相談・ご注文はこちら
        </Link>
      </div>
    </section>
  );
}
