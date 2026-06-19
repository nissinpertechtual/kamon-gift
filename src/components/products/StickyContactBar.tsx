import Link from 'next/link';

type Props = { productName: string; lang?: 'ja' | 'en' };

// スマホ用の固定お問い合わせバー（EC無し — 決済導線なし）
export function StickyContactBar({ productName, lang = 'ja' }: Props) {
  const isEn = lang === 'en';
  const href = `${isEn ? '/en/contact' : '/contact'}?product=${encodeURIComponent(productName)}`;
  const label = isEn ? 'Inquire / Request a Quote' : 'この商品を相談・お見積もり';

  return (
    <>
      {/* スマホのみ表示 */}
      <style>{`
        @media (min-width: 768px) {
          .sticky-contact-bar { display: none !important; }
        }
      `}</style>
      <div
        className="sticky-contact-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: '#17181c',
          borderTop: '0.5px solid #2a2f35',
          padding: '12px 16px',
        }}
      >
        <Link
          href={href}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '13px 8px',
            background: '#efece4',
            color: '#0b0b0c',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: 300,
            fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
          }}
        >
          {label}
        </Link>
      </div>
    </>
  );
}
