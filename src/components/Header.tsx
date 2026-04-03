'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const JA_NAV = [
  { label: '商品',      href: '/products' },
  { label: 'ストーリー', href: '/#story' },
  { label: 'コラム',    href: '/column' },
];

const EN_NAV = [
  { label: 'Products', href: '/en/products' },
  { label: 'Story',    href: '/en#story' },
  { label: 'Contact',  href: '/en/contact' },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');

  const navLinks = isEn ? EN_NAV : JA_NAV;
  const logoHref = isEn ? '/en' : '/';
  const langHref = isEn ? '/' : '/en';
  const langLabel = isEn ? 'JP' : 'EN';
  const buyerLabel = isEn ? 'For Buyers →' : '法人・卸売の方はこちら →';
  const buyerHref = '/buyer';

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
        {/* 背景家紋パターン */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none' }}>
          <KamonBackground />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 32px',
            height: '72px',           /* 修正: 60→72px */
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* ロゴ */}
          <Link
            href={logoHref}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',            /* 修正: 10→14px */
              textDecoration: 'none',
            }}
          >
            <KamonIcon />
            <span
              style={{
                color: '#c9a84c',
                fontSize: '15px',
                letterSpacing: '0.2em',  /* 修正: 0.15→0.2em */
                fontWeight: 300,          /* 追加 */
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
              gap: '32px',             /* 修正: 28→32px */
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}

            {/* 言語切替ボタン */}
            <Link
              href={langHref}
              style={{
                color: '#c9a84c',
                fontSize: '11px',
                letterSpacing: '0.15em',
                fontWeight: 300,
                textDecoration: 'none',
                border: '0.5px solid #c9a84c',
                padding: '4px 12px',
                transition: 'background 0.3s ease',
              }}
            >
              {langLabel}
            </Link>

            {/* 法人・卸売（右端に視覚的に分離） */}
            <Link
              href={buyerHref}
              style={{
                color: '#555',
                fontSize: '9px',
                letterSpacing: '0.05em',
                fontWeight: 300,
                textDecoration: 'none',
                border: '0.5px solid #333',
                padding: '4px 10px',
                whiteSpace: 'nowrap',
                paddingLeft: '32px',    /* 修正: 右端に寄せ */
                borderLeft: 'none',
                transition: 'color 0.3s ease',
              }}
            >
              {buyerLabel}
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
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* モバイルドロワー */}
      {drawerOpen && (
        <>
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 45,
              backgroundColor: 'rgba(0,0,0,0.75)',
            }}
          />

          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              width: '260px',
              backgroundColor: '#0a0a0a',
              borderLeft: '0.5px solid rgba(201,168,76,0.2)',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c', padding: '4px' }}
                aria-label="メニューを閉じる"
              >
                <X size={20} />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    color: '#f0ede6',
                    fontSize: '14px',
                    letterSpacing: '0.12em',
                    fontWeight: 300,
                    textDecoration: 'none',
                    fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                  }}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href={langHref}
                onClick={() => setDrawerOpen(false)}
                style={{
                  color: '#c9a84c',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  fontWeight: 300,
                  textDecoration: 'none',
                  border: '0.5px solid #c9a84c',
                  padding: '6px 14px',
                  display: 'inline-block',
                  width: 'fit-content',
                }}
              >
                {langLabel}
              </Link>

              <Link
                href={buyerHref}
                onClick={() => setDrawerOpen(false)}
                style={{
                  color: '#555',
                  fontSize: '10px',
                  letterSpacing: '0.05em',
                  fontWeight: 300,
                  textDecoration: 'none',
                  border: '0.5px solid #2a2a2a',
                  padding: '6px 12px',
                  display: 'inline-block',
                  width: 'fit-content',
                }}
              >
                {buyerLabel}
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
