import Link from 'next/link';
import KamonBackground from '@/components/KamonBackground';

export default function CheckoutSuccess() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <KamonBackground />
      <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
        {/* 家紋SVG */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 72 72"
          style={{ marginBottom: '32px', opacity: 0.55 }}
        >
          <circle cx="36" cy="36" r="30" fill="none" stroke="#c9a84c" strokeWidth="1" />
          <circle cx="36" cy="36" r="16" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
          <line x1="36" y1="6" x2="36" y2="66" stroke="#c9a84c" strokeWidth="0.8" />
          <line x1="6" y1="36" x2="66" y2="36" stroke="#c9a84c" strokeWidth="0.8" />
        </svg>

        <div
          style={{
            fontSize: '9px',
            letterSpacing: '0.35em',
            color: '#c9a84c',
            marginBottom: '24px',
            fontFamily: 'Georgia, serif',
          }}
        >
          THANK YOU
        </div>

        <h1
          style={{
            fontSize: '20px',
            fontWeight: 300,
            letterSpacing: '0.1em',
            marginBottom: '20px',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            color: '#f0ede6',
          }}
        >
          ご注文ありがとうございます
        </h1>

        <p
          style={{
            fontSize: '12px',
            color: '#666',
            lineHeight: 2.4,
            letterSpacing: '0.05em',
            marginBottom: '48px',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            fontWeight: 300,
          }}
        >
          ご注文を承りました。
          <br />
          制作開始のご連絡をメールにてお送りします。
          <br />
          納期の目安は約2〜3週間です。
        </p>

        {/* 区切り装飾 */}
        <div
          style={{
            width: '1px',
            height: '40px',
            background: '#c9a84c',
            opacity: 0.25,
            margin: '0 auto 32px',
          }}
        />

        <Link
          href="/"
          style={{
            display: 'inline-block',
            border: '0.5px solid #c9a84c',
            color: '#c9a84c',
            padding: '12px 40px',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textDecoration: 'none',
            fontFamily: 'Georgia, serif',
            transition: 'background 0.3s ease',
          }}
        >
          トップページへ
        </Link>
      </div>
    </div>
  );
}
