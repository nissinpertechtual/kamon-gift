'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/types/supabase';

type Props = { product: Product; hasPrice: boolean };

export function StickyBuyBar({ product, hasPrice }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    if (!hasPrice) {
      window.location.href = `/contact?product=${encodeURIComponent(product.name_ja)}`;
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name_ja,
          price: product.price,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <>
      {/* スマホのみ表示 */}
      <style>{`
        @media (min-width: 768px) {
          .sticky-buy-bar { display: none !important; }
        }
      `}</style>
      <div
        className="sticky-buy-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: '#0a0a0a',
          borderTop: '0.5px solid #2a2a2a',
          padding: '12px 16px',
          display: 'flex',
          gap: '10px',
        }}
      >
        {/* カスタム注文 */}
        <Link
          href={`/contact?product=${encodeURIComponent(product.name_ja)}`}
          style={{
            flex: 1,
            padding: '12px 8px',
            background: 'transparent',
            color: '#c9a84c',
            border: '0.5px solid #c9a84c',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textAlign: 'center',
            textDecoration: 'none',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          カスタム注文
        </Link>

        {/* 購入 or お見積もり */}
        <button
          onClick={handleBuy}
          disabled={loading}
          style={{
            flex: 2,
            padding: '12px 8px',
            background: loading ? '#1a1a1a' : '#c9a84c',
            color: loading ? '#444' : '#0a0a0a',
            border: 'none',
            fontSize: '10px',
            letterSpacing: '0.1em',
            cursor: loading ? 'wait' : 'pointer',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            fontWeight: 300,
            transition: 'background 0.3s ease',
          }}
        >
          {loading
            ? '移動中...'
            : hasPrice
              ? `購入する — ¥${product.price!.toLocaleString()}`
              : 'お見積もりを相談する'}
        </button>
      </div>
    </>
  );
}
