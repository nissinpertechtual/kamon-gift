import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ImageSlider } from '@/components/products/ImageSlider';
import { StickyContactBar } from '@/components/products/StickyContactBar';
import KamonBackground from '@/components/KamonBackground';
import { EN } from '@/lib/i18n/translations';
import type { Product } from '@/types/supabase';

type ProductEn = Product & { name_en?: string | null; description_en?: string | null };

type Props = { params: Promise<{ id: string }> };

export default async function EnProductDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (!product) notFound();

  const p = product as ProductEn;
  const name = p.name_en || p.name_ja;
  const description = p.description_en || p.description_ja;
  const hasPrice = p.price !== null;
  const materialLabel =
    EN.products.materialLabels[p.material as keyof typeof EN.products.materialLabels] ?? p.material;

  return (
    <div style={{ position: 'relative', background: '#0b0c0e', minHeight: '100vh' }}>
      <KamonBackground />

      {/* Mobile sticky contact bar */}
      <StickyContactBar productName={name} lang="en" />

      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '100px 24px 140px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Image */}
          <ImageSlider images={p.images ?? []} name={name} />

          {/* Info */}
          <div>
            {/* Breadcrumb */}
            <div
              style={{
                fontSize: '9px',
                color: '#5d636a',
                letterSpacing: '0.15em',
                marginBottom: '24px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              <Link href="/en/products" style={{ color: '#828990', textDecoration: 'none' }}>
                PRODUCTS
              </Link>
              <span style={{ margin: '0 8px' }}>—</span>
              <span>{name}</span>
            </div>

            {/* Name */}
            <h1
              style={{
                fontSize: '22px',
                fontWeight: 300,
                letterSpacing: '0.08em',
                lineHeight: 1.7,
                color: '#e9e7e1',
                marginBottom: '20px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {name}
            </h1>

            {/* Material badge */}
            <div
              style={{
                display: 'inline-block',
                border: '0.5px solid #2c3137',
                color: '#9aa0a6',
                fontSize: '9px',
                letterSpacing: '0.15em',
                padding: '4px 12px',
                marginBottom: '28px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {materialLabel}
            </div>

            {/* Divider */}
            <div
              style={{
                width: '40px',
                height: '0.5px',
                background: '#e23b2e',
                opacity: 0.4,
                marginBottom: '28px',
              }}
            />

            {/* Description */}
            {description && (
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 2.2,
                  color: '#9aa0a6',
                  letterSpacing: '0.04em',
                  marginBottom: '36px',
                  fontWeight: 300,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {description}
              </p>
            )}

            {/* Price (reference) */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '9px',
                  color: '#828990',
                  letterSpacing: '0.2em',
                  marginBottom: '8px',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                REFERENCE PRICE
              </div>
              {hasPrice ? (
                <div>
                  <span
                    style={{
                      fontSize: '24px',
                      color: '#e23b2e',
                      fontWeight: 300,
                      letterSpacing: '0.05em',
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    ¥{p.price!.toLocaleString()}〜
                  </span>
                  <span style={{ fontSize: '11px', color: '#828990', marginLeft: '6px' }}>
                    (tax incl.)
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    fontSize: '16px',
                    color: '#e23b2e',
                    fontWeight: 300,
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {EN.products.estimateLabel}
                </div>
              )}
            </div>

            {/* CTA — contact / quote */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              <Link
                href={`/en/contact?product=${encodeURIComponent(name)}`}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '15px',
                  background: '#e23b2e',
                  color: '#f6f1e7',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: 300,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  boxSizing: 'border-box',
                }}
              >
                Inquire / Request a Quote
              </Link>
            </div>

            {/* Reassurance */}
            <div style={{ padding: '20px', border: '0.5px solid #23272c' }}>
              {[
                'Production begins after your order is confirmed',
                'Typical lead time: about 2–3 weeks',
                'Custom orders are handled personally by our team',
              ].map((point) => (
                <div
                  key={point}
                  style={{
                    fontSize: '10px',
                    color: '#828990',
                    letterSpacing: '0.04em',
                    padding: '8px 0',
                    borderBottom: '0.5px solid #1b1f23',
                    display: 'flex',
                    gap: '10px',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  <span style={{ color: '#e23b2e', flexShrink: 0 }}>✓</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
