'use client';

import Link from 'next/link';

const KamonMark = () => (
  <svg width="36" height="36" viewBox="0 0 72 72" aria-hidden="true">
    <circle cx="36" cy="36" r="30" fill="none" stroke="#f3ece0" strokeWidth="1" opacity="0.85" />
    <circle cx="36" cy="36" r="18" fill="none" stroke="#f3ece0" strokeWidth="0.8" opacity="0.85" />
    <circle cx="36" cy="36" r="7" fill="none" stroke="#e0b15a" strokeWidth="0.8" />
    <line x1="36" y1="6" x2="36" y2="66" stroke="#f3ece0" strokeWidth="0.7" opacity="0.7" />
    <line x1="6" y1="36" x2="66" y2="36" stroke="#f3ece0" strokeWidth="0.7" opacity="0.7" />
  </svg>
);

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 90px',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 全面KV写真 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&q=80&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.46) saturate(0.72)',
          zIndex: 0,
        }}
      />
      {/* 墨のスクリム — 文字の可読性＋下端を生成りへ繋ぐ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(26,22,18,0.5) 0%, rgba(26,22,18,0.2) 30%, rgba(26,22,18,0.35) 70%, rgba(244,240,231,0.96) 100%)',
          zIndex: 1,
        }}
      />

      {/* 右の縦書き添え書き（PCのみ） */}
      <div
        className="hidden-mobile"
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 'clamp(22px, 5vw, 68px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
      >
        <p
          className="tate"
          style={{
            margin: 0,
            fontSize: '14px',
            color: 'rgba(247,241,230,0.78)',
            fontWeight: 400,
            fontFamily: 'var(--font-mincho)',
          }}
        >
          家の記憶を、かたちに。
        </p>
      </div>

      {/* コンテンツ */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '26px' }}>
          <KamonMark />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            marginBottom: '32px',
          }}
        >
          <span style={{ width: '30px', height: '0.5px', background: 'rgba(247,241,230,0.5)' }} />
          <span
            className="latin"
            style={{
              fontSize: '11px',
              letterSpacing: '0.42em',
              color: 'rgba(247,241,230,0.92)',
              fontStyle: 'italic',
              paddingLeft: '0.42em',
            }}
          >
            Laser-engraved Kamon Gifts
          </span>
          <span style={{ width: '30px', height: '0.5px', background: 'rgba(247,241,230,0.5)' }} />
        </div>

        <h1
          style={{
            fontSize: 'clamp(28px, 5.6vw, 50px)',
            fontWeight: 500,
            letterSpacing: '0.14em',
            lineHeight: 2.05,
            color: '#f7f1e6',
            margin: 0,
            fontFamily: 'var(--font-mincho)',
            whiteSpace: 'pre-line',
            textShadow: '0 2px 30px rgba(26,22,18,0.45)',
          }}
        >
          {`あなたの家紋を、\n世界にひとつの贈り物へ。`}
        </h1>

        <p
          style={{
            fontSize: '13px',
            letterSpacing: '0.16em',
            lineHeight: 2.7,
            color: 'rgba(247,241,230,0.82)',
            marginTop: '30px',
            fontWeight: 400,
            fontFamily: 'var(--font-mincho)',
            whiteSpace: 'pre-line',
            textShadow: '0 1px 16px rgba(26,22,18,0.5)',
          }}
        >
          {`金属・革・ガラスへの繊細なレーザー彫刻。\n結婚式・内祝い・推し活の贈り物に。`}
        </p>

        <div className="hero-cta-buttons">
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              background: '#a3282b',
              color: '#f7f1e6',
              padding: '16px 50px',
              fontSize: '12px',
              letterSpacing: '0.3em',
              fontWeight: 500,
              textDecoration: 'none',
              border: '0.5px solid #a3282b',
              fontFamily: 'var(--font-mincho)',
            }}
          >
            商品を見る
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              background: 'rgba(247,241,230,0.06)',
              color: '#f7f1e6',
              padding: '16px 50px',
              fontSize: '12px',
              letterSpacing: '0.3em',
              fontWeight: 400,
              textDecoration: 'none',
              border: '0.5px solid rgba(247,241,230,0.5)',
              fontFamily: 'var(--font-mincho)',
            }}
          >
            ギフトのご相談
          </Link>
        </div>

        {/* 不安解消ストリップ — 購入前の障壁を先回りで取り除く */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px 18px',
            marginTop: '34px',
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: 'rgba(247,241,230,0.85)',
            fontFamily: 'var(--font-mincho)',
          }}
        >
          {['1点から承ります', '家紋が分からなくてもOK', '最短2〜3週間でお届け'].map((t, i) => (
            <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '18px' }}>
              {i > 0 && <span style={{ width: '1px', height: '11px', background: 'rgba(247,241,230,0.35)' }} />}
              <span>{t}</span>
            </span>
          ))}
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div
        style={{
          position: 'absolute',
          bottom: '34px',
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
          className="latin"
          style={{
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#8a8173',
            fontStyle: 'italic',
          }}
        >
          Scroll
        </span>
        <div className="scroll-line-wrapper">
          <div className="scroll-line-inner" />
        </div>
      </div>
    </section>
  );
}
