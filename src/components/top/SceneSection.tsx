'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';

const SCENES = [
  {
    title: '推し活ギフトに',
    body: '推しの家紋や、あなただけの紋様を\n金属やアクリルに彫刻。\n世界でひとつの推し活グッズに。',
    href: '/products?scene=oshi',
    icon: (
      <svg width="52" height="52" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <path d="M28 42 C28 42 10 30 10 19 C10 13.5 14.5 9 20 9 C23.5 9 26.5 11 28 14 C29.5 11 32.5 9 36 9 C41.5 9 46 13.5 46 19 C46 30 28 42 28 42Z" fill="none" stroke="#f0e9da" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M44 8 L45.2 11.6 L49 11.6 L46 13.8 L47.2 17.4 L44 15.2 L40.8 17.4 L42 13.8 L39 11.6 L42.8 11.6 Z" fill="none" stroke="#f0e9da" strokeWidth="0.8" />
      </svg>
    ),
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=70&auto=format&fit=crop',
  },
  {
    title: '結婚式・内祝いに',
    body: '両家の家紋を刻んだ記念品。\n引き出物や両親へのギフトとして、\n特別な日の想いを形に残します。',
    href: '/products?scene=bridal',
    icon: (
      <svg width="52" height="52" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <circle cx="22" cy="28" r="11" fill="none" stroke="#f0e9da" strokeWidth="1.1" />
        <circle cx="34" cy="28" r="11" fill="none" stroke="#f0e9da" strokeWidth="1.1" />
        <line x1="28" y1="10" x2="28" y2="14" stroke="#f0e9da" strokeWidth="0.8" opacity="0.6" />
      </svg>
    ),
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=70&auto=format&fit=crop',
  },
  {
    title: '海外の方へのお土産に',
    body: '家紋は日本が世界に誇るデザイン。\n訪日外国人や海外赴任の方への\n本物の和のギフトとして。',
    href: '/products?scene=inbound',
    icon: (
      <svg width="52" height="52" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <circle cx="28" cy="30" r="18" fill="none" stroke="#f0e9da" strokeWidth="1.1" />
        <ellipse cx="28" cy="30" rx="8" ry="18" fill="none" stroke="#f0e9da" strokeWidth="0.7" opacity="0.8" />
        <line x1="10" y1="30" x2="46" y2="30" stroke="#f0e9da" strokeWidth="0.7" opacity="0.8" />
        <path d="M12 22 Q28 26 44 22" fill="none" stroke="#f0e9da" strokeWidth="0.5" opacity="0.6" />
        <path d="M12 38 Q28 34 44 38" fill="none" stroke="#f0e9da" strokeWidth="0.5" opacity="0.6" />
      </svg>
    ),
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=70&auto=format&fit=crop',
  },
] as const;

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
    <section style={{ padding: '120px 24px', background: '#202127' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <SectionLabel en="For Your Scene" ja="シーン別" />

        <div className="scene-grid">
          {SCENES.map((scene, i) => (
            <div
              key={scene.href}
              ref={refs[i]}
              className="scene-card"
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease, box-shadow 0.6s ease',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* 背景写真 */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${scene.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.56) saturate(0.72)',
                  zIndex: 0,
                  transition: 'filter 0.6s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 25%, rgba(20,17,13,0.82) 100%)',
                  zIndex: 1,
                }}
              />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <p
                  style={{
                    fontSize: '17px',
                    letterSpacing: '0.12em',
                    fontWeight: 500,
                    margin: '18px 0 12px',
                    color: '#f7f1e6',
                    fontFamily: 'var(--font-mincho)',
                  }}
                >
                  {scene.title}
                </p>

                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(247,241,230,0.82)',
                    lineHeight: 2.1,
                    margin: 0,
                    fontWeight: 400,
                    whiteSpace: 'pre-line',
                    fontFamily: 'var(--font-mincho)',
                  }}
                >
                  {scene.body}
                </p>

                <Link
                  href={scene.href}
                  className="latin"
                  style={{
                    display: 'inline-block',
                    marginTop: '22px',
                    fontSize: '11px',
                    color: '#f3ddd0',
                    textDecoration: 'none',
                    letterSpacing: '0.12em',
                    fontStyle: 'italic',
                    borderBottom: '0.5px solid rgba(243,221,208,0.4)',
                    paddingBottom: '3px',
                  }}
                >
                  View products →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
