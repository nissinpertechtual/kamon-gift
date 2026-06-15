import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types/supabase';

export default async function ProductGallery() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .limit(6);

  const products = (data ?? []) as Product[];

  return (
    <section style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        <SectionLabel en="PRODUCTS" ja="商品" />

        {products.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: '#5d636a',
              fontSize: '13px',
              padding: '40px 0 8px',
              letterSpacing: '0.08em',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            商品は準備中です
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              border: '0.5px solid #e23b2e',
              color: '#e23b2e',
              padding: '12px 44px',
              fontSize: '11px',
              letterSpacing: '0.2em',
              fontWeight: 300,
              textDecoration: 'none',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
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
