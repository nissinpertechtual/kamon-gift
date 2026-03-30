import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProductCard, type ProductItem } from './ProductCard';

// ─── モックデータ（Supabase接続後に差し替え） ────────────────────
const MOCK_PRODUCTS: ProductItem[] = [
  { id: '1', name_ja: '家紋刻印 真鍮プレート',      material: '真鍮',    images: [], price: null },
  { id: '2', name_ja: '家紋刻印 レザーキーホルダー',  material: '牛革',    images: [], price: null },
  { id: '3', name_ja: '家紋刻印 アクリルスタンド',   material: 'アクリル', images: [], price: null },
  { id: '4', name_ja: '家紋刻印 ガラスプレート',     material: 'ガラス',   images: [], price: null },
  { id: '5', name_ja: '家紋刻印 名刺入れ（革）',    material: '牛革',    images: [], price: null },
  { id: '6', name_ja: '家紋刻印 チャーム（金属）',   material: '真鍮',    images: [], price: null },
];
// ─────────────────────────────────────────────────────────────────

// TODO: Supabase接続後にこの関数を書き換える
async function fetchProducts(): Promise<ProductItem[]> {
  return MOCK_PRODUCTS;
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
