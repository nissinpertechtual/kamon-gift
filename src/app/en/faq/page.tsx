import Link from 'next/link';
import type { Metadata } from 'next';
import KamonBackground from '@/components/KamonBackground';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { EN } from '@/lib/i18n/translations';

const SERIF = "'Cormorant Garamond', Georgia, serif";

export const metadata: Metadata = {
  title: 'FAQ | Kamon Engraving Studio',
  description:
    'How to order when you don’t know your family crest, lead times, materials, payment and more — answers to common questions.',
};

export default function EnFaqPage() {
  return (
    <div style={{ position: 'relative', background: '#0b0c0e', minHeight: '100vh' }}>
      <KamonBackground />
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '100px 24px 120px', position: 'relative', zIndex: 1 }}>
        <SectionLabel en={EN.faq.heading} />

        <div style={{ border: '0.5px solid #23272c' }}>
          {EN.faq.items.map((item, i) => (
            <div
              key={item.q}
              style={{
                padding: '28px 24px',
                borderBottom: i < EN.faq.items.length - 1 ? '0.5px solid #1b1f23' : 'none',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', marginBottom: '14px' }}>
                <span style={{ color: '#e23b2e', fontSize: '15px', fontFamily: SERIF, flexShrink: 0 }}>Q</span>
                <h2 style={{ fontSize: '16px', fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1.6, color: '#e9e7e1', margin: 0, fontFamily: SERIF }}>
                  {item.q}
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                <span style={{ color: '#828990', fontSize: '15px', fontFamily: SERIF, flexShrink: 0 }}>A</span>
                <p style={{ fontSize: '14px', lineHeight: 2.1, color: '#9aa0a6', letterSpacing: '0.01em', margin: 0, fontFamily: SERIF, fontStyle: 'italic' }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <p style={{ fontSize: '13px', color: '#9aa0a6', marginBottom: '28px', fontFamily: SERIF, fontStyle: 'italic' }}>
            Still have a question? We’re happy to help.
          </p>
          <Link
            href="/en/contact"
            style={{ display: 'inline-block', background: '#e23b2e', color: '#f7f1e6', padding: '14px 44px', fontSize: '12px', letterSpacing: '0.16em', textDecoration: 'none', fontFamily: SERIF }}
          >
            Get in Touch
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link href="/en" style={{ fontSize: '11px', color: '#828990', letterSpacing: '0.12em', textDecoration: 'none', fontFamily: SERIF, fontStyle: 'italic' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
