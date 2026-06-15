import type { Metadata } from 'next';
import Link from 'next/link';
import KamonBackground from '@/components/KamonBackground';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'For Buyers — Corporate & Wholesale',
  description:
    'Bulk orders for corporate gifts, novelties, wedding favors, and inbound souvenirs. Ask us about minimum lots, wholesale pricing, and lead times.',
};

const BUYER_MATERIALS = [
  { material: 'Metal (Brass / Stainless)', moq: 'From 10', note: 'Logo & crest engraving available' },
  { material: 'Genuine Leather', moq: 'From 10', note: 'Key holders, card cases, etc.' },
  { material: 'Glass / Acrylic', moq: 'From 20', note: 'For novelties & commemorative items' },
];

const FEATURES = [
  {
    title: 'Short Lead Times',
    body: 'Typically 2–3 weeks.\nPlease consult us on larger volumes.',
  },
  {
    title: 'Artwork Submission',
    body: 'We accept your own family crest\nand logo data for production.',
  },
  {
    title: 'Free Estimates',
    body: 'Tell us your quantity and specs,\nand we will quote at no charge.',
  },
];

export default function BuyerPage() {
  return (
    <div style={{ position: 'relative', background: '#0b0c0e', minHeight: '100vh' }}>
      <KamonBackground />
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '100px 24px 120px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionLabel en="For Buyers" ja="For Corporate & Wholesale Clients" />

        <p
          style={{
            fontSize: '13px',
            color: '#9aa0a6',
            lineHeight: 2.6,
            letterSpacing: '0.05em',
            textAlign: 'center',
            marginBottom: '80px',
            fontWeight: 300,
            fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
          }}
        >
          We welcome bulk-order inquiries for corporate novelties,
          <br />
          wedding favors, and inbound souvenir products.
          <br />
          Feel free to ask about minimum lots, wholesale pricing, and lead times.
        </p>

        {/* Materials table */}
        <div
          style={{
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: '#828990',
            marginBottom: '16px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          Materials / Minimum Lot
        </div>
        <div style={{ border: '0.5px solid #23272c', marginBottom: '64px' }}>
          {BUYER_MATERIALS.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px 1fr',
                padding: '16px 20px',
                borderBottom:
                  i < BUYER_MATERIALS.length - 1 ? '0.5px solid #1b1f23' : 'none',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#e9e7e1',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                {row.material}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#efece4',
                  textAlign: 'center',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {row.moq}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#828990',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                {row.note}
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '80px',
          }}
        >
          {FEATURES.map((item, i) => (
            <div key={i} style={{ border: '0.5px solid #23272c', padding: '24px 20px' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                  color: '#e9e7e1',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '0.5px solid #1b1f23',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#8b9298',
                  lineHeight: 1.9,
                  whiteSpace: 'pre-line',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                {item.body}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '1px',
              height: '48px',
              background: '#efece4',
              opacity: 0.3,
              margin: '0 auto 40px',
            }}
          />
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 300,
              letterSpacing: '0.1em',
              marginBottom: '12px',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
              color: '#e9e7e1',
            }}
          >
            Let&apos;s start with a conversation.
          </h2>
          <p
            style={{
              fontSize: '12px',
              color: '#8b9298',
              marginBottom: '40px',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            We will prepare an estimate based on your quantity, budget, and schedule.
          </p>
          <Link
            href="/en/contact?purpose=Corporate%20%26%20Bulk%20Order"
            style={{
              display: 'inline-block',
              background: '#efece4',
              color: '#0b0b0c',
              padding: '15px 48px',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontWeight: 300,
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            Corporate Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
