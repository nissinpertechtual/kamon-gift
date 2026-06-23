import Link from 'next/link';
import type { Metadata } from 'next';
import KamonBackground from '@/components/KamonBackground';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'よくある質問 | 家紋の彫刻室',
  description: '家紋が分からない場合のご相談方法、ご注文の流れ、納期、対応素材、お支払い方法など、よくいただくご質問にお答えします。',
};

const FAQS = [
  {
    q: '自分の家紋が分かりません。注文できますか？',
    a: '問題ございません。お名前やご出身地などの手がかりから、一緒にお調べするお手伝いをいたします。家紋画像をお持ちの場合は、お問い合わせフォームから画像をアップロードしてご相談ください。',
  },
  {
    q: '注文の流れを教えてください。',
    a: 'お問い合わせフォームから、ご希望の商品・家紋名・用途などをお送りください。担当者が内容を確認し、お見積もりとあわせてご連絡します。内容にご了承いただいた後に制作を開始します。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '制作期間の目安は1か月〜です。仕様や数量によって前後する場合がありますので、お急ぎの場合はお問い合わせ時にお知らせください。',
  },
  {
    q: '対応している素材は？',
    a: '金属、ガラス、アクリルなどにご対応しています。素材ごとに風合いや適した用途が異なりますので、迷われた際もお気軽にご相談ください。',
  },
  {
    q: '1個から注文できますか？',
    a: 'はい、1点からお作りいたします。結婚式の引き出物や企業ノベルティなど、まとめてのご注文（法人・卸売）にも対応しております。',
  },
  {
    q: 'お支払い方法は？',
    a: 'お見積もり内容をご確認いただいた後、担当者より個別にご案内いたします。詳細はお問い合わせの際にご相談ください。',
  },
  {
    q: '家紋のデータや画像は入稿できますか？',
    a: '家紋画像・ロゴデータの入稿に対応しています。お問い合わせフォームの画像アップロード欄からお送りいただけます。',
  },
  {
    q: '新規デザインやカスタムの費用はかかりますか？',
    a: '新規デザインについては別途デザイン費用が発生いたしますので、ご相談ください。家紋データや参考イメージをお持ちの場合は、お問い合わせ時にお送りいただけますとスムーズです。',
  },
];

export default function FaqPage() {
  return (
    <div style={{ position: 'relative', background: '#17181c', minHeight: '100vh' }}>
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
        <SectionLabel en="FAQ" ja="よくある質問" />

        <div style={{ border: '0.5px solid #23272c' }}>
          {FAQS.map((item, i) => (
            <div
              key={item.q}
              style={{
                padding: '28px 24px',
                borderBottom: i < FAQS.length - 1 ? '0.5px solid #1b1f23' : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'baseline',
                  marginBottom: '14px',
                }}
              >
                <span
                  style={{
                    color: '#efece4',
                    fontSize: '13px',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    flexShrink: 0,
                  }}
                >
                  Q
                </span>
                <h2
                  style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    letterSpacing: '0.06em',
                    lineHeight: 1.7,
                    color: '#e9e7e1',
                    margin: 0,
                    fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {item.q}
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                <span
                  style={{
                    color: '#828990',
                    fontSize: '13px',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    flexShrink: 0,
                  }}
                >
                  A
                </span>
                <p
                  style={{
                    fontSize: '12px',
                    lineHeight: 2.2,
                    color: '#9aa0a6',
                    letterSpacing: '0.04em',
                    margin: 0,
                    fontWeight: 300,
                    fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <p
            style={{
              fontSize: '12px',
              color: '#8b9298',
              marginBottom: '28px',
              fontWeight: 300,
              letterSpacing: '0.05em',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            解決しない場合は、お気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              background: '#efece4',
              color: '#0b0b0c',
              padding: '14px 44px',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              fontWeight: 300,
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            お問い合わせ・ご相談
          </Link>
        </div>
      </div>
    </div>
  );
}
