import Link from 'next/link';
import KamonBackground from '@/components/KamonBackground';

const items = [
  { label: '販売業者名', value: 'ニッシン・パーテクチュアル株式会社' },
  { label: '代表者名', value: '中村稔' },
  { label: '所在地', value: '埼玉県春日部市' },
  { label: '電話番号', value: '048-754-6511' },
  { label: 'メールアドレス', value: 'noreply@kamongift.com' },
  { label: '販売価格', value: '各商品ページに参考価格を税込で記載しています。最終金額はお見積もりにてご案内します。' },
  { label: 'お申し込み方法', value: 'お問い合わせフォームよりご相談・お見積もり依頼を承ります（オンライン決済には対応しておりません）。' },
  { label: '商品代金以外の必要料金', value: '送料、振込手数料（お支払い時）。詳細はお見積もり時にご案内します。' },
  { label: '支払方法', value: 'お見積もり内容のご確認後、担当者より個別にご案内いたします。' },
  { label: '引渡時期', value: 'ご注文確定後、約2〜3週間以内に発送いたします。カスタム品は別途ご相談ください。' },
  { label: '返品・キャンセルについて', value: 'カスタム彫刻品は受注製作のため、原則としてご注文確定後のキャンセル・返品はお受けできません。商品に不備があった場合は到着後7日以内にご連絡ください。' },
];

export default function LegalPage() {
  return (
    <div style={{ position: 'relative', background: '#f4f0e7', minHeight: '100vh' }}>
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
              color: '#a3282b',
              marginBottom: '16px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            LEGAL
          </p>
          <h1
            style={{
              fontSize: 'clamp(22px, 4vw, 30px)',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: '#2a2620',
              margin: 0,
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            特定商取引法に基づく表記
          </h1>
        </div>

        {/* テーブル */}
        <div style={{ border: '0.5px solid #ddd6c6' }}>
          {items.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                borderBottom: i < items.length - 1 ? '0.5px solid #e4ded0' : 'none',
              }}
            >
              <div
                style={{
                  padding: '20px 24px',
                  background: '#fbf9f3',
                  borderRight: '0.5px solid #e4ded0',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: '#766d5f',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
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
                  color: '#4a443a',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
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
          <Link
            href="/"
            style={{
              fontSize: '10px',
              color: '#857c6d',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            ← トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
