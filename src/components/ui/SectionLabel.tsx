'use client';

import { useEffect, useRef, useState } from 'react';

interface SectionLabelProps {
  en: string;
  ja?: string;
}

export function SectionLabel({ en, ja }: SectionLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        marginBottom: '56px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      {/* eyebrow — DUAL WAVELENGTH の信号ドット ＋ 等幅ラベル */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: ja ? '14px' : 0,
        }}
      >
        <span className="sig-dots" aria-hidden="true">
          <i className="ir" />
          <i className="gr" />
        </span>
        <span
          className="mono"
          style={{
            fontSize: '10px',
            letterSpacing: '0.34em',
            color: '#9aa0a6',
            fontWeight: 500,
            textTransform: 'uppercase',
            paddingLeft: '0.34em',
          }}
        >
          {en}
        </span>
      </div>

      {/* 日本語サブラベル */}
      {ja && (
        <div
          style={{
            fontSize: '20px',
            letterSpacing: '0.16em',
            color: '#e9e7e1',
            fontWeight: 500,
            fontFamily: 'var(--font-mincho)',
          }}
        >
          {ja}
        </div>
      )}
    </div>
  );
}
