'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import KamonBackground from './KamonBackground';
import Logo from './Logo';
import { SITE } from '@/lib/site';

const JA_NAV = [
  { label: '商品',      href: '/products' },
  { label: 'ストーリー', href: '/#story' },
  { label: 'コラム',    href: '/column' },
];

const EN_NAV = [
  { label: 'Products', href: '/en/products' },
  { label: 'Story',    href: '/en#story' },
  { label: 'FAQ',      href: '/en/faq' },
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
          backgroundColor: '#0b0c0e',
          borderBottom: '0.5px solid rgba(226,59,46,0.25)',
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
            <Logo size={44} color="#e9e7e1" />
            <span
              style={{
                color: '#e9e7e1',
                fontSize: '15px',
                letterSpacing: '0.22em',
                fontWeight: 500,
                fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
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

            {/* 電話 */}
            <a
              href={SITE.telHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#e23b2e',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
              aria-label={`お電話：${SITE.tel}`}
            >
              <Phone size={14} />
              <span
                style={{
                  fontSize: '15px',
                  letterSpacing: '0.04em',
                  fontWeight: 500,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {SITE.tel}
              </span>
            </a>

            {/* LINE（URL設定時のみ表示） */}
            {SITE.lineUrl && (
              <a
                href={SITE.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#f7f1e6',
                  background: '#06c755',
                  textDecoration: 'none',
                  padding: '5px 12px',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}
                aria-label="LINEで相談"
              >
                <MessageCircle size={13} />
                LINE
              </a>
            )}

            {/* 言語切替ボタン */}
            <Link
              href={langHref}
              style={{
                color: '#e23b2e',
                fontSize: '11px',
                letterSpacing: '0.15em',
                fontWeight: 300,
                textDecoration: 'none',
                border: '0.5px solid #e23b2e',
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
                color: '#828990',
                fontSize: '9px',
                letterSpacing: '0.05em',
                fontWeight: 300,
                textDecoration: 'none',
                border: '0.5px solid #2c3137',
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
              color: '#e23b2e',
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
              backgroundColor: '#0b0c0e',
              borderLeft: '0.5px solid rgba(226,59,46,0.2)',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e23b2e', padding: '4px' }}
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
                    color: '#e9e7e1',
                    fontSize: '14px',
                    letterSpacing: '0.12em',
                    fontWeight: 300,
                    textDecoration: 'none',
                    fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {/* 電話 */}
              <a
                href={SITE.telHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#e23b2e',
                  textDecoration: 'none',
                }}
              >
                <Phone size={16} />
                <span style={{ fontSize: '17px', fontWeight: 500, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {SITE.tel}
                </span>
              </a>

              {SITE.lineUrl && (
                <a
                  href={SITE.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#f7f1e6',
                    background: '#06c755',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    width: 'fit-content',
                  }}
                >
                  <MessageCircle size={15} />
                  LINEで相談
                </a>
              )}

              <Link
                href={langHref}
                onClick={() => setDrawerOpen(false)}
                style={{
                  color: '#e23b2e',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  fontWeight: 300,
                  textDecoration: 'none',
                  border: '0.5px solid #e23b2e',
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
                  color: '#828990',
                  fontSize: '10px',
                  letterSpacing: '0.05em',
                  fontWeight: 300,
                  textDecoration: 'none',
                  border: '0.5px solid #2a2f35',
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
