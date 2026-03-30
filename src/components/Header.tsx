'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import KamonBackground from './KamonBackground';

const KamonIcon = () => (
  <svg width="28" height="28" viewBox="0 0 72 72" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="36" cy="36" r="30" fill="none" stroke="#c9a84c" strokeWidth="1.2" />
    <circle cx="36" cy="36" r="18" fill="none" stroke="#c9a84c" strokeWidth="1" />
    <circle cx="36" cy="36" r="8"  fill="none" stroke="#c9a84c" strokeWidth="0.8" />
    <line x1="36" y1="6"  x2="36" y2="66" stroke="#c9a84c" strokeWidth="0.8" />
    <line x1="6"  y1="36" x2="66" y2="36" stroke="#c9a84c" strokeWidth="0.8" />
    <line x1="15" y1="15" x2="57" y2="57" stroke="#c9a84c" strokeWidth="0.6" />
    <line x1="57" y1="15" x2="15" y2="57" stroke="#c9a84c" strokeWidth="0.6" />
  </svg>
);

const navLinks = [
  { label: '商品',   href: '/products' },
  { label: 'ストーリー', href: '/#story' },
  { label: 'コラム', href: '/column' },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: '#0a0a0a',
          borderBottom: '0.5px solid rgba(201,168,76,0.25)',
          overflow: 'hidden',
        }}
      >
        {/* 背景家紋パターン（薄め） */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none' }}>
          <KamonBackground />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* ロゴ */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <KamonIcon />
            <span
              style={{
                color: '#c9a84c',
                fontSize: '15px',
                letterSpacing: '0.15em',
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              }}
            >
              家紋の彫刻室
            </span>
          </Link>

          {/* PC ナビ */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: '#f0ede6',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  opacity: 0.85,
                  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* EN ボタン */}
            <Link
              href="/en"
              style={{
                color: '#c9a84c',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                border: '0.5px solid #c9a84c',
                padding: '4px 12px',
              }}
            >
              EN
            </Link>

            {/* 法人・卸売 */}
            <Link
              href="/buyer"
              style={{
                color: '#555',
                fontSize: '9px',
                letterSpacing: '0.05em',
                textDecoration: 'none',
                border: '0.5px solid #333',
                padding: '4px 10px',
                whiteSpace: 'nowrap',
              }}
            >
              法人・卸売の方はこちら →
            </Link>
          </nav>

          {/* ハンバーガー（モバイル） */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="show-mobile"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#c9a84c',
              padding: '4px',
            }}
            aria-label="メニューを開く"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* モバイルドロワー */}
      {drawerOpen && (
        <>
          {/* オーバーレイ */}
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 45,
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}
          />

          {/* ドロワー本体 */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              width: '260px',
              backgroundColor: '#0a0a0a',
              borderLeft: '0.5px solid rgba(201,168,76,0.25)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
          >
            {/* 閉じるボタン */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#c9a84c',
                  padding: '4px',
                }}
                aria-label="メニューを閉じる"
              >
                <X size={22} />
              </button>
            </div>

            {/* ナビリンク */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    color: '#f0ede6',
                    fontSize: '15px',
                    letterSpacing: '0.1em',
                    textDecoration: 'none',
                    fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                  }}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/en"
                onClick={() => setDrawerOpen(false)}
                style={{
                  color: '#c9a84c',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  border: '0.5px solid #c9a84c',
                  padding: '6px 14px',
                  display: 'inline-block',
                  width: 'fit-content',
                }}
              >
                EN
              </Link>

              <Link
                href="/buyer"
                onClick={() => setDrawerOpen(false)}
                style={{
                  color: '#555',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  border: '0.5px solid #333',
                  padding: '6px 12px',
                  display: 'inline-block',
                  width: 'fit-content',
                }}
              >
                法人・卸売の方はこちら →
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
