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
            color: '#f0ede6',
            margin: 0,
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
          }}
        >
          商品管理
        </h1>
        <Link
          href="/admin/products/new"
          style={{
            background: '#c9a84c',
            color: '#0a0a0a',
            padding: '8px 24px',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            fontWeight: 300,
            fontFamily: 'Georgia, serif',
          }}
        >
          ＋ 新規作成
        </Link>
      </div>

      {error && (
        <p style={{ fontSize: '12px', color: '#e05a5a', marginBottom: '24px' }}>
          データの取得に失敗しました: {error.message}
        </p>
      )}

      {!products || products.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', border: '0.5px solid #1a1a1a' }}>
          <p style={{ fontSize: '13px', color: '#444', fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif" }}>
            商品がありません。
          </p>
        </div>
      ) : (
        <div style={{ border: '0.5px solid #2a2a2a' }}>
          {/* ヘッダー行 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 120px 80px 80px 80px 80px',
              padding: '10px 16px',
              borderBottom: '0.5px solid #2a2a2a',
              background: '#111',
            }}
          >
            {['画像', '商品名', '価格', '素材', '公開', 'Sort', '操作'].map((h) => (
              <span key={h} style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#555', fontFamily: 'Georgia, serif' }}>
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
                borderBottom: i < products.length - 1 ? '0.5px solid #1a1a1a' : 'none',
                alignItems: 'center',
              }}
            >
              {/* サムネイル */}
              <div style={{ width: '48px', height: '36px', background: '#0d0d0d', overflow: 'hidden', flexShrink: 0 }}>
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '8px', color: '#333', fontFamily: 'Georgia, serif' }}>—</span>
                  </div>
                )}
              </div>

              {/* 商品名 */}
              <div style={{ paddingRight: '12px' }}>
                <div style={{ fontSize: '13px', color: '#f0ede6', fontWeight: 300, fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif", marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {product.name_ja || product.name}
                </div>
                <div style={{ fontSize: '10px', color: '#444', fontFamily: 'Georgia, serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {product.name}
                </div>
              </div>

              {/* 価格 */}
              <span style={{ fontSize: '12px', color: '#888', fontFamily: 'Georgia, serif' }}>
                {product.price != null ? `¥${product.price.toLocaleString()}` : 'お見積もり'}
              </span>

              {/* 素材 */}
              <span style={{ fontSize: '11px', color: '#555', fontFamily: 'Georgia, serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {product.material}
              </span>

              {/* 公開 */}
              <span style={{ fontSize: '10px', color: product.is_published ? '#c9a84c' : '#333', fontFamily: 'Georgia, serif' }}>
                {product.is_published ? '公開中' : '非公開'}
              </span>

              {/* sort_order */}
              <span style={{ fontSize: '11px', color: '#444', fontFamily: 'Georgia, serif' }}>
                {product.sort_order}
              </span>

              {/* 操作 */}
              <Link
                href={`/admin/products/${product.id}`}
                style={{ fontSize: '11px', color: '#c9a84c', textDecoration: 'none', fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}
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
