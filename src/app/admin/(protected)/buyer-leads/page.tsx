import { getBuyerLeads } from '@/lib/buyer';

const MINCHO = "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif";
const LATIN = "'Cormorant Garamond', Georgia, serif";

// このページは (protected) レイアウトで認証済み。下代・リードは service-role で取得。
export default async function AdminBuyerLeadsPage() {
  const leads = await getBuyerLeads();

  return (
    <div>
      <h1
        style={{
          fontSize: '18px',
          fontWeight: 300,
          letterSpacing: '0.1em',
          color: '#e9e7e1',
          marginBottom: '40px',
          fontFamily: MINCHO,
        }}
      >
        バイヤー見積もり依頼
      </h1>

      {leads.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', border: '0.5px solid #1b1f23' }}>
          <p style={{ fontSize: '13px', color: '#5d636a', fontFamily: MINCHO }}>
            まだ依頼はありません。
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {leads.map((lead) => (
            <div key={lead.id} style={{ background: '#202127', padding: '24px' }}>
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
                  <p style={{ fontSize: '14px', color: '#e9e7e1', margin: '0 0 4px', fontFamily: MINCHO, fontWeight: 300, letterSpacing: '0.06em' }}>
                    {lead.company}
                    <span style={{ fontSize: '11px', color: '#828990', marginLeft: '10px' }}>{lead.contact_name}</span>
                  </p>
                  <p style={{ fontSize: '11px', color: '#828990', margin: 0, fontFamily: LATIN, letterSpacing: '0.04em' }}>
                    {lead.email}{lead.phone ? ` ・ ${lead.phone}` : ''}
                  </p>
                </div>
                <p style={{ fontSize: '10px', color: '#2c3137', margin: 0, fontFamily: LATIN, whiteSpace: 'nowrap' }}>
                  {new Date(lead.created_at).toLocaleString('ja-JP', {
                    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  flexWrap: 'wrap',
                  borderTop: '0.5px solid #1b1f23',
                  paddingTop: '12px',
                  fontSize: '12px',
                  color: '#9aa0a6',
                  fontFamily: MINCHO,
                }}
              >
                <span>商品: <span style={{ color: '#cfcabf' }}>{lead.product_name ?? '—'}</span></span>
                <span>想定数量: <span style={{ color: '#cfcabf' }}>{lead.expected_quantity != null ? `${lead.expected_quantity}個` : '—'}</span></span>
              </div>

              {lead.message && (
                <p
                  style={{
                    fontSize: '12px',
                    color: '#8b9298',
                    margin: '12px 0 0',
                    lineHeight: 1.9,
                    fontFamily: MINCHO,
                    fontWeight: 300,
                    letterSpacing: '0.04em',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {lead.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
