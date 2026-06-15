import { createClient } from '@/lib/supabase/server';
import { SectionLabel } from '@/components/ui/SectionLabel';
import KamonBackground from '@/components/KamonBackground';
import { EnProductCard } from '@/components/products/EnProductCard';
import type { Product } from '@/types/supabase';

export default async function EnProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  return (
    <div style={{ position: 'relative', background: '#0b0c0e', minHeight: '100vh' }}>
      <KamonBackground />
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '100px 24px 120px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionLabel en="PRODUCTS" />

        {(!products || products.length === 0) ? (
          <div
            style={{
              textAlign: 'center',
              color: '#5d636a',
              fontSize: '13px',
              padding: '80px 0',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            No products available yet.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
              marginTop: '56px',
            }}
          >
            {(products as Product[]).map((product) => (
              <EnProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
