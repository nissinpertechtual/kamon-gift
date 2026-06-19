'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

const mincho =
  "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif";
const latin = "'Cormorant Garamond', Georgia, serif";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        ERROR
      </div>

      <h1
        style={{
          fontSize: '20px',
          fontWeight: 400,
          letterSpacing: '0.12em',
          margin: '0 0 16px',
        }}
      >
        エラーが発生しました
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
        お手数ですが、再読み込みをお試しください。
      </p>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          type="button"
          onClick={() => reset()}
          style={{
            display: 'inline-block',
            border: '0.5px solid #232320',
            background: 'transparent',
            color: '#efece4',
            padding: '13px 44px',
            fontSize: '11px',
            letterSpacing: '0.25em',
            cursor: 'pointer',
            fontFamily: latin,
          }}
        >
          再読み込み
        </button>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            border: '0.5px solid #232320',
            color: '#9a958b',
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
    </div>
  );
}
