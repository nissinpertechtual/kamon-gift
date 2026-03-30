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
      {/* ラベルを線で挟む */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: ja ? '10px' : 0,
        }}
      >
        <div style={{ width: '40px', height: '0.5px', background: '#333' }} />
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.35em',
            color: '#c9a84c',
            fontWeight: 300,
            fontFamily: 'Georgia, serif',
          }}
        >
          {en}
        </span>
        <div style={{ width: '40px', height: '0.5px', background: '#333' }} />
      </div>

      {/* 日本語サブラベル */}
      {ja && (
        <div
          style={{
            fontSize: '13px',
            letterSpacing: '0.1em',
            color: '#888',
            fontWeight: 300,
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
          }}
        >
          {ja}
        </div>
      )}
    </div>
  );
}
