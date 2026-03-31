import { createClient } from '@/lib/supabase/server';
import InquiryStatusSelect from '@/components/admin/InquiryStatusSelect';
import type { Inquiry } from '@/types/supabase';

export default async function AdminInquiriesPage() {
  const supabase = await createClient();
  const { data: inquiries, error } = await supabase
    .from('inquiries')
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
        問い合わせ管理
      </h1>

      {error && (
        <p style={{ fontSize: '12px', color: '#e05a5a', marginBottom: '24px' }}>
          データの取得に失敗しました: {error.message}
        </p>
      )}

      {!inquiries || inquiries.length === 0 ? (
        <div
          style={{
            padding: '60px',
            textAlign: 'center',
            border: '0.5px solid #1a1a1a',
          }}
        >
          <p style={{ fontSize: '13px', color: '#444', fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif" }}>
            問い合わせはまだありません。
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {(inquiries as Inquiry[]).map((inq) => (
            <div
              key={inq.id}
              style={{
                background: '#111',
                padding: '24px',
                borderLeft: inq.status === 'new' ? '2px solid #c9a84c' : '2px solid transparent',
              }}
            >
              {/* ヘッダー行 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#f0ede6',
                      margin: '0 0 4px',
                      fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                      fontWeight: 300,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {inq.name}
                  </p>
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#555',
                      margin: 0,
                      fontFamily: 'Georgia, serif',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {inq.email}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <InquiryStatusSelect inquiryId={inq.id} currentStatus={inq.status} />
                  <p
                    style={{
                      fontSize: '10px',
                      color: '#333',
                      margin: 0,
                      fontFamily: 'Georgia, serif',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {new Date(inq.created_at).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* メッセージ本文 */}
              <p
                style={{
                  fontSize: '12px',
                  color: '#666',
                  margin: 0,
                  lineHeight: 1.9,
                  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                  whiteSpace: 'pre-wrap',
                  borderTop: '0.5px solid #1a1a1a',
                  paddingTop: '12px',
                }}
              >
                {inq.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
