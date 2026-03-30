'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ─── モックデータ（Supabase接続後に差し替え） ────────────────────
const MOCK_PRODUCTS = [
  { id: '1', name_ja: '家紋刻印 真鍮プレート',     material: '真鍮',   images: [] as string[], price: null },
  { id: '2', name_ja: '家紋刻印 レザーキーホルダー', material: '牛革',   images: [] as string[], price: null },
  { id: '3', name_ja: '家紋刻印 アクリルスタンド',  material: 'アクリル', images: [] as string[], price: null },
  { id: '4', name_ja: '家紋刻印 ガラスプレート',    material: 'ガラス',  images: [] as string[], price: null },
  { id: '5', name_ja: '家紋刻印 名刺入れ（革）',   material: '牛革',   images: [] as string[], price: null },
  { id: '6', name_ja: '家紋刻印 チャーム（金属）',  material: '真鍮',   images: [] as string[], price: null },
];
// ─────────────────────────────────────────────────────────────────

// TODO: Supabase接続後にこの関数を書き換える
async function fetchProducts() {
  // const supabase = createClient()
  // const { data } = await supabase
  //   .from('products')
  //   .select('id, name_ja, material, images, price')
  //   .eq('is_featured', true)
  //   .eq('is_published', true)
  //   .order('sort_order')
  //   .limit(6)
  // return data ?? MOCK_PRODUCTS
  return MOCK_PRODUCTS;
}

// 家紋プレースホルダーSVG
const KamonPlaceholder = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 72 72"
    fill="none"
    aria-hidden="true"
    style={{ opacity: 0.3 }}
  >
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
  const [hovered, setHovered] = useState(false);

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

  return (
    <Link
      href={`/products/${product.id}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `0.5px solid ${hovered ? '#c9a84c' : '#2a2a2a'}`,
          background: '#1a1a1a',
          transition: 'border-color 0.3s ease, opacity 0.7s ease, transform 0.7s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          cursor: 'pointer',
        }}
      >
        {/* 画像エリア */}
        <div
          style={{
            aspectRatio: '1/1',
            background: '#111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name_ja}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <KamonPlaceholder />
          )}
        </div>

        {/* テキストエリア */}
        <div style={{ padding: '12px' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.05em',
              color: '#f0ede6',
              margin: '0 0 6px',
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            }}
          >
            {product.name_ja}
          </p>

          {/* 素材バッジ */}
          <span
            style={{
              fontSize: '9px',
              border: '0.5px solid #333',
              color: '#666',
              padding: '2px 8px',
              display: 'inline-block',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.05em',
            }}
          >
            {product.material}
          </span>

          {/* 価格 */}
          <p
            style={{
              fontSize: '10px',
              color: '#888',
              margin: '4px 0 0',
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
  );
}

export default async function ProductGallery() {
  const products = await fetchProducts();

  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* セクションラベル */}
        <p
          style={{
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: '#c9a84c',
            textAlign: 'center',
            marginBottom: '40px',
            fontFamily: 'Georgia, serif',
          }}
        >
          PRODUCTS
        </p>

        {/* 商品グリッド */}
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* すべての商品を見るボタン */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              border: '0.5px solid #c9a84c',
              color: '#c9a84c',
              padding: '12px 40px',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              transition: 'background 0.2s ease',
            }}
          >
            すべての商品を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
