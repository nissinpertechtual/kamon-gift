'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SectionLabel } from '@/components/ui/SectionLabel';

// ─── モックデータ（Supabase接続後に差し替え） ────────────────────
const MOCK_PRODUCTS = [
  { id: '1', name_ja: '家紋刻印 真鍮プレート',      material: '真鍮',    images: [] as string[], price: null },
  { id: '2', name_ja: '家紋刻印 レザーキーホルダー',  material: '牛革',    images: [] as string[], price: null },
  { id: '3', name_ja: '家紋刻印 アクリルスタンド',   material: 'アクリル', images: [] as string[], price: null },
  { id: '4', name_ja: '家紋刻印 ガラスプレート',     material: 'ガラス',   images: [] as string[], price: null },
  { id: '5', name_ja: '家紋刻印 名刺入れ（革）',    material: '牛革',    images: [] as string[], price: null },
  { id: '6', name_ja: '家紋刻印 チャーム（金属）',   material: '真鍮',    images: [] as string[], price: null },
];
// ─────────────────────────────────────────────────────────────────

// TODO: Supabase接続後にこの関数を書き換える
async function fetchProducts() {
  return MOCK_PRODUCTS;
}

const KamonPlaceholder = () => (
  <svg width="48" height="48" viewBox="0 0 72 72" fill="none" aria-hidden="true" style={{ opacity: 0.25 }}>
    <circle cx="36" cy="36" r="30" stroke="#c9a84c" strokeWidth="1.2" />
    <circle cx="36" cy="36" r="18" stroke="#c9a84c" strokeWidth="1" />
    <circle cx="36" cy="36" r="8"  stroke="#c9a84c" strokeWidth="0.8" />
    <line x1="36" y1="6"  x2="36" y2="66" stroke="#c9a84c" strokeWidth="0.8" />
    <line x1="6"  y1="36" x2="66" y2="36" stroke="#c9a84c" strokeWidth="0.8" />
    <line x1="15" y1="15" x2="57" y2="57" stroke="#c9a84c" strokeWidth="0.6" />
    <line x1="57" y1="15" x2="15" y2="57" stroke="#c9a84c" strokeWidth="0.6" />
  </svg>
);

type Product = typeof MOCK_PRODUCTS[number];

function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<string[]>(product.images);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleGenerate = async (e: React.MouseEvent) => {
    e.preventDefault(); // Linkへの伝播を止める
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate/product-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name_ja,
          material: product.material,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'エラーが発生しました');
      setImages((prev) => [json.imageUrl, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const mainImage = images[0] ?? null;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
        <div className="product-card" style={{ transition: 'border-color 0.4s ease' }}>
          {/* 画像エリア — aspect-ratio 4/3 */}
          <div
            style={{
              aspectRatio: '4/3',
              background: '#111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {mainImage ? (
              <>
                <Image
                  src={mainImage}
                  alt={product.name_ja}
                  fill
                  className="product-image"
                  style={{ objectFit: 'cover' }}
                />
                {/* AI SAMPLE バッジ */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(10,10,10,0.75)',
                    border: '0.5px solid #c9a84c',
                    color: '#c9a84c',
                    fontSize: '9px',
                    letterSpacing: '0.15em',
                    padding: '3px 8px',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 300,
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  AI SAMPLE
                </div>
              </>
            ) : (
              <div
                className="product-image"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
              >
                <KamonPlaceholder />
              </div>
            )}
          </div>

          {/* テキストエリア */}
          <div style={{ padding: '16px 4px' }}>
            {/* 商品名 */}
            <p
              style={{
                fontSize: '12px',
                letterSpacing: '0.08em',
                fontWeight: 300,
                color: '#f0ede6',
                margin: '0 0 8px',
                paddingBottom: '8px',
                borderBottom: '0.5px solid #1e1e1e',
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              }}
            >
              {product.name_ja}
            </p>

            {/* 価格 */}
            <p
              style={{
                fontSize: '11px',
                color: '#c9a84c',
                margin: '8px 0 0',
                fontWeight: 300,
                fontFamily: 'Georgia, serif',
              }}
            >
              {product.price == null
                ? 'お見積もり'
                : `¥${Number(product.price).toLocaleString()}〜`}
            </p>
          </div>
        </div>
      </Link>

      {/* AI 画像生成ボタン（カードの外、リンク外） */}
      <div style={{ marginTop: '8px' }}>
        {error && (
          <p
            style={{
              fontSize: '10px',
              color: '#e07070',
              marginBottom: '4px',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.04em',
            }}
          >
            {error}
          </p>
        )}
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            display: 'block',
            width: '100%',
            background: 'transparent',
            border: '0.5px solid #333',
            color: loading ? '#444' : '#888',
            padding: '8px',
            fontSize: '10px',
            letterSpacing: '0.15em',
            fontWeight: 300,
            cursor: loading ? 'default' : 'pointer',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            transition: 'border-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.borderColor = '#c9a84c';
              e.currentTarget.style.color = '#c9a84c';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#333';
            e.currentTarget.style.color = loading ? '#444' : '#888';
          }}
        >
          {loading ? '生成中…' : 'AI 画像を生成'}
        </button>
      </div>
    </div>
  );
}

export default async function ProductGallery() {
  const products = await fetchProducts();

  return (
    <section style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        <SectionLabel en="PRODUCTS" ja="商品" />

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              border: '0.5px solid #c9a84c',
              color: '#c9a84c',
              padding: '12px 44px',
              fontSize: '11px',
              letterSpacing: '0.2em',
              fontWeight: 300,
              textDecoration: 'none',
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              transition: 'background 0.3s ease',
            }}
          >
            すべての商品を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
