'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EN } from '@/lib/i18n/translations';
import type { Product } from '@/types/supabase';

type ProductEn = Product & { name_en?: string | null };

export function EnProductCard({ product }: { product: ProductEn }) {
  const [hovered, setHovered] = useState(false);
  const name = product.name_en || product.name_ja;
  const mainImage = product.images?.[0] ?? null;
  const materialLabel =
    EN.products.materialLabels[product.material as keyof typeof EN.products.materialLabels] ??
    product.material;

  return (
    <Link href={`/en/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `0.5px solid ${hovered ? '#e23b2e' : '#2a2f35'}`,
          transition: 'border-color 0.4s',
          background: '#101417',
        }}
      >
        <div style={{ aspectRatio: '4/3', background: '#15181b', overflow: 'hidden' }}>
          {mainImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mainImage}
              alt={name}
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
                <circle cx="36" cy="36" r="28" fill="none" stroke="#e23b2e" strokeWidth="1" />
                <line x1="36" y1="8" x2="36" y2="64" stroke="#e23b2e" strokeWidth="0.8" />
                <line x1="8" y1="36" x2="64" y2="36" stroke="#e23b2e" strokeWidth="0.8" />
              </svg>
            </div>
          )}
        </div>
        <div style={{ padding: '16px 4px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 300,
              color: '#e9e7e1',
              paddingBottom: '10px',
              borderBottom: '0.5px solid #23272c',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              letterSpacing: '0.06em',
            }}
          >
            {name}
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
                color: '#828990',
                letterSpacing: '0.1em',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {materialLabel}
            </span>
            <span
              style={{
                fontSize: '11px',
                color: '#e23b2e',
                fontWeight: 300,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {product.price != null
                ? `¥${product.price.toLocaleString()}〜`
                : EN.products.estimateLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
