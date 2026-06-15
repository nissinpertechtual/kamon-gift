import Link from 'next/link';
import KamonBackground from '@/components/KamonBackground';
import { SectionLabel } from '@/components/ui/SectionLabel';

const BUYER_MATERIALS = [
  { material: '金属（真鍮・ステンレス）', moq: '10個〜', note: 'ロゴ・社紋の刻印対応可' },
  { material: '本革', moq: '10個〜', note: 'キーホルダー・名刺入れ等' },
  { material: 'ガラス・アクリル', moq: '20個〜', note: 'ノベルティ・記念品向け' },
];

const FEATURES = [
  {
    title: '短納期対応',
    body: '通常2〜3週間。\nまとまった数量もご相談ください。',
  },
  {
    title: 'デザイン入稿対応',
    body: '家紋データ・ロゴデータの\n入稿に対応します。',
  },
  {
    title: '見積もり無料',
    body: '数量・仕様をお知らせいただければ\n無料でお見積もりします。',
  },
];

export default function BuyerPage() {
  return (
    <div style={{ position: 'relative', background: '#0b0c0e', minHeight: '100vh' }}>
      <KamonBackground />
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '100px 24px 120px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionLabel en="FOR BUYERS" ja="法人・卸売のご担当者様へ" />

        <p
          style={{
            fontSize: '13px',
            color: '#9aa0a6',
            lineHeight: 2.6,
            letterSpacing: '0.05em',
            textAlign: 'center',
            marginBottom: '80px',
            fontWeight: 300,
            fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
          }}
        >
          企業ノベルティ・引き出物・インバウンド向け土産品など、
          <br />
          まとめ発注のご相談を承っております。
          <br />
          最小ロット・卸価格・納期はお気軽にお問い合わせください。
        </p>

        {/* 素材テーブル */}
        <div
          style={{
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: '#828990',
            marginBottom: '16px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          対応素材 / 最小ロット
        </div>
        <div style={{ border: '0.5px solid #23272c', marginBottom: '64px' }}>
          {BUYER_MATERIALS.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px 1fr',
                padding: '16px 20px',
                borderBottom:
                  i < BUYER_MATERIALS.length - 1 ? '0.5px solid #1b1f23' : 'none',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#e9e7e1',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                {row.material}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#e23b2e',
                  textAlign: 'center',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {row.moq}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#828990',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                {row.note}
              </div>
            </div>
          ))}
        </div>

        {/* 特徴カード */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '80px',
          }}
        >
          {FEATURES.map((item, i) => (
            <div key={i} style={{ border: '0.5px solid #23272c', padding: '24px 20px' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                  color: '#e9e7e1',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '0.5px solid #1b1f23',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#8b9298',
                  lineHeight: 1.9,
                  whiteSpace: 'pre-line',
                  fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                {item.body}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '1px',
              height: '48px',
              background: '#e23b2e',
              opacity: 0.3,
              margin: '0 auto 40px',
            }}
          />
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 300,
              letterSpacing: '0.1em',
              marginBottom: '12px',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
              color: '#e9e7e1',
            }}
          >
            まずはお気軽にご相談ください。
          </h2>
          <p
            style={{
              fontSize: '12px',
              color: '#8b9298',
              marginBottom: '40px',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            数量・予算・納期など、詳細はご相談の上お見積もりいたします。
          </p>
          <Link
            href="/contact?purpose=%E6%B3%95%E4%BA%BA%E3%83%BB%E3%81%BE%E3%81%A8%E3%82%81%E7%99%BA%E6%B3%A8"
            style={{
              display: 'inline-block',
              background: '#e23b2e',
              color: '#f6f1e7',
              padding: '15px 48px',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontWeight: 300,
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            法人向けお問い合わせ
          </Link>
        </div>
      </div>
    </div>
  );
}
