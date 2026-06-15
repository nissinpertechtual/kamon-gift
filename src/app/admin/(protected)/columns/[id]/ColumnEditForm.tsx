'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Column = {
  id: string;
  title_ja: string;
  slug: string;
  summary: string | null;
  body_ja: string;
  thumbnail: string | null;
  is_published: boolean;
  published_at: string | null;
};

export default function ColumnEditForm({ column }: { column: Column }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title_ja: column.title_ja,
    slug: column.slug,
    summary: column.summary ?? '',
    body_ja: column.body_ja,
    thumbnail: column.thumbnail ?? '',
    is_published: column.is_published,
    published_at: column.published_at
      ? column.published_at.slice(0, 16)
      : '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/columns/${column.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title_ja: form.title_ja,
          slug: form.slug,
          summary: form.summary,
          body_ja: form.body_ja,
          thumbnail: form.thumbnail,
          is_published: form.is_published,
          published_at: form.published_at || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '保存に失敗しました');
      }
      router.push('/admin/columns');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`「${column.title_ja}」を削除しますか？この操作は元に戻せません。`)) return;
    setDeleting(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/columns/${column.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '削除に失敗しました');
      }
      router.push('/admin/columns');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '削除に失敗しました');
    } finally {
      setDeleting(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#e7e0d2',
    border: '0.5px solid #d3cab5',
    color: '#2a2620',
    padding: '10px 12px',
    fontSize: '13px',
    fontWeight: 300,
    fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '9px',
    letterSpacing: '0.2em',
    color: '#857c6d',
    marginBottom: '8px',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  };

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => router.back()}
            style={{
              background: 'none',
              border: 'none',
              color: '#857c6d',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              letterSpacing: '0.05em',
              padding: 0,
            }}
          >
            ← 戻る
          </button>
          <h1
            style={{
              fontSize: '18px',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: '#2a2620',
              fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
              margin: 0,
            }}
          >
            コラム編集
          </h1>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            background: 'transparent',
            border: '0.5px solid rgba(163,40,43,0.4)',
            color: '#b3261e',
            padding: '8px 16px',
            fontSize: '11px',
            cursor: deleting ? 'not-allowed' : 'pointer',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: '0.05em',
            opacity: deleting ? 0.5 : 1,
          }}
        >
          {deleting ? '削除中...' : '削除'}
        </button>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(163,40,43,0.08)',
            border: '0.5px solid rgba(163,40,43,0.3)',
            color: '#b3261e',
            padding: '12px 16px',
            fontSize: '12px',
            marginBottom: '24px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={labelStyle}>TITLE *</label>
          <input name="title_ja" value={form.title_ja} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>SLUG *</label>
          <input name="slug" value={form.slug} onChange={handleChange} required style={inputStyle} />
          <p style={{ fontSize: '10px', color: '#9b9384', marginTop: '4px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            URL: /column/{form.slug}
          </p>
        </div>

        <div>
          <label style={labelStyle}>SUMMARY</label>
          <input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="一覧ページに表示される概要文（任意）"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>THUMBNAIL URL</label>
          <input
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="https://..."
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>BODY *</label>
          <textarea
            name="body_ja"
            value={form.body_ja}
            onChange={handleChange}
            required
            rows={20}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.8 }}
          />
          <p style={{ fontSize: '10px', color: '#9b9384', marginTop: '4px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Markdownが使用できます
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>PUBLISHED AT</label>
            <input
              name="published_at"
              type="datetime-local"
              value={form.published_at}
              onChange={handleChange}
              style={{ ...inputStyle, colorScheme: 'dark' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                name="is_published"
                type="checkbox"
                checked={form.is_published}
                onChange={handleChange}
                style={{ accentColor: '#a3282b', width: '14px', height: '14px' }}
              />
              <span style={{ fontSize: '12px', color: '#6f675a', fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.06em' }}>
                公開する
              </span>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              background: saving ? '#857c6d' : '#a3282b',
              color: '#f6f1e7',
              padding: '12px 40px',
              fontSize: '12px',
              letterSpacing: '0.15em',
              fontWeight: 300,
              border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              transition: 'background 0.2s',
            }}
          >
            {saving ? '保存中...' : '保存する'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              background: 'transparent',
              color: '#857c6d',
              padding: '12px 24px',
              fontSize: '12px',
              letterSpacing: '0.1em',
              fontWeight: 300,
              border: '0.5px solid #d3cab5',
              cursor: 'pointer',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}
