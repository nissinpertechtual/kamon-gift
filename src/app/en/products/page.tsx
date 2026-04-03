import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { EN } from '@/lib/i18n/translations';
import { SectionLabel } from '@/components/ui/SectionLabel';
import KamonBackground from '@/components/KamonBackground';
import type { Product } from '@/types/supabase';

export default async function EnProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  return (
    <div style={{ position: 'relative', background: '#0a0a0a', minHeight: '100vh' }}>
      <KamonBackground />
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '100px 24px 120px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionLabel en="PRODUCTS" />

        {(!products || products.length === 0) ? (
          <div
            style={{
              textAlign: 'center',
              color: '#444',
              fontSize: '13px',
              padding: '80px 0',
              fontFamily: 'Georgia, serif',
            }}
          >
            No products available yet.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
              marginTop: '56px',
            }}
          >
            {(products as Product[]).map((product) => (
              <Link
                key={product.id}
                href={`/en/products/${product.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    border: '0.5px solid #2a2a2a',
                    transition: 'border-color 0.4s',
                    background: '#0d0d0d',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#c9a84c')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
                >
                  <div
                    style={{ aspectRatio: '4/3', background: '#111', overflow: 'hidden' }}
                  >
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name_ja}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="40" height="40" viewBox="0 0 72 72" style={{ opacity: 0.15 }}>
                          <circle cx="36" cy="36" r="28" fill="none" stroke="#c9a84c" strokeWidth="1" />
                          <line x1="36" y1="8" x2="36" y2="64" stroke="#c9a84c" strokeWidth="0.8" />
                          <line x1="8" y1="36" x2="64" y2="36" stroke="#c9a84c" strokeWidth="0.8" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '16px 4px' }}>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 300,
                        color: '#f0ede6',
                        paddingBottom: '10px',
                        borderBottom: '0.5px solid #1e1e1e',
                        fontFamily: 'Georgia, serif',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {(product as Product & { name_en?: string }).name_en ?? product.name_ja}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '8px',
                        paddingBottom: '12px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '9px',
                          color: '#555',
                          letterSpacing: '0.1em',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        {EN.products.materialLabels[
                          product.material as keyof typeof EN.products.materialLabels
                        ] ?? product.material}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#c9a84c',
                          fontWeight: 300,
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        {product.price != null
                          ? `¥${product.price.toLocaleString()}`
                          : EN.products.estimateLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
