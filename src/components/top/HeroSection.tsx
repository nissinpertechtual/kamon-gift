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
        padding: '120px 24px 80px',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 背景画像 — 暗めの和の雰囲気 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=80&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.22) saturate(0.6)',
          zIndex: 0,
        }}
      />
      {/* グラデーションオーバーレイ — 上下を暗く */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 20%, transparent 75%, #0a0a0a 100%)',
          zIndex: 1,
        }}
      />

      {/* コンテンツ */}
      <div style={{ position: 'relative', zIndex: 2 }}>
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

        {/* サブコピー */}
        <p
          style={{
            fontSize: '12px',
            letterSpacing: '0.1em',
            lineHeight: 2.4,
            color: '#aaa',
            marginTop: '28px',
            fontWeight: 300,
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            whiteSpace: 'pre-line',
          }}
        >
          {`金属・革・ガラスへのレーザー彫刻\n結婚式・内祝い・推し活のギフトに`}
        </p>

        {/* CTAボタン */}
        <div className="hero-cta-buttons" style={{ marginTop: '48px' }}>
          <Link href="/products" className="hero-btn-primary">
            商品を見る
          </Link>
          <Link href="/contact" className="hero-btn-secondary">
            ギフトのご相談
          </Link>
        </div>
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
          zIndex: 2,
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
