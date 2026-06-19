import Link from 'next/link';
import Logo from '@/components/Logo';

const mincho =
  "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif";
const latin = "'Cormorant Garamond', Georgia, serif";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#17181c',
        color: '#efece4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        fontFamily: mincho,
      }}
    >
      <Logo size={40} color="#615d55" />

      <div
        style={{
          fontSize: '11px',
          letterSpacing: '0.4em',
          color: '#615d55',
          fontFamily: latin,
          margin: '40px 0 20px',
        }}
      >
        404
      </div>

      <h1
        style={{
          fontSize: '20px',
          fontWeight: 400,
          letterSpacing: '0.12em',
          margin: '0 0 16px',
        }}
      >
        ページが見つかりません
      </h1>

      <p
        style={{
          fontSize: '13px',
          color: '#9a958b',
          lineHeight: 2,
          fontWeight: 400,
          margin: '0 0 44px',
        }}
      >
        お探しのページは移動または削除された可能性があります。
      </p>

      <Link
        href="/"
        style={{
          display: 'inline-block',
          border: '0.5px solid #232320',
          color: '#efece4',
          padding: '13px 44px',
          fontSize: '11px',
          letterSpacing: '0.25em',
          textDecoration: 'none',
          fontFamily: latin,
        }}
      >
        トップへ戻る
      </Link>
    </div>
  );
}
