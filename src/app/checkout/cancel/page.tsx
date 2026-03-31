import Link from 'next/link';
import KamonBackground from '@/components/KamonBackground';

export default function CheckoutCancel() {
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
        <div
          style={{
            fontSize: '9px',
            letterSpacing: '0.35em',
            color: '#444',
            marginBottom: '24px',
            fontFamily: 'Georgia, serif',
          }}
        >
          CANCELLED
        </div>

        <h1
          style={{
            fontSize: '18px',
            fontWeight: 300,
            letterSpacing: '0.1em',
            marginBottom: '16px',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            color: '#f0ede6',
          }}
        >
          決済をキャンセルしました
        </h1>

        <p
          style={{
            fontSize: '12px',
            color: '#555',
            lineHeight: 2,
            marginBottom: '40px',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            fontWeight: 300,
          }}
        >
          商品ページに戻って、もう一度お試しください。
        </p>

        <Link
          href="/products"
          style={{
            display: 'inline-block',
            border: '0.5px solid #333',
            color: '#888',
            padding: '12px 40px',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textDecoration: 'none',
            fontFamily: 'Georgia, serif',
          }}
        >
          商品一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
