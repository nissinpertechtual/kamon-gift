'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',   /* 余白を広げる */
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {/* 上部ラベル */}
      <p
        style={{
          fontSize: '9px',
          letterSpacing: '0.35em',
          color: '#c9a84c',
          marginBottom: '28px',
          fontWeight: 300,
          fontFamily: 'Georgia, serif',
        }}
      >
        LASER ENGRAVED KAMON GIFTS
      </p>

      {/* メインコピー */}
      <h1
        style={{
          fontSize: 'clamp(22px, 5vw, 36px)',
          fontWeight: 300,
          letterSpacing: '0.08em',
          lineHeight: 1.7,
          color: '#f0ede6',
          margin: 0,
          fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
          whiteSpace: 'pre-line',
        }}
      >
        {`あなたの家紋を、\n世界にひとつのギフトに。`}
      </h1>

      {/* サブコピー（間を広げる） */}
      <p
        style={{
          fontSize: '12px',
          letterSpacing: '0.1em',
          lineHeight: 2.4,
          color: '#888',
          marginTop: '28px',          /* 修正: 16→28px */
          fontWeight: 300,
          fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
          whiteSpace: 'pre-line',
        }}
      >
        {`金属・革・ガラスへのレーザー彫刻\n結婚式・内祝い・推し活のギフトに`}
      </p>

      {/* CTAボタン（サブコピーとの間を広げる） */}
      <div className="hero-cta-buttons" style={{ marginTop: '48px' }}>
        <Link href="/products" className="hero-btn-primary">
          商品を見る
        </Link>
        <Link href="/contact" className="hero-btn-secondary">
          ギフトのご相談
        </Link>
      </div>

      {/* スクロールインジケーター */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.35em',
            color: '#555',
            fontWeight: 300,
            fontFamily: 'Georgia, serif',
          }}
        >
          SCROLL
        </span>
        <div className="scroll-line-wrapper">
          <div className="scroll-line-inner" />
        </div>
      </div>
    </section>
  );
}
