'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';

// ─── 定数（ここを編集） ──────────────────────────────────────────
const STEPS = [
  {
    number: '01',
    title: 'お問い合わせ・ご注文',
    body: 'フォームから家紋名や\nご希望をお送りください。\n既成品はそのまま決済可能です。',
  },
  {
    number: '02',
    title: 'お見積もり・確認',
    body: 'カスタム品は\n担当者からご連絡します。\n内容確認後に制作開始。',
  },
  {
    number: '03',
    title: '制作・納品',
    body: '丁寧に制作し、\n大切にお届けします。\n納期は約2〜3週間。',
  },
];

const POINTS = [
  '家紋データの取り扱いは厳重管理',
  'カスタム品は担当者が丁寧に対応',
  '制作後のキャンセルはご相談ください',
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export default function ReassuranceSection() {
  const { ref: sectionRef, visible: sectionVisible } = useFadeIn();
  const { ref: pointsRef,  visible: pointsVisible  } = useFadeIn();

  return (
    <section style={{ padding: '120px 24px', background: '#0d0d0d' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <SectionLabel en="HOW IT WORKS" ja="ご注文の流れ" />

        {/* ステップ */}
        <div
          ref={sectionRef}
          className="steps-grid"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {STEPS.map((step, i) => (
            <>
              <div key={step.number} style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontSize: '28px',
                    color: '#c9a84c',
                    opacity: 0.5,
                    margin: '0 0 16px',
                    fontWeight: 300,
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '0.05em',
                  }}
                >
                  {step.number}
                </p>

                <p
                  style={{
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    fontWeight: 300,
                    margin: '0 0 10px',
                    color: '#f0ede6',
                    fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                  }}
                >
                  {step.title}
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
                  {step.body}
                </p>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  key={`arrow-${i}`}
                  className="step-arrow"
                  style={{ color: '#333', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  →
                </div>
              )}
            </>
          ))}
        </div>

        {/* 安心ポイント */}
        <div
          ref={pointsRef}
          style={{
            marginTop: '56px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px 36px',
            opacity: pointsVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.3s',
          }}
        >
          {POINTS.map((point) => (
            <p
              key={point}
              style={{
                fontSize: '10px',
                color: '#555',
                letterSpacing: '0.05em',
                fontWeight: 300,
                margin: 0,
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              }}
            >
              <span style={{ color: '#c9a84c', marginRight: '6px' }}>✓</span>
              {point}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
