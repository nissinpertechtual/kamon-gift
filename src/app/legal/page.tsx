import KamonBackground from '@/components/KamonBackground';

const items = [
  { label: '販売業者名', value: 'ニッシン・パーテクチュアル株式会社' },
  { label: '代表者名', value: '中村稔' },
  { label: '所在地', value: '埼玉県春日部市' },
  { label: '電話番号', value: '048-754-6511' },
  { label: 'メールアドレス', value: 'noreply@kamongift.com' },
  { label: '販売価格', value: '各商品ページに記載の価格（税込）' },
  { label: '支払方法', value: 'クレジットカード（Visa / Mastercard / American Express / JCB）' },
  { label: '引渡時期', value: '注文確定後、2〜3週間以内に発送いたします。カスタム品は別途ご相談ください。' },
  { label: '返品・キャンセルについて', value: 'カスタム彫刻品は受注製作のため、原則としてご注文確定後のキャンセル・返品はお受けできません。商品に不備があった場合は到着後7日以内にご連絡ください。' },
];

export default function LegalPage() {
  return (
    <div style={{ position: 'relative', background: '#0a0a0a', minHeight: '100vh' }}>
      <KamonBackground />
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '100px 24px 120px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* タイトル */}
        <div style={{ marginBottom: '64px' }}>
          <p
            style={{
              fontSize: '9px',
              letterSpacing: '0.35em',
              color: '#c9a84c',
              marginBottom: '16px',
              fontFamily: 'Georgia, serif',
            }}
          >
            LEGAL
          </p>
          <h1
            style={{
              fontSize: 'clamp(22px, 4vw, 30px)',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: '#f0ede6',
              margin: 0,
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            }}
          >
            特定商取引法に基づく表記
          </h1>
        </div>

        {/* テーブル */}
        <div style={{ border: '0.5px solid #1e1e1e' }}>
          {items.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                borderBottom: i < items.length - 1 ? '0.5px solid #1a1a1a' : 'none',
              }}
            >
              <div
                style={{
                  padding: '20px 24px',
                  background: '#0e0e0e',
                  borderRight: '0.5px solid #1a1a1a',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: '#666',
                  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                  fontWeight: 300,
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  padding: '20px 28px',
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  color: '#c8c4bc',
                  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* 戻るリンク */}
        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <a
            href="/"
            style={{
              fontSize: '10px',
              color: '#555',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontFamily: 'Georgia, serif',
            }}
          >
            ← トップページへ戻る
          </a>
        </div>
      </div>
    </div>
  );
}
