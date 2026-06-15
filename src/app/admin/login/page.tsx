'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('メールアドレスまたはパスワードが正しくありません。');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('ログインに失敗しました。');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f4f0e7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '360px' }}>
        {/* ロゴ */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '9px',
              letterSpacing: '0.35em',
              color: '#a3282b',
              margin: '0 0 12px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            KAMON GIFT
          </p>
          <p
            style={{
              fontSize: '13px',
              letterSpacing: '0.1em',
              color: '#857c6d',
              margin: 0,
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
            }}
          >
            管理者ログイン
          </p>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: '#766d5f',
                marginBottom: '8px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                background: '#e7e0d2',
                border: '0.5px solid #d3cab5',
                color: '#2a2620',
                fontSize: '13px',
                fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                outline: 'none',
                boxSizing: 'border-box',
                letterSpacing: '0.05em',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#a3282b')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#d3cab5')}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: '#766d5f',
                marginBottom: '8px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                background: '#e7e0d2',
                border: '0.5px solid #d3cab5',
                color: '#2a2620',
                fontSize: '13px',
                fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                outline: 'none',
                boxSizing: 'border-box',
                letterSpacing: '0.05em',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#a3282b')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#d3cab5')}
            />
          </div>

          {error && (
            <p
              style={{
                fontSize: '11px',
                color: '#b3261e',
                margin: 0,
                letterSpacing: '0.05em',
                fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              padding: '14px',
              background: loading ? '#857c6d' : '#a3282b',
              color: '#f6f1e7',
              fontSize: '11px',
              letterSpacing: '0.25em',
              fontWeight: 300,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
              transition: 'opacity 0.3s ease',
            }}
          >
            {loading ? '...' : 'ログイン'}
          </button>
        </form>
      </div>
    </div>
  );
}
