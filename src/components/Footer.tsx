import Link from 'next/link';

const KamonIconSmall = () => (
  <svg width="22" height="22" viewBox="0 0 72 72" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="36" cy="36" r="30" fill="none" stroke="#c9a84c" strokeWidth="1.2" />
    <circle cx="36" cy="36" r="18" fill="none" stroke="#c9a84c" strokeWidth="1" />
    <circle cx="36" cy="36" r="8"  fill="none" stroke="#c9a84c" strokeWidth="0.8" />
    <line x1="36" y1="6"  x2="36" y2="66" stroke="#c9a84c" strokeWidth="0.8" />
    <line x1="6"  y1="36" x2="66" y2="36" stroke="#c9a84c" strokeWidth="0.8" />
    <line x1="15" y1="15" x2="57" y2="57" stroke="#c9a84c" strokeWidth="0.6" />
    <line x1="57" y1="15" x2="15" y2="57" stroke="#c9a84c" strokeWidth="0.6" />
  </svg>
);

const footerLinks = [
  { label: '商品',                     href: '/products' },
  { label: 'ストーリー',               href: '/#story' },
  { label: 'コラム',                   href: '/column' },
  { label: 'よくある質問',             href: '/faq' },
  { label: '特定商取引法に基づく表記', href: '/legal' },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0a0a0a',
        borderTop: '0.5px solid #1e1e1e',
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px',
        }}
      >
        {/* 左：ロゴ + キャッチ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <KamonIconSmall />
            <span
              style={{
                color: '#c9a84c',
                fontSize: '13px',
                letterSpacing: '0.15em',
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              }}
            >
              家紋の彫刻室
            </span>
          </div>
          <p
            style={{
              color: '#555',
              fontSize: '11px',
              letterSpacing: '0.05em',
              margin: 0,
              lineHeight: '1.8',
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            }}
          >
            レーザー彫刻による
            <br />家紋ギフト専門店
          </p>
        </div>

        {/* 中：リンク */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: '#666',
                fontSize: '11px',
                letterSpacing: '0.05em',
                textDecoration: 'none',
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 右：問い合わせボタン */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <p
            style={{
              color: '#555',
              fontSize: '11px',
              letterSpacing: '0.05em',
              margin: 0,
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            }}
          >
            SNS・お問い合わせ
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              color: '#c9a84c',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              border: '0.5px solid #c9a84c',
              padding: '10px 20px',
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            }}
          >
            ご注文・お問い合わせ
          </Link>
        </div>
      </div>

      {/* コピーライト */}
      <div
        style={{
          borderTop: '0.5px solid #1e1e1e',
          marginTop: '24px',
          paddingTop: '16px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: '#444',
            fontSize: '10px',
            letterSpacing: '0.05em',
            margin: 0,
            fontFamily: 'Georgia, serif',
          }}
        >
          © Nisshin Partectual Co., Ltd.
        </p>
      </div>
    </footer>
  );
}
