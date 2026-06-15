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
          gap: '18px',
          justifyContent: 'center',
          marginBottom: ja ? '16px' : 0,
        }}
      >
        <div
          style={{
            width: '44px',
            height: '0.5px',
            background: 'linear-gradient(to right, transparent, rgba(163,40,43,0.55))',
          }}
        />
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.4em',
            color: '#a3282b',
            fontWeight: 400,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            paddingLeft: '0.4em',
          }}
        >
          {en}
        </span>
        <div
          style={{
            width: '44px',
            height: '0.5px',
            background: 'linear-gradient(to left, transparent, rgba(163,40,43,0.55))',
          }}
        />
      </div>

      {/* 日本語サブラベル */}
      {ja && (
        <div
          style={{
            fontSize: '17px',
            letterSpacing: '0.18em',
            color: '#2a2620',
            fontWeight: 500,
            fontFamily: "var(--font-mincho)",
          }}
        >
          {ja}
        </div>
      )}
    </div>
  );
}
