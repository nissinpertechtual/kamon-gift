'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';

// ─── テキストはここだけ編集 ───────────────────────────────────────
const STORY_CONTENT = [
  {
    heading: '家紋は、家の記憶。',
    body: `日本には、一万を超える家紋が存在します。\n武家から町人まで、それぞれの家が受け継いできた紋様。\nその家だけが持つ、かたちの記憶です。`,
    // 古い家・和建築
    imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=70&auto=format&fit=crop',
    imageAlt: '古い日本家屋',
    imagePosition: 'right' as const,
  },
  {
    heading: '0.1ミクロンの彫刻。',
    body: `フェムト秒レーザーは、1000兆分の1秒という\n極めて短いパルスで素材を加工します。\n熱を生まず、金属にも革にもガラスにも。\n家紋の繊細な線を、そのままの精度で刻みます。`,
    // 職人・工芸
    imageUrl: 'https://images.unsplash.com/photo-1566454825481-9c31b0e58f96?w=900&q=70&auto=format&fit=crop',
    imageAlt: '職人の手仕事',
    imagePosition: 'left' as const,
  },
  {
    heading: '贈る人の、想いを彫る。',
    body: `既製品にはない、その人だけの家紋。\n結婚の記念に、大切な人への感謝に、\n推しへの愛を形にするために。\n世界にひとつのギフトを、お届けします。`,
    // ギフト・包装
    imageUrl: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=900&q=70&auto=format&fit=crop',
    imageAlt: '美しいギフト包装',
    imagePosition: 'right' as const,
  },
];
// ─────────────────────────────────────────────────────────────────

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function StoryBlock({
  heading, body, imageUrl, imageAlt, imagePosition,
}: {
  heading: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
}) {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}
    >
      {/* レスポンシブ: md以上で2カラム */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          direction: imagePosition === 'left' ? 'rtl' : 'ltr',
        }}
      >
        {/* テキスト */}
        <div style={{ direction: 'ltr' }}>
          <h2
            style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              fontWeight: 300,
              letterSpacing: '0.1em',
              lineHeight: 1.6,
              color: '#f0ede6',
              marginBottom: '20px',
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            }}
          >
            {heading}
          </h2>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 2.4,
              color: '#888',
              letterSpacing: '0.05em',
              fontWeight: 300,
              margin: 0,
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              whiteSpace: 'pre-line',
            }}
          >
            {body}
          </p>
        </div>

        {/* 画像 */}
        <div
          style={{
            direction: 'ltr',
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
          }}
        >
          {/* 暗めオーバーレイ */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.38) saturate(0.5)',
              zIndex: 0,
            }}
            aria-label={imageAlt}
            role="img"
          />
          {/* 左右グラデーション — テキスト側にフェード */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: imagePosition === 'right'
                ? 'linear-gradient(to right, #0a0a0a 0%, transparent 40%)'
                : 'linear-gradient(to left, #0a0a0a 0%, transparent 40%)',
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function GoldDivider() {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '72px 0',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div style={{ width: '40px', height: '0.5px', background: '#c9a84c', opacity: 0.4 }} />
    </div>
  );
}

export default function StorySection() {
  return (
    <section id="story" style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>

        <SectionLabel en="STORY" ja="ものがたり" />

        {STORY_CONTENT.map((block, i) => (
          <div key={block.heading}>
            <StoryBlock
              heading={block.heading}
              body={block.body}
              imageUrl={block.imageUrl}
              imageAlt={block.imageAlt}
              imagePosition={block.imagePosition}
            />
            {i < STORY_CONTENT.length - 1 && <GoldDivider />}
          </div>
        ))}
      </div>
    </section>
  );
}
