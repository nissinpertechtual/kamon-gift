import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { SectionLabel } from '@/components/ui/SectionLabel';
import KamonBackground from '@/components/KamonBackground';

export default async function ColumnPage() {
  const supabase = await createClient();
  const { data: columns } = await supabase
    .from('columns')
    .select('id, slug, title_ja, thumbnail, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <div style={{ position: 'relative', background: '#0a0a0a', minHeight: '100vh' }}>
      <KamonBackground />
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '100px 24px 120px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionLabel en="COLUMN" ja="コラム" />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {(!columns || columns.length === 0) && (
            <div
              style={{
                textAlign: 'center',
                color: '#444',
                fontSize: '13px',
                padding: '80px 0',
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              }}
            >
              記事はまだありません
            </div>
          )}

          {columns?.map((col) => (
            <Link
              key={col.id}
              href={`/column/${col.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '24px',
                  padding: '28px 0',
                  borderBottom: '0.5px solid #1e1e1e',
                  alignItems: 'center',
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.65')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {/* サムネイル */}
                <div
                  style={{
                    width: '120px',
                    height: '80px',
                    background: '#111',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {col.thumbnail ? (
                    <img
                      src={col.thumbnail}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="32" height="32" viewBox="0 0 72 72" style={{ opacity: 0.15 }}>
                        <circle cx="36" cy="36" r="28" fill="none" stroke="#c9a84c" strokeWidth="1" />
                        <line x1="36" y1="8" x2="36" y2="64" stroke="#c9a84c" strokeWidth="0.8" />
                        <line x1="8" y1="36" x2="64" y2="36" stroke="#c9a84c" strokeWidth="0.8" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* テキスト */}
                <div>
                  <div
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.15em',
                      color: '#555',
                      marginBottom: '10px',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {new Date(col.created_at).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 300,
                      letterSpacing: '0.08em',
                      color: '#f0ede6',
                      lineHeight: 1.7,
                      fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                    }}
                  >
                    {col.title_ja}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
