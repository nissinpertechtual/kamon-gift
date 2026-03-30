'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';

// ─── ステップ定義 ────────────────────────────────────────────────
const STEPS = [
  {
    number: '01',
    title: 'お問い合わせ・ご注文',
    body: 'フォームから家紋名や\nご希望をお送りください。\n既成品はそのまま決済可能。',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        {/* 封筒 */}
        <rect x="4" y="10" width="36" height="24" rx="1" fill="none" stroke="#c9a84c" strokeWidth="1"/>
        <polyline points="4,10 22,26 40,10" fill="none" stroke="#c9a84c" strokeWidth="1"/>
        {/* ペン */}
        <line x1="30" y1="30" x2="38" y2="22" stroke="#c9a84c" strokeWidth="1" strokeLinecap="round"/>
        <path d="M38 22 L41 19 L38 16 L35 19 Z" fill="none" stroke="#c9a84c" strokeWidth="0.8"/>
        <line x1="29" y1="31" x2="28" y2="34" stroke="#c9a84c" strokeWidth="0.7" opacity="0.6"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'お見積もり・確認',
    body: 'カスタム品は担当者から\nご連絡します。\n内容確認後に制作開始。',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        {/* 書類 */}
        <rect x="8" y="4" width="24" height="30" rx="1" fill="none" stroke="#c9a84c" strokeWidth="1"/>
        <line x1="13" y1="12" x2="27" y2="12" stroke="#c9a84c" strokeWidth="0.8"/>
        <line x1="13" y1="17" x2="27" y2="17" stroke="#c9a84c" strokeWidth="0.8"/>
        <line x1="13" y1="22" x2="21" y2="22" stroke="#c9a84c" strokeWidth="0.8"/>
        {/* チェックマーク（右下） */}
        <circle cx="31" cy="33" r="9" fill="#0a0a0a" stroke="#c9a84c" strokeWidth="1"/>
        <polyline points="26,33 30,37 36,27" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: '制作・出荷',
    body: 'レーザーで丁寧に彫刻し\n梱包・発送します。\n制作期間は約5〜7営業日。',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        {/* レーザー機械本体 */}
        <rect x="6" y="8" width="24" height="14" rx="1" fill="none" stroke="#c9a84c" strokeWidth="1"/>
        {/* レーザービーム */}
        <line x1="18" y1="22" x2="18" y2="30" stroke="#c9a84c" strokeWidth="1.2" strokeDasharray="2 1.5"/>
        {/* 加工対象（プレート） */}
        <rect x="10" y="30" width="28" height="7" rx="0.5" fill="none" stroke="#c9a84c" strokeWidth="1"/>
        {/* キラキラ（彫刻エフェクト） */}
        <line x1="24" y1="26" x2="26" y2="24" stroke="#c9a84c" strokeWidth="0.7" opacity="0.7"/>
        <line x1="20" y1="25" x2="22" y2="23" stroke="#c9a84c" strokeWidth="0.7" opacity="0.5"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'お手元にお届け',
    body: '専用ボックスで丁寧に梱包。\n大切な方への贈り物として\nそのままお使いいただけます。',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        {/* 箱 */}
        <path d="M8 18 L22 10 L36 18 L36 34 L22 42 L8 34 Z" fill="none" stroke="#c9a84c" strokeWidth="1"/>
        {/* 箱の上面 */}
        <path d="M8 18 L22 26 L36 18" fill="none" stroke="#c9a84c" strokeWidth="0.8"/>
        <line x1="22" y1="26" x2="22" y2="42" stroke="#c9a84c" strokeWidth="0.8"/>
        {/* リボン */}
        <line x1="22" y1="10" x2="22" y2="26" stroke="#c9a84c" strokeWidth="0.7" opacity="0.6"/>
        <path d="M16 14 Q22 12 28 14" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.7"/>
      </svg>
    ),
  },
] as const;

const POINTS = [
  '家紋データの取り扱いは厳重管理',
  'カスタム品は担当者が丁寧に対応',
  '制作後のキャンセルはご相談ください',
];
// ─────────────────────────────────────────────────────────────────

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return { ref, visible };
}

// 矢印コネクター（横向き）
function ArrowConnector() {
  return (
    <div
      className="step-arrow"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333',
        flexShrink: 0,
      }}
    >
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" aria-hidden="true">
        <line x1="0" y1="8" x2="26" y2="8" stroke="#333" strokeWidth="0.8"/>
        <polyline points="20,3 27,8 20,13" fill="none" stroke="#333" strokeWidth="0.8"/>
      </svg>
    </div>
  );
}

function StepCard({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const { ref, visible } = useFadeIn(index * 120);

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '28px 20px',
        border: '0.5px solid #1a1a1a',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        background: '#0d0d0d',
      }}
    >
      {/* ステップ番号 — 背景に薄く */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          fontSize: '11px',
          color: '#c9a84c',
          opacity: 0.4,
          fontFamily: 'Georgia, serif',
          fontWeight: 300,
          letterSpacing: '0.05em',
        }}
      >
        {step.number}
      </div>

      {/* アイコン */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', marginTop: '8px' }}>
        {step.icon}
      </div>

      {/* タイトル */}
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

      {/* 本文 */}
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
  );
}

export default function ReassuranceSection() {
  const { ref: pointsRef, visible: pointsVisible } = useFadeIn(400);

  return (
    <section style={{ padding: '120px 24px', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <SectionLabel en="HOW IT WORKS" ja="ご注文の流れ" />

        {/* ステップ — 4カラム + 矢印 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '0',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: '1 1 180px',
                minWidth: '160px',
                maxWidth: '240px',
              }}
            >
              <StepCard step={step} index={i} />
              {i < STEPS.length - 1 && <ArrowConnector />}
            </div>
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
            gap: '16px 40px',
            opacity: pointsVisible ? 1 : 0,
            transition: 'opacity 0.8s ease',
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
