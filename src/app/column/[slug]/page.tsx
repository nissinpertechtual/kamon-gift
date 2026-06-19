import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import KamonBackground from '@/components/KamonBackground';

type Props = { params: Promise<{ slug: string }> };

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: column } = await supabase
    .from('columns')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!column) notFound();

  return (
    <div style={{ position: 'relative', background: '#17181c', minHeight: '100vh' }}>
      <KamonBackground />
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '100px 24px 120px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* パンくず */}
        <div
          style={{
            fontSize: '9px',
            color: '#5d636a',
            letterSpacing: '0.15em',
            marginBottom: '48px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          <Link href="/column" style={{ color: '#828990', textDecoration: 'none' }}>
            コラム
          </Link>
          <span style={{ margin: '0 8px' }}>—</span>
          <span>{column.title_ja}</span>
        </div>

        {/* 日付 */}
        <div
          style={{
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: '#828990',
            marginBottom: '20px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          {new Date(column.created_at).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        {/* タイトル */}
        <h1
          style={{
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: 300,
            letterSpacing: '0.1em',
            lineHeight: 1.7,
            color: '#e9e7e1',
            marginBottom: '48px',
            fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
          }}
        >
          {column.title_ja}
        </h1>

        {/* サムネイル */}
        {column.thumbnail && (
          <div style={{ marginBottom: '48px' }}>
            <img
              src={column.thumbnail}
              alt={column.title_ja}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}

        {/* 区切り線 */}
        <div
          style={{
            width: '40px',
            height: '0.5px',
            background: '#efece4',
            opacity: 0.4,
            marginBottom: '48px',
          }}
        />

        {/* 本文 */}
        <div
          style={{
            fontSize: '14px',
            lineHeight: 2.5,
            color: '#9aa0a6',
            letterSpacing: '0.05em',
            fontWeight: 300,
            whiteSpace: 'pre-wrap',
            fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
          }}
        >
          {column.body_ja}
        </div>

        {/* 商品CTA */}
        <div
          style={{
            marginTop: '80px',
            padding: '32px',
            border: '0.5px solid #23272c',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: '#efece4',
              marginBottom: '16px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            PRODUCTS
          </div>
          <p
            style={{
              fontSize: '12px',
              color: '#8b9298',
              lineHeight: 2,
              marginBottom: '24px',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            家紋をギフトに刻みませんか。
          </p>
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              border: '0.5px solid #efece4',
              color: '#efece4',
              padding: '11px 32px',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            商品を見る
          </Link>
        </div>

        {/* 戻るリンク */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link
            href="/column"
            style={{
              fontSize: '10px',
              color: '#828990',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            ← コラム一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
