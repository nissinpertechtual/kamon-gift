import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ImageSlider } from '@/components/products/ImageSlider';
import { BuyButton } from '@/components/products/BuyButton';
import { CustomOrderButton } from '@/components/products/CustomOrderButton';
import { StickyBuyBar } from '@/components/products/StickyBuyBar';
import KamonBackground from '@/components/KamonBackground';
import type { Product } from '@/types/supabase';

const MATERIAL_LABEL: Record<string, string> = {
  metal: '金属（真鍮・ステンレス）',
  leather: '本革',
  glass: 'クリスタルガラス',
  acrylic: 'アクリル',
};

type Props = { params: Promise<{ id: string }> };

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

  return (
    <div style={{ position: 'relative', background: '#0a0a0a', minHeight: '100vh' }}>
      <KamonBackground />

      {/* スマホ固定購入バー */}
      <StickyBuyBar product={p} hasPrice={hasPrice} />

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
                color: '#444',
                letterSpacing: '0.15em',
                marginBottom: '24px',
                fontFamily: 'Georgia, serif',
              }}
            >
              <Link href="/products" style={{ color: '#555', textDecoration: 'none' }}>
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
                color: '#f0ede6',
                marginBottom: '20px',
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              }}
            >
              {p.name_ja}
            </h1>

            {/* 素材バッジ */}
            <div
              style={{
                display: 'inline-block',
                border: '0.5px solid #333',
                color: '#777',
                fontSize: '9px',
                letterSpacing: '0.15em',
                padding: '4px 12px',
                marginBottom: '28px',
                fontFamily: 'Georgia, serif',
              }}
            >
              {MATERIAL_LABEL[p.material] ?? p.material}
            </div>

            {/* 区切り線 */}
            <div
              style={{
                width: '40px',
                height: '0.5px',
                background: '#c9a84c',
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
                  color: '#888',
                  letterSpacing: '0.05em',
                  marginBottom: '36px',
                  fontWeight: 300,
                  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                }}
              >
                {p.description_ja}
              </p>
            )}

            {/* 価格 */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '9px',
                  color: '#555',
                  letterSpacing: '0.2em',
                  marginBottom: '8px',
                  fontFamily: 'Georgia, serif',
                }}
              >
                価格
              </div>
              {hasPrice ? (
                <div>
                  <span
                    style={{
                      fontSize: '24px',
                      color: '#c9a84c',
                      fontWeight: 300,
                      letterSpacing: '0.05em',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    ¥{p.price!.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '11px', color: '#555', marginLeft: '6px' }}>
                    （税込）
                  </span>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#c9a84c',
                      fontWeight: 300,
                      fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                    }}
                  >
                    お見積もり
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#555',
                      marginTop: '6px',
                      fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                    }}
                  >
                    家紋・仕様によって異なります。お気軽にご相談ください。
                  </div>
                </div>
              )}
            </div>

            {/* CTAボタン */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              {hasPrice && (
                <BuyButton
                  productId={p.id}
                  productName={p.name_ja}
                  price={p.price!}
                />
              )}
              <CustomOrderButton productName={p.name_ja} />
            </div>

            {/* 安心ポイント */}
            <div
              style={{
                padding: '20px',
                border: '0.5px solid #1e1e1e',
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
                    color: '#555',
                    letterSpacing: '0.05em',
                    padding: '8px 0',
                    borderBottom: '0.5px solid #1a1a1a',
                    display: 'flex',
                    gap: '10px',
                    fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                  }}
                >
                  <span style={{ color: '#c9a84c', flexShrink: 0 }}>✓</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
