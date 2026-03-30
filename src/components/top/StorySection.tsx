'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';

// ─── テキストはここだけ編集 ───────────────────────────────────────
const STORY_CONTENT = {
  block1: {
    heading: '家紋は、家の記憶。',
    body: `日本には、一万を超える家紋が存在します。\n武家から町人まで、それぞれの家が受け継いできた紋様。\nその家だけが持つ、かたちの記憶です。`,
  },
  block2: {
    heading: '0.1ミクロンの彫刻。',
    body: `フェムト秒レーザーは、1000兆分の1秒という\n極めて短いパルスで素材を加工します。\n熱を生まず、金属にも革にもガラスにも。\n家紋の繊細な線を、そのままの精度で刻みます。`,
  },
  block3: {
    heading: '贈る人の、想いを彫る。',
    body: `既製品にはない、その人だけの家紋。\n結婚の記念に、大切な人への感謝に、\n推しへの愛を形にするために。\n世界にひとつのギフトを、お届けします。`,
  },
};
// ─────────────────────────────────────────────────────────────────

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function StoryBlock({ heading, body }: { heading: string; body: string }) {
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
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
          lineHeight: 2.4,            /* 修正: 2.2→2.4 */
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
  );
}

// 修正: 短い金線の区切り
function GoldDivider() {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '64px 0',           /* 修正: 40→64px */
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '0.5px',
          background: '#c9a84c',
          opacity: 0.4,
        }}
      />
    </div>
  );
}

export default function StorySection() {
  return (
    <section
      id="story"
      style={{ padding: '120px 24px' }}   /* 修正: 80→120px */
    >
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>  {/* 修正: 680→560px */}

        <SectionLabel en="STORY" ja="ものがたり" />

        <StoryBlock
          heading={STORY_CONTENT.block1.heading}
          body={STORY_CONTENT.block1.body}
        />

        <GoldDivider />

        <StoryBlock
          heading={STORY_CONTENT.block2.heading}
          body={STORY_CONTENT.block2.body}
        />

        <GoldDivider />

        <StoryBlock
          heading={STORY_CONTENT.block3.heading}
          body={STORY_CONTENT.block3.body}
        />
      </div>
    </section>
  );
}
