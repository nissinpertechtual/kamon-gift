'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminColumnsNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title_ja: '',
    slug: '',
    summary: '',
    body_ja: '',
    thumbnail: '',
    is_published: false,
    published_at: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/columns', {
        method: 'POST',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
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
          新規コラム作成
        </h1>
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
          <input
            name="title_ja"
            value={form.title_ja}
            onChange={handleChange}
            required
            placeholder="コラムタイトル"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>SLUG *</label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              placeholder="url-safe-slug"
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, slug: slugify(form.title_ja) }))}
              style={{
                background: '#e4ded0',
                border: '0.5px solid #d3cab5',
                color: '#6f675a',
                padding: '10px 14px',
                fontSize: '10px',
                cursor: 'pointer',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}
            >
              タイトルから生成
            </button>
          </div>
          <p style={{ fontSize: '10px', color: '#9b9384', marginTop: '4px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            URL: /column/{form.slug || '...'}
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
            placeholder="本文（Markdown対応）"
            rows={16}
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
