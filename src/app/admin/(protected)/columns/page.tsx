import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AdminColumnsPage() {
  const supabase = await createClient();
  const { data: columns } = await supabase
    .from('columns')
    .select('id, title_ja, slug, is_published, published_at, created_at')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <h1
          style={{
            fontSize: '18px',
            fontWeight: 300,
            letterSpacing: '0.1em',
            color: '#e9e7e1',
            fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            margin: 0,
          }}
        >
          コラム管理
        </h1>
        <Link
          href="/admin/columns/new"
          style={{
            background: '#efece4',
            color: '#0b0b0c',
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

      {(!columns || columns.length === 0) ? (
        <div
          style={{
            textAlign: 'center',
            color: '#5d636a',
            fontSize: '13px',
            padding: '80px 0',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          コラムがありません
        </div>
      ) : (
        <div style={{ border: '0.5px solid #2a2f35' }}>
          {/* ヘッダー行 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 180px 100px 120px 80px',
              padding: '10px 16px',
              borderBottom: '0.5px solid #2a2f35',
              background: '#15181b',
            }}
          >
            {['タイトル', 'スラッグ', '公開状態', '公開日', '操作'].map((h) => (
              <span
                key={h}
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  color: '#828990',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {columns.map((col, i) => (
            <div
              key={col.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 180px 100px 120px 80px',
                padding: '14px 16px',
                borderBottom: i < columns.length - 1 ? '0.5px solid #1b1f23' : 'none',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#e9e7e1',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  paddingRight: '12px',
                }}
              >
                {col.title_ja}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: '#8b9298',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  paddingRight: '12px',
                }}
              >
                {col.slug}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: col.is_published ? '#efece4' : '#5d636a',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {col.is_published ? '公開中' : '下書き'}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: '#828990',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {col.published_at
                  ? new Date(col.published_at).toLocaleDateString('ja-JP')
                  : '—'}
              </span>
              <Link
                href={`/admin/columns/${col.id}`}
                style={{
                  fontSize: '11px',
                  color: '#efece4',
                  textDecoration: 'none',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  letterSpacing: '0.05em',
                }}
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
