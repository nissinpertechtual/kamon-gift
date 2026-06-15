import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/types/supabase';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '18px',
            fontWeight: 300,
            letterSpacing: '0.1em',
            color: '#2a2620',
            margin: 0,
            fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
          }}
        >
          商品管理
        </h1>
        <Link
          href="/admin/products/new"
          style={{
            background: '#a3282b',
            color: '#f6f1e7',
            padding: '8px 24px',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            fontWeight: 300,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          ＋ 新規作成
        </Link>
      </div>

      {error && (
        <p style={{ fontSize: '12px', color: '#b3261e', marginBottom: '24px' }}>
          データの取得に失敗しました: {error.message}
        </p>
      )}

      {!products || products.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', border: '0.5px solid #e4ded0' }}>
          <p style={{ fontSize: '13px', color: '#9b9384', fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif" }}>
            商品がありません。
          </p>
        </div>
      ) : (
        <div style={{ border: '0.5px solid #d3cab5' }}>
          {/* ヘッダー行 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 120px 80px 80px 80px 80px',
              padding: '10px 16px',
              borderBottom: '0.5px solid #d3cab5',
              background: '#e7e0d2',
            }}
          >
            {['画像', '商品名', '価格', '素材', '公開', 'Sort', '操作'].map((h) => (
              <span key={h} style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#857c6d', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {h}
              </span>
            ))}
          </div>

          {(products as Product[]).map((product, i) => (
            <div
              key={product.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 120px 80px 80px 80px 80px',
                padding: '12px 16px',
                borderBottom: i < products.length - 1 ? '0.5px solid #e4ded0' : 'none',
                alignItems: 'center',
              }}
            >
              {/* サムネイル */}
              <div style={{ width: '48px', height: '36px', background: '#fbf9f3', overflow: 'hidden', flexShrink: 0 }}>
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '8px', color: '#c6bca6', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>—</span>
                  </div>
                )}
              </div>

              {/* 商品名 */}
              <div style={{ paddingRight: '12px' }}>
                <div style={{ fontSize: '13px', color: '#2a2620', fontWeight: 300, fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif", marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {product.name_ja || product.name}
                </div>
                <div style={{ fontSize: '10px', color: '#9b9384', fontFamily: "'Cormorant Garamond', Georgia, serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {product.name}
                </div>
              </div>

              {/* 価格 */}
              <span style={{ fontSize: '12px', color: '#6f675a', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {product.price != null ? `¥${product.price.toLocaleString()}` : 'お見積もり'}
              </span>

              {/* 素材 */}
              <span style={{ fontSize: '11px', color: '#857c6d', fontFamily: "'Cormorant Garamond', Georgia, serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {product.material}
              </span>

              {/* 公開 */}
              <span style={{ fontSize: '10px', color: product.is_published ? '#a3282b' : '#c6bca6', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {product.is_published ? '公開中' : '非公開'}
              </span>

              {/* sort_order */}
              <span style={{ fontSize: '11px', color: '#9b9384', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {product.sort_order}
              </span>

              {/* 操作 */}
              <Link
                href={`/admin/products/${product.id}`}
                style={{ fontSize: '11px', color: '#a3282b', textDecoration: 'none', fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.05em' }}
              >
                編集
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
