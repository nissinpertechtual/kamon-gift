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
          color: '#e9e7e1',
          marginBottom: '40px',
          fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
        }}
      >
        問い合わせ管理
      </h1>

      {error && (
        <p style={{ fontSize: '12px', color: '#ff6b5e', marginBottom: '24px' }}>
          データの取得に失敗しました: {error.message}
        </p>
      )}

      {!inquiries || inquiries.length === 0 ? (
        <div
          style={{
            padding: '60px',
            textAlign: 'center',
            border: '0.5px solid #1b1f23',
          }}
        >
          <p style={{ fontSize: '13px', color: '#5d636a', fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif" }}>
            問い合わせはまだありません。
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {(inquiries as Inquiry[]).map((inq) => (
            <div
              key={inq.id}
              style={{
                background: '#15181b',
                padding: '24px',
                borderLeft: inq.status === 'new' ? '2px solid #efece4' : '2px solid transparent',
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
                      color: '#e9e7e1',
                      margin: '0 0 4px',
                      fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                      fontWeight: 300,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {inq.name}
                  </p>
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#828990',
                      margin: 0,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
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
                      color: '#2c3137',
                      margin: 0,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
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
                  color: '#8b9298',
                  margin: 0,
                  lineHeight: 1.9,
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                  whiteSpace: 'pre-wrap',
                  borderTop: '0.5px solid #1b1f23',
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
