'use client';

import Link from 'next/link';
import { SITE } from '@/lib/site';

const MINCHO = 'var(--font-mincho)';

const UNSPLASH_KV = [
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&q=80&auto=format&fit=crop',
];

export default function HeroSection() {
  const img = (SITE.heroPhotos.length ? SITE.heroPhotos : UNSPLASH_KV)[0];

  return (
    <section
      style={{
        minHeight: '100svh',
        position: 'relative',
        background: '#0b0b0c',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 背景: 生成画像 + スローズーム */}
      <div className="kv-stage" aria-hidden="true">
        <div
          className="cine-zoom"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${img}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.66) saturate(1)',
          }}
        />
      </div>
      {/* 左を暗く、下端を地へ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to right, rgba(11,11,12,0.86) 0%, rgba(11,11,12,0.55) 42%, rgba(11,11,12,0.15) 100%), linear-gradient(to bottom, transparent 60%, #0b0b0c 100%)',
        }}
      />

      {/* コンテンツ — 左揃え・エディトリアル */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '120px 32px',
        }}
      >
        <div style={{ maxWidth: '620px' }}>
          <p
            className="latin"
            style={{ fontSize: '13px', letterSpacing: '0.22em', color: 'rgba(239,236,228,0.6)', fontStyle: 'italic', margin: '0 0 28px' }}
          >
            Laser-engraved Kamon
          </p>

          <h1
            style={{
              fontSize: 'clamp(34px, 6.4vw, 68px)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1.45,
              color: '#f3f0e8',
              margin: 0,
              fontFamily: MINCHO,
              whiteSpace: 'pre-line',
            }}
          >
            {`あなたの家紋を、\n世界にひとつの贈り物へ。`}
          </h1>

          <p
            style={{
              fontSize: '15px',
              letterSpacing: '0.06em',
              lineHeight: 2.2,
              color: 'rgba(239,236,228,0.78)',
              margin: '30px 0 0',
              fontFamily: MINCHO,
              fontWeight: 400,
            }}
          >
            金属・革・ガラスへの、繊細なレーザー彫刻。
          </p>

          <div className="hero-cta-buttons">
            <Link href="/products" className="hero-btn-primary">商品を見る</Link>
            <Link href="/contact" className="hero-btn-secondary">ご相談・お見積もり</Link>
          </div>
        </div>
      </div>

      {/* スクロール */}
      <div
        style={{ position: 'absolute', bottom: '34px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', zIndex: 2 }}
      >
        <span className="latin" style={{ fontSize: '10px', letterSpacing: '0.28em', color: 'rgba(239,236,228,0.4)', fontStyle: 'italic' }}>scroll</span>
        <div className="scroll-line-wrapper"><div className="scroll-line-inner" /></div>
      </div>
    </section>
  );
}
