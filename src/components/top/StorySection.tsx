'use client';

import { useEffect, useRef, useState } from 'react';

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

// フェードインフックス
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ブロック単体コンポーネント
function StoryBlock({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
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
          fontSize: '20px',
          fontWeight: 400,
          letterSpacing: '0.1em',
          color: '#f0ede6',
          marginBottom: '16px',
          fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
        }}
      >
        {heading}
      </h2>
      <p
        style={{
          fontSize: '13px',
          lineHeight: 2.2,
          color: '#888',
          letterSpacing: '0.05em',
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

// 区切り線
function Divider() {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        height: '0.5px',
        backgroundColor: '#1e1e1e',
        margin: '40px 0',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    />
  );
}

export default function StorySection() {
  const { ref: labelRef, visible: labelVisible } = useFadeIn();

  return (
    <section
      id="story"
      style={{
        padding: '80px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        {/* セクションラベル */}
        <div
          ref={labelRef}
          style={{
            marginBottom: '32px',
            textAlign: 'center',
            opacity: labelVisible ? 1 : 0,
            transform: labelVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <span
            style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: '#c9a84c',
              fontFamily: 'Georgia, serif',
            }}
          >
            STORY
          </span>
        </div>

        {/* ブロック1 */}
        <StoryBlock
          heading={STORY_CONTENT.block1.heading}
          body={STORY_CONTENT.block1.body}
        />

        <Divider />

        {/* ブロック2 */}
        <StoryBlock
          heading={STORY_CONTENT.block2.heading}
          body={STORY_CONTENT.block2.body}
        />

        <Divider />

        {/* ブロック3 */}
        <StoryBlock
          heading={STORY_CONTENT.block3.heading}
          body={STORY_CONTENT.block3.body}
        />
      </div>
    </section>
  );
}
