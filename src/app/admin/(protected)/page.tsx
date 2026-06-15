import { createClient } from '@/lib/supabase/server';
import type { Inquiry } from '@/types/supabase';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // 各テーブルのカウントと最近の問い合わせを並列取得
  const [
    { count: productCount },
    { count: inquiryCount },
    { count: newInquiryCount },
    { data: recentInquiries },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: '商品数', value: productCount ?? 0, unit: '点' },
    { label: '問い合わせ総数', value: inquiryCount ?? 0, unit: '件' },
    { label: '未対応', value: newInquiryCount ?? 0, unit: '件', highlight: (newInquiryCount ?? 0) > 0 },
  ];

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
        ダッシュボード
      </h1>

      {/* 統計カード */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '48px',
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#15181b',
              border: `0.5px solid ${stat.highlight ? '#e23b2e' : '#2a2f35'}`,
              padding: '24px',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: '#828990',
                margin: '0 0 12px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: '32px',
                fontWeight: 300,
                color: stat.highlight ? '#e23b2e' : '#e9e7e1',
                margin: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: '0.05em',
              }}
            >
              {stat.value}
              <span style={{ fontSize: '12px', marginLeft: '4px', color: '#828990' }}>{stat.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* 最近の問い合わせ */}
      <div>
        <h2
          style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            color: '#828990',
            marginBottom: '20px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
          }}
        >
          RECENT INQUIRIES
        </h2>

        {!recentInquiries || recentInquiries.length === 0 ? (
          <p style={{ fontSize: '12px', color: '#5d636a', fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif" }}>
            問い合わせはまだありません。
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {(recentInquiries as Inquiry[]).map((inq) => (
              <div
                key={inq.id}
                style={{
                  background: '#15181b',
                  padding: '16px 20px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto',
                  gap: '16px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#e9e7e1',
                      margin: '0 0 4px',
                      fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                      fontWeight: 300,
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
                    }}
                  >
                    {inq.email}
                  </p>
                </div>
                <StatusBadge status={inq.status} />
                <p
                  style={{
                    fontSize: '10px',
                    color: '#5d636a',
                    margin: 0,
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    whiteSpace: 'nowrap',
                  }}
                >
                  {new Date(inq.created_at).toLocaleDateString('ja-JP')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Inquiry['status'] }) {
  const map = {
    new: { label: '新規', color: '#e23b2e', bg: 'rgba(226,59,46,0.1)' },
    in_progress: { label: '対応中', color: '#6aa0ff', bg: 'rgba(110,168,254,0.1)' },
    done: { label: '完了', color: '#5d636a', bg: 'transparent' },
  };
  const s = map[status] ?? map.new;
  return (
    <span
      style={{
        fontSize: '9px',
        letterSpacing: '0.08em',
        color: s.color,
        background: s.bg,
        border: `0.5px solid ${s.color}`,
        padding: '3px 10px',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        whiteSpace: 'nowrap',
      }}
    >
      {s.label}
    </span>
  );
}
