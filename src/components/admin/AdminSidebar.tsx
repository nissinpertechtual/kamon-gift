'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/admin', label: 'ダッシュボード', exact: true },
  { href: '/admin/products', label: '商品管理', exact: false },
  { href: '/admin/inquiries', label: '問い合わせ', exact: false },
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
        background: '#111',
        borderRight: '0.5px solid #2a2a2a',
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
          borderBottom: '0.5px solid #2a2a2a',
          marginBottom: '24px',
        }}
      >
        <p
          style={{
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: '#c9a84c',
            margin: 0,
            fontFamily: 'Georgia, serif',
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
                color: isActive ? '#c9a84c' : '#888',
                textDecoration: 'none',
                fontWeight: 300,
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                background: isActive ? 'rgba(201,168,76,0.06)' : 'transparent',
                borderLeft: isActive ? '2px solid #c9a84c' : '2px solid transparent',
                transition: 'color 0.2s ease, background 0.2s ease',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ログアウト */}
      <div style={{ padding: '24px 12px 0', borderTop: '0.5px solid #1a1a1a' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#555',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            fontWeight: 300,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede6')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
        >
          ログアウト
        </button>
      </div>
    </aside>
  );
}
