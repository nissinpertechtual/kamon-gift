import Link from 'next/link';
import type { Metadata } from 'next';
import KamonBackground from '@/components/KamonBackground';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Legal / Commercial Disclosure | Kamon Engraving Atelier',
  description:
    'Legal notice and commercial disclosure for ' +
    SITE.legalName +
    ' — business details, ordering, payment, delivery and returns.',
};

const items = [
  { label: 'Seller', value: SITE.legalName },
  { label: 'Representative', value: 'Minoru Nakamura' },
  {
    label: 'Address',
    value: SITE.addressLocality + ', ' + SITE.addressRegion + ', Japan',
  },
  { label: 'Telephone', value: SITE.tel },
  { label: 'Email', value: SITE.email },
  {
    label: 'Pricing',
    value:
      'Reference prices (tax included) are shown on each product page. Final amounts are confirmed by individual quotation.',
  },
  {
    label: 'How to order',
    value:
      'Inquiries and quotation requests are accepted through the contact form. Online payment is not available.',
  },
  {
    label: 'Additional fees',
    value:
      'Shipping fees and bank transfer charges (at payment) may apply. New or custom designs incur a separate design fee. Details are confirmed at the time of quotation.',
  },
  {
    label: 'Payment',
    value:
      'After you confirm the quotation, our staff will guide you through payment individually.',
  },
  {
    label: 'Delivery',
    value:
      'Items are shipped from approximately 1 month after the order is confirmed. Please contact us separately for custom pieces.',
  },
  {
    label: 'Returns & cancellations',
    value:
      'Custom-engraved pieces are made to order, so cancellations and returns after order confirmation cannot be accepted in principle. If an item is defective, please contact us within 7 days of arrival.',
  },
];

export default function EnLegalPage() {
  return (
    <div style={{ position: 'relative', background: '#17181c', minHeight: '100vh' }}>
      <KamonBackground />
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '100px 24px 120px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Title */}
        <div style={{ marginBottom: '64px' }}>
          <SectionLabel en="Legal" align="left" />
          <h1
            style={{
              fontSize: 'clamp(22px, 4vw, 30px)',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: '#efece4',
              margin: '16px 0 0',
              fontFamily:
                "'Cormorant Garamond', 'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            }}
          >
            Legal / Commercial Disclosure
          </h1>
        </div>

        {/* Table */}
        <div style={{ border: '0.5px solid #232320' }}>
          {items.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                borderBottom: i < items.length - 1 ? '0.5px solid #232320' : 'none',
              }}
            >
              <div
                style={{
                  padding: '20px 24px',
                  background: '#202127',
                  borderRight: '0.5px solid #232320',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: '#9a958b',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 400,
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  padding: '20px 28px',
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                  color: '#efece4',
                  fontFamily:
                    "'Cormorant Garamond', 'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <Link
            href="/en"
            style={{
              fontSize: '10px',
              color: '#9a958b',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            ← Back to top
          </Link>
        </div>
      </div>
    </div>
  );
}
