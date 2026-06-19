'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/lib/site';

type Props = {
  eyebrow: string;
  caption: string;
  sub: string;
  image?: string;
  lang?: 'ja' | 'en';
};

/** 全面のシネマティック帯。SITE.craftVideo があれば実写動画、無ければ静止画スローズーム。 */
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
        minHeight: 'min(80vh, 660px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {SITE.craftVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.64) saturate(0.85)', zIndex: 0 }}
        >
          <source src={SITE.craftVideo} />
        </video>
      ) : (
        <div
          aria-hidden="true"
          className="cine-zoom"
          style={{ position: 'absolute', inset: 0, backgroundImage: `url('${poster}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.64) saturate(0.85)', zIndex: 0 }}
        />
      )}

      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(28,29,34,0.82) 0%, rgba(28,29,34,0.45) 50%, rgba(28,29,34,0.15) 100%), linear-gradient(to bottom, #17181c 0%, transparent 22%, transparent 78%, #17181c 100%)' }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '0 32px',
          opacity: shown ? 1 : 0,
          transform: shown ? 'none' : 'translateY(22px)',
          transition: 'opacity 1.2s ease, transform 1.2s ease',
        }}
      >
        <div style={{ maxWidth: '560px' }}>
          <p className="latin" style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(239,236,228,0.6)', fontStyle: 'italic', margin: '0 0 20px' }}>
            {eyebrow}
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4.6vw, 44px)', fontWeight: 500, letterSpacing: '0.06em', lineHeight: 1.5, color: '#f3f0e8', margin: 0, fontFamily: mincho, whiteSpace: 'pre-line' }}>
            {caption}
          </h2>
          <p style={{ fontSize: '14px', letterSpacing: '0.05em', color: 'rgba(239,236,228,0.7)', margin: '22px 0 0', fontFamily: mincho }}>
            {sub}
          </p>
        </div>
      </div>
    </section>
  );
}
