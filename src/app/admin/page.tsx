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
          color: '#f0ede6',
          marginBottom: '40px',
          fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
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
              background: '#111',
              border: `0.5px solid ${stat.highlight ? '#c9a84c' : '#2a2a2a'}`,
              padding: '24px',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: '#555',
                margin: '0 0 12px',
                fontFamily: 'Georgia, serif',
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: '32px',
                fontWeight: 300,
                color: stat.highlight ? '#c9a84c' : '#f0ede6',
                margin: 0,
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.05em',
              }}
            >
              {stat.value}
              <span style={{ fontSize: '12px', marginLeft: '4px', color: '#555' }}>{stat.unit}</span>
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
            color: '#555',
            marginBottom: '20px',
            fontFamily: 'Georgia, serif',
            fontWeight: 300,
          }}
        >
          RECENT INQUIRIES
        </h2>

        {!recentInquiries || recentInquiries.length === 0 ? (
          <p style={{ fontSize: '12px', color: '#444', fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif" }}>
            問い合わせはまだありません。
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {(recentInquiries as Inquiry[]).map((inq) => (
              <div
                key={inq.id}
                style={{
                  background: '#111',
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
                      color: '#f0ede6',
                      margin: '0 0 4px',
                      fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                      fontWeight: 300,
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
                    }}
                  >
                    {inq.email}
                  </p>
                </div>
                <StatusBadge status={inq.status} />
                <p
                  style={{
                    fontSize: '10px',
                    color: '#444',
                    margin: 0,
                    fontFamily: 'Georgia, serif',
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
    new: { label: '新規', color: '#c9a84c', bg: 'rgba(201,168,76,0.1)' },
    in_progress: { label: '対応中', color: '#6ea8fe', bg: 'rgba(110,168,254,0.1)' },
    done: { label: '完了', color: '#444', bg: 'transparent' },
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
        fontFamily: 'Georgia, serif',
        whiteSpace: 'nowrap',
      }}
    >
      {s.label}
    </span>
  );
}
