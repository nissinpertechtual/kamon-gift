'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function AdminResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const supabase = createClient();
      const redirectTo =
        typeof window !== 'undefined' ? `${window.location.origin}/admin/update-password` : undefined;
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (err) throw err;
      setSent(true);
    } catch {
      setError('送信に失敗しました。メールアドレスをご確認ください。');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', background: '#202127',
    border: '0.5px solid #34342f', color: '#efece4', fontSize: '13px',
    fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
    outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#17181c', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <p style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#9a958b', textAlign: 'center', marginBottom: '32px', fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}>
          パスワードの再設定
        </p>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#efece4', lineHeight: 2, fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif" }}>
              再設定用のメールを送信しました。<br />メール内のリンクから新しいパスワードを設定してください。
            </p>
            <Link href="/admin/login" style={{ display: 'inline-block', marginTop: '28px', color: '#9a958b', fontSize: '12px', fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}>
              ← ログインへ戻る
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="メールアドレス" style={inputStyle} />
            {error && <p style={{ fontSize: '11px', color: '#d98c84', margin: 0, fontFamily: "'Zen Old Mincho', serif" }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ padding: '14px', background: loading ? '#615d55' : '#efece4', color: '#0b0b0c', fontSize: '12px', letterSpacing: '0.2em', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Zen Old Mincho', serif" }}>
              {loading ? '...' : '再設定メールを送る'}
            </button>
            <Link href="/admin/login" style={{ textAlign: 'center', color: '#615d55', fontSize: '11px', fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}>
              ← ログインへ戻る
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
