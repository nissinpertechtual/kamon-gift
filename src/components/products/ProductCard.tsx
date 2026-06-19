'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/types/supabase';

const MATERIAL_LABEL: Record<string, string> = {
  metal: '金属',
  leather: '革',
  glass: 'ガラス',
  acrylic: 'アクリル',
};

export function ProductCard({ product }: { product: Product }) {
  const mainImage = product.images?.[0] ?? null;
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `0.5px solid ${hovered ? '#efece4' : '#2a2f35'}`,
          overflow: 'hidden',
          transition: 'border-color 0.4s ease',
          cursor: 'pointer',
          background: '#202127',
        }}
      >
        {/* 画像 */}
        <div
          style={{
            aspectRatio: '4/3',
            background: '#202127',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name_ja}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s ease',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
              }}
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
              <svg width="40" height="40" viewBox="0 0 72 72" style={{ opacity: 0.12 }}>
                <circle cx="36" cy="36" r="28" fill="none" stroke="#efece4" strokeWidth="1" />
                <circle cx="36" cy="36" r="14" fill="none" stroke="#efece4" strokeWidth="0.8" />
                <line x1="36" y1="8" x2="36" y2="64" stroke="#efece4" strokeWidth="0.8" />
                <line x1="8" y1="36" x2="64" y2="36" stroke="#efece4" strokeWidth="0.8" />
              </svg>
            </div>
          )}
        </div>

        {/* テキスト */}
        <div style={{ padding: '16px 4px 4px' }}>
          <div
            style={{
              fontSize: '12px',
              letterSpacing: '0.08em',
              fontWeight: 300,
              color: '#e9e7e1',
              paddingBottom: '10px',
              borderBottom: '0.5px solid #23272c',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            {product.name_ja}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
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
              {MATERIAL_LABEL[product.material] ?? product.material}
            </span>
            <span
              style={{
                fontSize: '19px',
                color: '#f5f2ea',
                fontWeight: 500,
                letterSpacing: '0.02em',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {product.price != null
                ? `¥${product.price.toLocaleString()}〜`
                : 'お見積もり'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
