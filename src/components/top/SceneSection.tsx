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
    // ハートと星 — 推し活・応援
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        {/* ハート */}
        <path
          d="M28 42 C28 42 10 30 10 19 C10 13.5 14.5 9 20 9 C23.5 9 26.5 11 28 14 C29.5 11 32.5 9 36 9 C41.5 9 46 13.5 46 19 C46 30 28 42 28 42Z"
          fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinejoin="round"
        />
        {/* 星（右上） */}
        <path
          d="M44 8 L45.2 11.6 L49 11.6 L46 13.8 L47.2 17.4 L44 15.2 L40.8 17.4 L42 13.8 L39 11.6 L42.8 11.6 Z"
          fill="none" stroke="#c9a84c" strokeWidth="0.8"
        />
        {/* キラキラ小 */}
        <line x1="10" y1="7" x2="10" y2="11" stroke="#c9a84c" strokeWidth="0.7" opacity="0.6"/>
        <line x1="8" y1="9" x2="12" y2="9" stroke="#c9a84c" strokeWidth="0.7" opacity="0.6"/>
      </svg>
    ),
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=70&auto=format&fit=crop',
  },
  {
    title: '結婚式・内祝いに',
    body: '両家の家紋を刻んだ記念品。\n引き出物や両親へのギフトとして、\n特別な日の想いを形に残します。',
    href: '/products?scene=bridal',
    // 結び・リング
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        {/* 左リング */}
        <circle cx="22" cy="28" r="11" fill="none" stroke="#c9a84c" strokeWidth="1.2"/>
        {/* 右リング */}
        <circle cx="34" cy="28" r="11" fill="none" stroke="#c9a84c" strokeWidth="1.2"/>
        {/* 中央の交差部分を少し強調 */}
        <path d="M28 20 Q30 28 28 36" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5"/>
        {/* 上部 飾り線 */}
        <line x1="28" y1="10" x2="28" y2="14" stroke="#c9a84c" strokeWidth="0.8" opacity="0.5"/>
        <line x1="25" y1="11" x2="31" y2="11" stroke="#c9a84c" strokeWidth="0.6" opacity="0.4"/>
      </svg>
    ),
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=70&auto=format&fit=crop',
  },
  {
    title: '海外の方へのお土産に',
    body: '家紋は日本が世界に誇るデザイン。\n訪日外国人や海外赴任の方への\n本物の和のギフトとして。',
    href: '/products?scene=inbound',
    // 地球・飛行機
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        {/* 地球 外円 */}
        <circle cx="28" cy="30" r="18" fill="none" stroke="#c9a84c" strokeWidth="1.2"/>
        {/* 経線 */}
        <ellipse cx="28" cy="30" rx="8" ry="18" fill="none" stroke="#c9a84c" strokeWidth="0.7" opacity="0.7"/>
        {/* 緯線 */}
        <line x1="10" y1="30" x2="46" y2="30" stroke="#c9a84c" strokeWidth="0.7" opacity="0.7"/>
        <path d="M12 22 Q28 26 44 22" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5"/>
        <path d="M12 38 Q28 34 44 38" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5"/>
        {/* 飛行機 */}
        <path d="M36 10 L42 13 L37 16 L38 20 L34 18 L28 22 L29 17 L24 15 L27 12 L32 14 Z"
          fill="none" stroke="#c9a84c" strokeWidth="0.9"/>
      </svg>
    ),
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=70&auto=format&fit=crop',
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
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* 背景画像 — 暗め */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${scene.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.18) saturate(0.4)',
                  zIndex: 0,
                  transition: 'filter 0.5s ease',
                }}
              />
              {/* 下部グラデーション — テキストを読みやすく */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.85) 100%)',
                  zIndex: 1,
                }}
              />

              {/* コンテンツ */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* アイコン */}
                <div style={{ marginBottom: '4px' }}>{scene.icon}</div>

                <p
                  style={{
                    fontSize: '15px',
                    letterSpacing: '0.1em',
                    fontWeight: 300,
                    margin: '16px 0 10px',
                    color: '#f0ede6',
                    fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                  }}
                >
                  {scene.title}
                </p>

                <p
                  style={{
                    fontSize: '11px',
                    color: '#999',
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
