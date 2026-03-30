'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';

// ─── シーン定数 ──────────────────────────────────────────────────
const SCENES = [
  {
    title: '推し活ギフトに',
    body: '推しの家紋や、あなただけの紋様を\n金属やアクリルに彫刻。\n世界でひとつの推し活グッズに。',
    href: '/products?scene=oshi',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="#c9a84c" strokeWidth="1" />
        <polygon points="16,7 23,11 23,19 16,23 9,19 9,11" fill="none" stroke="#c9a84c" strokeWidth="0.7" />
        <circle cx="16" cy="15" r="3" fill="none" stroke="#c9a84c" strokeWidth="0.7" />
      </svg>
    ),
  },
  {
    title: '結婚式・内祝いに',
    body: '両家の家紋を刻んだ記念品。\n引き出物や両親へのギフトとして、\n特別な日の想いを形に残します。',
    href: '/products?scene=bridal',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="none" stroke="#c9a84c" strokeWidth="1" />
        <circle cx="16" cy="16" r="8"  fill="none" stroke="#c9a84c" strokeWidth="0.8" />
        <circle cx="16" cy="16" r="3"  fill="none" stroke="#c9a84c" strokeWidth="0.7" />
        <line x1="16" y1="1" x2="16" y2="4" stroke="#c9a84c" strokeWidth="0.7" />
        <line x1="16" y1="28" x2="16" y2="31" stroke="#c9a84c" strokeWidth="0.7" />
        <line x1="1" y1="16" x2="4" y2="16" stroke="#c9a84c" strokeWidth="0.7" />
        <line x1="28" y1="16" x2="31" y2="16" stroke="#c9a84c" strokeWidth="0.7" />
      </svg>
    ),
  },
  {
    title: '海外の方へのお土産に',
    body: '家紋は日本が世界に誇るデザイン。\n訪日外国人や海外赴任の方への\n本物の和のギフトとして。',
    href: '/products?scene=inbound',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <line x1="3"  y1="8"  x2="29" y2="8"  stroke="#c9a84c" strokeWidth="1.2" />
        <line x1="5"  y1="11" x2="27" y2="11" stroke="#c9a84c" strokeWidth="0.8" />
        <line x1="9"  y1="8"  x2="9"  y2="28" stroke="#c9a84c" strokeWidth="1.2" />
        <line x1="23" y1="8"  x2="23" y2="28" stroke="#c9a84c" strokeWidth="1.2" />
        <line x1="6"  y1="17" x2="26" y2="17" stroke="#c9a84c" strokeWidth="0.8" />
      </svg>
    ),
  },
] as const;
// ─────────────────────────────────────────────────────────────────

function useStaggeredFadeIn(total: number) {
  const refs = Array.from({ length: total }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRef<HTMLDivElement>(null)
  );
  const [visible, setVisible] = useState<boolean[]>(Array(total).fill(false));

  useEffect(() => {
    refs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible((prev) => { const next = [...prev]; next[i] = true; return next; });
            }, i * 150);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { refs, visible };
}

export default function SceneSection() {
  const { refs, visible } = useStaggeredFadeIn(SCENES.length);

  return (
    <section style={{ padding: '120px 24px', background: '#0d0d0d' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <SectionLabel en="FOR YOUR SCENE" ja="シーン別" />

        <div className="scene-grid">
          {SCENES.map((scene, i) => (
            <div
              key={scene.href}
              ref={refs[i]}
              className="scene-card"
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              <div>{scene.icon}</div>

              <p
                style={{
                  fontSize: '14px',
                  letterSpacing: '0.1em',
                  fontWeight: 300,
                  margin: '20px 0 10px',
                  color: '#f0ede6',
                  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                }}
              >
                {scene.title}
              </p>

              <p
                style={{
                  fontSize: '11px',
                  color: '#666',
                  lineHeight: 2.0,
                  margin: 0,
                  fontWeight: 300,
                  whiteSpace: 'pre-line',
                  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                }}
              >
                {scene.body}
              </p>

              <Link
                href={scene.href}
                style={{
                  display: 'inline-block',
                  marginTop: '20px',
                  fontSize: '10px',
                  color: '#c9a84c',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  fontWeight: 300,
                  fontFamily: 'Georgia, serif',
                }}
              >
                このシーンの商品を見る →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
