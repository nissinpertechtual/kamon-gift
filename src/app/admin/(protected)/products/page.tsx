import { createClient } from '@/lib/supabase/server';
import ProductAdminCard from '@/components/admin/ProductAdminCard';
import type { Product } from '@/types/supabase';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1
        style={{
          fontSize: '18px',
          fontWeight: 300,
          letterSpacing: '0.1em',
          color: '#f0ede6',
          marginBottom: '40px',
          fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
        }}
      >
        商品管理
      </h1>

      {error && (
        <p style={{ fontSize: '12px', color: '#e05a5a', marginBottom: '24px' }}>
          データの取得に失敗しました: {error.message}
        </p>
      )}

      {!products || products.length === 0 ? (
        <div
          style={{
            padding: '60px',
            textAlign: 'center',
            border: '0.5px solid #1a1a1a',
          }}
        >
          <p style={{ fontSize: '13px', color: '#444', fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif" }}>
            商品がありません。
          </p>
          <p style={{ fontSize: '11px', color: '#333', marginTop: '8px', fontFamily: 'Georgia, serif' }}>
            Supabase の products テーブルに商品を追加してください。
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {(products as Product[]).map((product) => (
            <ProductAdminCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
