'use client';

import { useEffect, useRef, useState } from 'react';

interface SectionLabelProps {
  en: string;
  ja?: string;
  align?: 'left' | 'center';
}

export function SectionLabel({ en, ja, align = 'center' }: SectionLabelProps) {
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
        textAlign: align,
        marginBottom: '52px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      <p
        className="latin"
        style={{
          fontSize: '12px',
          letterSpacing: '0.2em',
          color: '#9a958b',
          fontStyle: 'italic',
          margin: ja ? '0 0 10px' : 0,
        }}
      >
        {en}
      </p>
      {ja && (
        <div
          style={{
            fontSize: 'clamp(22px, 3.4vw, 30px)',
            letterSpacing: '0.08em',
            color: '#efece4',
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
