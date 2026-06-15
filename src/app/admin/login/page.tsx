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
        background: '#0b0c0e',
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
              color: '#e23b2e',
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
              color: '#828990',
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
                color: '#8b9298',
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
                background: '#15181b',
                border: '0.5px solid #2a2f35',
                color: '#e9e7e1',
                fontSize: '13px',
                fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                outline: 'none',
                boxSizing: 'border-box',
                letterSpacing: '0.05em',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#e23b2e')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2f35')}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: '#8b9298',
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
                background: '#15181b',
                border: '0.5px solid #2a2f35',
                color: '#e9e7e1',
                fontSize: '13px',
                fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                outline: 'none',
                boxSizing: 'border-box',
                letterSpacing: '0.05em',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#e23b2e')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2f35')}
            />
          </div>

          {error && (
            <p
              style={{
                fontSize: '11px',
                color: '#ff6b5e',
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
              background: loading ? '#828990' : '#e23b2e',
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
