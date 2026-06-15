'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/lib/site';

type Props = {
  eyebrow: string;   // 等幅ラベル（例: DUAL WAVELENGTH）
  caption: string;   // 明朝の見出し
  sub: string;       // 等幅のスペック読み出し
  image?: string;    // フォールバック静止画（動画未設定時）
  lang?: 'ja' | 'en';
};

/**
 * 全面のシネマティック帯。SITE.craftVideo があれば実写動画、無ければ
 * 静止画のスローズーム（動画風）でフォールバック。スクロールで浮かび上がる。
 */
export function CinematicBand({ eyebrow, caption, sub, image, lang = 'ja' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const poster = image || SITE.craftVideoPoster;
  const mincho = lang === 'en' ? "'Cormorant Garamond', Georgia, serif" : 'var(--font-mincho)';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); ob.disconnect(); } },
      { threshold: 0.25 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        minHeight: 'min(78vh, 640px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* 背景: 動画 or 静止画スローズーム */}
      {SITE.craftVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4) saturate(0.7)', zIndex: 0 }}
        >
          <source src={SITE.craftVideo} />
        </video>
      ) : (
        <div
          aria-hidden="true"
          className="cine-zoom"
          style={{ position: 'absolute', inset: 0, backgroundImage: `url('${poster}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.4) saturate(0.7)', zIndex: 0 }}
        />
      )}

      {/* スクリム＋上下の地溶け */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, #0b0c0e 0%, rgba(11,12,14,0.35) 26%, rgba(11,12,14,0.55) 74%, #0b0c0e 100%)' }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 24px',
          opacity: shown ? 1 : 0,
          transform: shown ? 'none' : 'translateY(20px)',
          transition: 'opacity 1.1s ease, transform 1.1s ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
          <span className="sig-dots"><i className="ir" /><i className="gr" /></span>
          <span className="mono" style={{ fontSize: '10px', letterSpacing: '0.36em', color: '#cfd2d6', textTransform: 'uppercase', paddingLeft: '0.36em' }}>
            {eyebrow}
          </span>
        </div>

        <h2 style={{ fontSize: 'clamp(24px, 4.4vw, 40px)', fontWeight: 500, letterSpacing: '0.08em', lineHeight: 1.5, color: '#f1efe9', margin: 0, fontFamily: mincho, whiteSpace: 'pre-line' }}>
          {caption}
        </h2>

        <p className="mono" style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#9aa0a6', marginTop: '22px', marginBottom: 0 }}>
          {sub}
        </p>
      </div>
    </section>
  );
}
