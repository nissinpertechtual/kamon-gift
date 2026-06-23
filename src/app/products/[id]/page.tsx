import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { ImageSlider } from '@/components/products/ImageSlider';
import { StickyContactBar } from '@/components/products/StickyContactBar';
import { BuyerQuoteForm } from '@/components/products/BuyerQuoteForm';
import KamonBackground from '@/components/KamonBackground';
import { SITE } from '@/lib/site';
import type { Product } from '@/types/supabase';

const MATERIAL_LABEL: Record<string, string> = {
  metal: '金属（真鍮・ステンレス）',
  leather: '本革',
  glass: 'クリスタルガラス',
  acrylic: 'アクリル',
};

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('name_ja, description_ja, images')
    .eq('id', id)
    .eq('is_published', true)
    .single();
  if (!data) return { title: '商品 | 家紋の彫刻室' };
  const title = `${data.name_ja} | 家紋の彫刻室`;
  const description =
    data.description_ja ?? `${data.name_ja} — レーザー彫刻による家紋ギフト。お見積もり・ご相談を承ります。`;
  const img = data.images?.[0];
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: img ? [img] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (!product) notFound();

  const p = product as Product;
  const hasPrice = p.price !== null;

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name_ja,
    description: p.description_ja ?? undefined,
    image: p.images?.length ? p.images : undefined,
    material: MATERIAL_LABEL[p.material] ?? p.material,
    brand: { '@type': 'Brand', name: SITE.name },
    ...(hasPrice
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'JPY',
            price: p.price,
            availability: 'https://schema.org/InStock',
            url: `${SITE.url}/products/${p.id}`,
          },
        }
      : {}),
  };

  return (
    <div style={{ position: 'relative', background: '#17181c', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <KamonBackground />

      {/* スマホ固定お問い合わせバー */}
      <StickyContactBar productName={p.name_ja} />

      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '100px 24px 140px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* 左: 画像スライダー */}
          <ImageSlider images={p.images ?? []} name={p.name_ja} />

          {/* 右: 商品情報 */}
          <div>
            {/* パンくず */}
            <div
              style={{
                fontSize: '9px',
                color: '#5d636a',
                letterSpacing: '0.15em',
                marginBottom: '24px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              <Link href="/products" style={{ color: '#828990', textDecoration: 'none' }}>
                商品一覧
              </Link>
              <span style={{ margin: '0 8px' }}>—</span>
              <span>{p.name_ja}</span>
            </div>

            {/* 商品名 */}
            <h1
              style={{
                fontSize: '22px',
                fontWeight: 300,
                letterSpacing: '0.1em',
                lineHeight: 1.7,
                color: '#e9e7e1',
                marginBottom: '20px',
                fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
              }}
            >
              {p.name_ja}
            </h1>

            {/* 素材バッジ */}
            <div
              style={{
                display: 'inline-block',
                border: '0.5px solid #2c3137',
                color: '#9aa0a6',
                fontSize: '9px',
                letterSpacing: '0.15em',
                padding: '4px 12px',
                marginBottom: '28px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {MATERIAL_LABEL[p.material] ?? p.material}
            </div>

            {/* 区切り線 */}
            <div
              style={{
                width: '40px',
                height: '0.5px',
                background: '#efece4',
                opacity: 0.4,
                marginBottom: '28px',
              }}
            />

            {/* 説明文 */}
            {p.description_ja && (
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 2.2,
                  color: '#9aa0a6',
                  letterSpacing: '0.05em',
                  marginBottom: '36px',
                  fontWeight: 300,
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                {p.description_ja}
              </p>
            )}

            {/* 価格 */}
            <div
              style={{
                marginBottom: '28px',
                padding: '18px 20px',
                border: '0.5px solid #2a2a26',
                background: '#202127',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  color: '#9a958b',
                  letterSpacing: '0.22em',
                  marginBottom: '10px',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                参考上代価格
              </div>
              {hasPrice ? (
                <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 8px' }}>
                  <span
                    style={{
                      fontSize: '34px',
                      color: '#f7f4ec',
                      fontWeight: 500,
                      letterSpacing: '0.02em',
                      lineHeight: 1,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    ¥{p.price!.toLocaleString()}
                    <span style={{ fontSize: '18px', marginLeft: '2px' }}>〜</span>
                  </span>
                  <span style={{ fontSize: '11px', color: '#9a958b' }}>（税込・参考上代）</span>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      fontSize: '24px',
                      color: '#f7f4ec',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                    }}
                  >
                    お見積もり
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#9a958b',
                      marginTop: '8px',
                      lineHeight: 1.8,
                      fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                    }}
                  >
                    家紋・仕様によって異なります。お気軽にご相談ください。
                  </div>
                </div>
              )}
            </div>

            {/* CTAボタン — お問い合わせ・お見積もり（EC無し） */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              <Link
                href={`/contact?product=${encodeURIComponent(p.name_ja)}`}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '15px',
                  background: '#efece4',
                  color: '#0b0b0c',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: 300,
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                  boxSizing: 'border-box',
                }}
              >
                この商品を相談・お見積もりする
              </Link>
            </div>

            {/* 安心ポイント */}
            <div
              style={{
                padding: '20px',
                border: '0.5px solid #23272c',
              }}
            >
              {[
                '注文確定後に制作を開始します',
                '納期の目安：約2〜3週間',
                'カスタム品は担当者が丁寧に対応',
              ].map((point) => (
                <div
                  key={point}
                  style={{
                    fontSize: '10px',
                    color: '#828990',
                    letterSpacing: '0.05em',
                    padding: '8px 0',
                    borderBottom: '0.5px solid #1b1f23',
                    display: 'flex',
                    gap: '10px',
                    fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  <span style={{ color: '#efece4', flexShrink: 0 }}>✓</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* バイヤー（卸）向け: 会社情報を入力すると下代を即時表示 */}
        <BuyerQuoteForm productId={p.id} productName={p.name_ja} />
      </div>
    </div>
  );
}
