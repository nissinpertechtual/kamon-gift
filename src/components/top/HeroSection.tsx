'use client';

import Link from 'next/link';

const MONO = "var(--font-mono)";
const MINCHO = "var(--font-mincho)";

/* トンボ（見当合わせ）— 四隅の観測枠マーク */
function Crop({ corner }: { corner: 'tl' | 'tr' | 'bl' | 'br' }) {
  const v: React.CSSProperties = { position: 'absolute', width: '14px', height: '14px', borderColor: '#5d636a', borderStyle: 'solid', borderWidth: 0 };
  const pos: Record<string, React.CSSProperties> = {
    tl: { top: -1, left: -1, borderTopWidth: 1, borderLeftWidth: 1 },
    tr: { top: -1, right: -1, borderTopWidth: 1, borderRightWidth: 1 },
    bl: { bottom: -1, left: -1, borderBottomWidth: 1, borderLeftWidth: 1 },
    br: { bottom: -1, right: -1, borderBottomWidth: 1, borderRightWidth: 1 },
  };
  return <span aria-hidden="true" style={{ ...v, ...pos[corner] }} />;
}

const KamonGenpan = () => (
  <svg width="62" height="62" viewBox="0 0 72 72" aria-hidden="true">
    <circle cx="36" cy="36" r="30" fill="none" stroke="#e9e7e1" strokeWidth="1" opacity="0.9" />
    <circle cx="36" cy="36" r="18" fill="none" stroke="#e9e7e1" strokeWidth="0.8" opacity="0.8" />
    <line x1="36" y1="3" x2="36" y2="69" stroke="#5d636a" strokeWidth="0.6" />
    <line x1="3" y1="36" x2="69" y2="36" stroke="#5d636a" strokeWidth="0.6" />
    <circle cx="36" cy="36" r="3.4" fill="#e23b2e" />
  </svg>
);

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100svh',
        position: 'relative',
        background: '#0b0c0e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(72px, 12vh, 130px) 24px',
        overflow: 'hidden',
      }}
    >
      {/* 背景: KV クロスフェード・スライドショー（前デザインのKV写真を含む） */}
      <div className="kv-stage" aria-hidden="true">
        {[
          'photo-1545569341-9eb8b30979d9',
          'photo-1558618666-fcd25c85cd64',
          'photo-1557409518-691ebcd96038',
          'photo-1512909006721-3d6018887383',
        ].map((id) => (
          <div
            key={id}
            className="kv"
            style={{ backgroundImage: `url('https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop')` }}
          />
        ))}
      </div>
      {/* 墨のスクリム — 計器グレードの暗さと可読性、下端を地に溶かす */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(11,12,14,0.7) 0%, rgba(11,12,14,0.5) 38%, rgba(11,12,14,0.72) 78%, #0b0c0e 100%)',
        }}
      />

      {/* 観測枠（トンボ付き） */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 'clamp(16px, 3vw, 30px)', border: '1px solid #23272c', pointerEvents: 'none', zIndex: 2 }}
      >
        <Crop corner="tl" /><Crop corner="tr" /><Crop corner="bl" /><Crop corner="br" />
      </div>

      {/* 上部 計器リードアウト */}
      <div
        className="hidden-mobile"
        style={{
          position: 'absolute',
          top: 'clamp(28px, 4.5vw, 48px)',
          left: 'clamp(36px, 5vw, 60px)',
          right: 'clamp(36px, 5vw, 60px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 3,
        }}
      >
        <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '10px', letterSpacing: '0.22em', color: '#9aa0a6' }}>
          <span className="sig-dots"><i className="ir" /><i className="gr" /></span>
          KAMON-01 · LASER ENGRAVING — λ DUAL WAVELENGTH
        </span>
        <span className="mono" style={{ fontSize: '10px', letterSpacing: '0.22em', color: '#5d636a' }}>
          SPECIMEN · 家紋
        </span>
      </div>

      {/* 右端 焦点スケール（縦） */}
      <div
        className="hidden-mobile"
        aria-hidden="true"
        style={{ position: 'absolute', right: 'clamp(40px, 5.5vw, 72px)', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 3 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} style={{ width: i === 4 ? '12px' : '6px', height: '1px', background: i === 4 ? '#e23b2e' : '#33383e' }} />
          ))}
        </div>
        <span className="mono tate" style={{ fontSize: '9px', letterSpacing: '0.24em', color: '#5d636a' }}>
          FOCUS Ø15μm
        </span>
      </div>

      {/* 本体 */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <KamonGenpan />
        </div>

        {/* eyebrow */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '26px' }}>
          <span className="sig-dots"><i className="ir" /><i className="gr" /></span>
          <span className="mono" style={{ fontSize: '10px', letterSpacing: '0.36em', color: '#9aa0a6', textTransform: 'uppercase', paddingLeft: '0.36em' }}>
            Dual Wavelength
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(30px, 6vw, 56px)',
            fontWeight: 500,
            letterSpacing: '0.06em',
            lineHeight: 1.55,
            color: '#e9e7e1',
            margin: 0,
            fontFamily: MINCHO,
            whiteSpace: 'pre-line',
          }}
        >
          {`あなたの家紋を、\n世界にひとつの贈り物へ。`}
        </h1>

        {/* スペック読み出し */}
        <p className="mono" style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#9aa0a6', marginTop: '26px', marginBottom: 0 }}>
          METAL · LEATHER · GLASS — 結婚式 / 内祝い / 推し活
        </p>

        <div className="hero-cta-buttons">
          <Link href="/products" className="hero-btn-primary">商品を見る</Link>
          <Link href="/contact" className="hero-btn-secondary">ギフトのご相談</Link>
        </div>

        {/* 不安解消ストリップ */}
        <div className="mono" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '8px 16px', marginTop: '30px', fontSize: '10px', letterSpacing: '0.12em', color: '#828990' }}>
          {['1点から承ります', '家紋が分からなくてもOK', '最短2〜3週間'].map((t, i) => (
            <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
              {i > 0 && <span style={{ width: '1px', height: '10px', background: '#33383e' }} />}
              <span>{t}</span>
            </span>
          ))}
        </div>
      </div>

      {/* スクロール */}
      <div style={{ position: 'absolute', bottom: 'clamp(30px, 5vw, 46px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', zIndex: 3 }}>
        <span className="mono" style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#5d636a' }}>SCROLL</span>
        <div className="scroll-line-wrapper"><div className="scroll-line-inner" /></div>
      </div>
    </section>
  );
}
