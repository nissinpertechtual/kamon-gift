'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';

const STEPS = [
  { number: '01', title: 'お問い合わせ・ご相談', body: 'フォームから家紋名やご自身の家紋データ・写真をお送りください。家紋が分からなくてもご相談いただけます。' },
  { number: '02', title: 'お見積もり・確認', body: '担当者よりお見積もりとあわせてご連絡します。内容にご了承後、制作を開始します。' },
  { number: '03', title: '制作・出荷', body: 'レーザーで一点ずつ丁寧に彫刻し、梱包・発送します。制作の目安は約2〜3週間。' },
  { number: '04', title: 'お手元にお届け', body: '専用ボックスで梱包。大切な方への贈り物として、そのままお渡しいただけます。' },
] as const;

const POINTS = [
  '家紋データの取り扱いは厳重管理',
  'カスタム品は担当者が丁寧に対応',
  '制作後のキャンセルはご相談ください',
];

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return { ref, visible };
}

const MINCHO = "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif";
const LATIN = "'Cormorant Garamond', Georgia, serif";

function Step({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const { ref, visible } = useFadeIn(index * 110);
  return (
    <div
      ref={ref}
      style={{
        flex: '1 1 200px',
        minWidth: '180px',
        maxWidth: '260px',
        borderTop: '1px solid #2a2a26',
        paddingTop: '22px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div style={{ fontSize: '34px', lineHeight: 1, color: '#efece4', opacity: 0.32, fontFamily: LATIN, marginBottom: '18px' }}>
        {step.number}
      </div>
      <p style={{ fontSize: '15px', letterSpacing: '0.06em', fontWeight: 500, margin: '0 0 12px', color: '#efece4', fontFamily: MINCHO }}>
        {step.title}
      </p>
      <p style={{ fontSize: '13px', color: '#9a958b', lineHeight: 2.1, margin: 0, fontFamily: MINCHO }}>
        {step.body}
      </p>
    </div>
  );
}

export default function ReassuranceSection() {
  const { ref: pointsRef, visible: pointsVisible } = useFadeIn(300);

  return (
    <section style={{ padding: '120px 24px', background: '#0b0b0c' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <SectionLabel en="How it works" ja="ご注文の流れ" align="left" />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 32px', justifyContent: 'flex-start' }}>
          {STEPS.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </div>

        <div
          ref={pointsRef}
          style={{
            marginTop: '64px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px 28px',
            opacity: pointsVisible ? 1 : 0,
            transition: 'opacity 0.9s ease',
          }}
        >
          {POINTS.map((point) => (
            <p key={point} style={{ fontSize: '12px', color: '#615d55', letterSpacing: '0.04em', margin: 0, fontFamily: MINCHO }}>
              {point}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
