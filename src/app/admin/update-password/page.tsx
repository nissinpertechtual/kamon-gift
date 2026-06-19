'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminUpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('パスワードは8文字以上にしてください。');
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      router.push('/admin');
      router.refresh();
    } catch {
      setError('更新に失敗しました。リンクの有効期限が切れている可能性があります。');
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
          新しいパスワードの設定
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="新しいパスワード（8文字以上）" style={inputStyle} />
          {error && <p style={{ fontSize: '11px', color: '#d98c84', margin: 0, fontFamily: "'Zen Old Mincho', serif" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ padding: '14px', background: loading ? '#615d55' : '#efece4', color: '#0b0b0c', fontSize: '12px', letterSpacing: '0.2em', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Zen Old Mincho', serif" }}>
            {loading ? '...' : 'パスワードを更新'}
          </button>
        </form>
      </div>
    </div>
  );
}
