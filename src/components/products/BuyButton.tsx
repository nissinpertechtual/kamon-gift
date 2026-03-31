'use client';

import { useState } from 'react';

type Props = {
  productId: string;
  productName: string;
  price: number;
};

export function BuyButton({ productId, productName, price }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, productName, price }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error ?? '不明なエラー');
      }
    } catch (e) {
      alert(`決済の開始に失敗しました。\n${e instanceof Error ? e.message : ''}`);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      style={{
        width: '100%',
        padding: '15px',
        background: loading ? '#1a1a1a' : '#c9a84c',
        color: loading ? '#444' : '#0a0a0a',
        border: 'none',
        fontSize: '12px',
        letterSpacing: '0.25em',
        cursor: loading ? 'wait' : 'pointer',
        fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
        fontWeight: 300,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (!loading) e.currentTarget.style.opacity = '0.85';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      {loading ? '決済ページへ移動中...' : `購入する — ¥${price.toLocaleString()}`}
    </button>
  );
}
