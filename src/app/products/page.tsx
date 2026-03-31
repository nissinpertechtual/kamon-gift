import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ProductCard } from '@/components/products/ProductCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import KamonBackground from '@/components/KamonBackground';
import type { Product } from '@/types/supabase';

type Props = {
  searchParams: Promise<{ scene?: string; material?: string }>;
};

const SCENE_FILTERS = [
  { value: '', label: 'すべて' },
  { value: 'oshi', label: '推し活' },
  { value: 'bridal', label: 'ブライダル' },
  { value: 'inbound', label: '訪日外国人向け' },
  { value: 'corporate', label: '法人・ギフト' },
];

const MATERIAL_FILTERS = [
  { value: '', label: 'すべての素材' },
  { value: 'metal', label: '金属' },
  { value: 'leather', label: '革' },
  { value: 'glass', label: 'ガラス' },
  { value: 'acrylic', label: 'アクリル' },
];

const filterLinkStyle = (isActive: boolean, gold = false) => ({
  fontSize: gold ? '10px' : '9px',
  letterSpacing: '0.1em',
  padding: gold ? '6px 16px' : '4px 12px',
  border: `0.5px solid ${isActive ? (gold ? '#c9a84c' : '#888') : gold ? '#333' : '#222'}`,
  color: isActive ? (gold ? '#c9a84c' : '#aaa') : gold ? '#666' : '#444',
  textDecoration: 'none',
  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
  fontWeight: 300 as const,
  transition: 'all 0.3s',
  display: 'inline-block',
});

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (params.scene) query = query.eq('scene', params.scene);
  if (params.material) query = query.eq('material', params.material);

  const { data: products, error } = await query;

  return (
    <div style={{ position: 'relative', background: '#0a0a0a', minHeight: '100vh' }}>
      <KamonBackground />
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '100px 24px 80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionLabel en="PRODUCTS" ja="商品一覧" />

        {/* シーンフィルター */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          {SCENE_FILTERS.map((f) => {
            const isActive = (params.scene ?? '') === f.value;
            const href =
              f.value
                ? `/products?scene=${f.value}${params.material ? `&material=${params.material}` : ''}`
                : `/products${params.material ? `?material=${params.material}` : ''}`;
            return (
              <Link key={f.value} href={href} style={filterLinkStyle(isActive, true)}>
                {f.label}
              </Link>
            );
          })}
        </div>

        {/* 素材フィルター */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '56px',
          }}
        >
          {MATERIAL_FILTERS.map((f) => {
            const isActive = (params.material ?? '') === f.value;
            const href =
              f.value
                ? `/products?material=${f.value}${params.scene ? `&scene=${params.scene}` : ''}`
                : `/products${params.scene ? `?scene=${params.scene}` : ''}`;
            return (
              <Link key={f.value} href={href} style={filterLinkStyle(isActive, false)}>
                {f.label}
              </Link>
            );
          })}
        </div>

        {/* エラー表示 */}
        {error && (
          <p style={{ textAlign: 'center', color: '#e05a5a', fontSize: '12px', marginBottom: '32px' }}>
            商品の取得に失敗しました。
          </p>
        )}

        {/* 商品グリッド */}
        {!products || products.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: '#444',
              fontSize: '13px',
              padding: '80px 0',
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            }}
          >
            該当する商品がありません
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
