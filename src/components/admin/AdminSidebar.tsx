'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/admin', label: 'ダッシュボード', exact: true },
  { href: '/admin/products', label: '商品管理', exact: false },
  { href: '/admin/inquiries', label: '問い合わせ', exact: false },
  { href: '/admin/columns', label: 'コラム管理', exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  return (
    <aside
      style={{
        width: '200px',
        minHeight: '100vh',
        background: '#e7e0d2',
        borderRight: '0.5px solid #d3cab5',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 0',
        flexShrink: 0,
      }}
    >
      {/* ロゴ */}
      <div
        style={{
          padding: '0 24px 32px',
          borderBottom: '0.5px solid #d3cab5',
          marginBottom: '24px',
        }}
      >
        <p
          style={{
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: '#a3282b',
            margin: 0,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          KAMON ADMIN
        </p>
      </div>

      {/* ナビゲーション */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 12px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '10px 12px',
                fontSize: '12px',
                letterSpacing: '0.06em',
                color: isActive ? '#a3282b' : '#6f675a',
                textDecoration: 'none',
                fontWeight: 300,
                fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                background: isActive ? 'rgba(163,40,43,0.06)' : 'transparent',
                borderLeft: isActive ? '2px solid #a3282b' : '2px solid transparent',
                transition: 'color 0.2s ease, background 0.2s ease',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ログアウト */}
      <div style={{ padding: '24px 12px 0', borderTop: '0.5px solid #e4ded0' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#857c6d',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#2a2620')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#857c6d')}
        >
          ログアウト
        </button>
      </div>
    </aside>
  );
}
