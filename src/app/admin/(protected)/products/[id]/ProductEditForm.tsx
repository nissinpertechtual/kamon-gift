'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types/supabase';

const SCENE_OPTIONS = [
  { value: '', label: '— 指定なし —' },
  { value: 'oshi', label: '推し活・個人ギフト' },
  { value: 'bridal', label: '結婚式・内祝い' },
  { value: 'inbound', label: '海外の方へのお土産' },
  { value: 'corporate', label: '法人・まとめ発注' },
];

export default function ProductEditForm({ product: initial }: { product: Product }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: initial.name,
    name_ja: initial.name_ja,
    description_ja: initial.description_ja ?? '',
    price: initial.price != null ? String(initial.price) : '',
    material: initial.material,
    scene: initial.scene ?? '',
    sort_order: String(initial.sort_order),
    is_published: initial.is_published,
    is_active: initial.is_active,
  });
  const [images, setImages] = useState<string[]>(initial.images ?? []);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`/api/admin/products/${initial.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          name_ja: form.name_ja,
          description_ja: form.description_ja || null,
          price: form.price !== '' ? Number(form.price) : null,
          material: form.material,
          scene: form.scene || null,
          sort_order: Number(form.sort_order),
          is_published: form.is_published,
          is_active: form.is_active,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '保存に失敗しました');
      }
      setMessage('保存しました');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`「${initial.name_ja}」を削除しますか？この操作は元に戻せません。`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${initial.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '削除に失敗しました');
      }
      router.push('/admin/products');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '削除に失敗しました');
      setDeleting(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('productId', initial.id);
      formData.append('file', file);
      const res = await fetch('/api/admin/product-image', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'アップロード失敗');
      setImages(data.images);
      setMessage('画像をアップロードしました');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'アップロード失敗');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleDeleteImage(index: number) {
    if (!confirm('この画像を削除しますか？')) return;
    try {
      const res = await fetch('/api/admin/product-image', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: initial.id, index }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? '削除失敗');
      setImages(data.images);
      setMessage('画像を削除しました');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '削除失敗');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#111',
    border: '0.5px solid #2a2a2a',
    color: '#f0ede6',
    padding: '10px 12px',
    fontSize: '13px',
    fontWeight: 300,
    fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '9px',
    letterSpacing: '0.2em',
    color: '#555',
    marginBottom: '8px',
    fontFamily: 'Georgia, serif',
  };

  return (
    <div style={{ maxWidth: '720px' }}>
      {/* ヘッダー */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => router.push('/admin/products')}
            style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '12px', fontFamily: 'Georgia, serif', padding: 0 }}
          >
            ← 戻る
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: 300, letterSpacing: '0.1em', color: '#f0ede6', margin: 0, fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif" }}>
            商品編集
          </h1>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{ background: 'transparent', border: '0.5px solid rgba(200,50,50,0.4)', color: '#f87171', padding: '8px 16px', fontSize: '11px', cursor: deleting ? 'not-allowed' : 'pointer', fontFamily: 'Georgia, serif', opacity: deleting ? 0.5 : 1 }}
        >
          {deleting ? '削除中...' : '削除'}
        </button>
      </div>

      {/* エラー・メッセージ */}
      {error && (
        <div style={{ background: 'rgba(200,50,50,0.08)', border: '0.5px solid rgba(200,50,50,0.3)', color: '#f87171', padding: '12px 16px', fontSize: '12px', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>
          {error}
        </div>
      )}
      {message && !error && (
        <div style={{ background: 'rgba(201,168,76,0.06)', border: '0.5px solid rgba(201,168,76,0.3)', color: '#c9a84c', padding: '12px 16px', fontSize: '12px', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>
          {message}
        </div>
      )}

      {/* テキスト情報フォーム */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>商品名（日本語）*</label>
            <input name="name_ja" value={form.name_ja} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>管理名（英語）*</label>
            <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>商品説明文</label>
          <textarea name="description_ja" value={form.description_ja} onChange={handleChange} rows={5} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.8 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>価格（円）</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="空欄 = お見積もり" style={inputStyle} />
            <p style={{ fontSize: '10px', color: '#444', marginTop: '4px', fontFamily: 'Georgia, serif' }}>空欄にするとカスタム注文扱い</p>
          </div>
          <div>
            <label style={labelStyle}>素材 *</label>
            <input name="material" value={form.material} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>シーン</label>
            <select name="scene" value={form.scene} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
              {SCENE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} style={{ background: '#111' }}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>表示順（sort_order）</label>
            <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input name="is_published" type="checkbox" checked={form.is_published} onChange={handleChange} style={{ accentColor: '#c9a84c', width: '14px', height: '14px' }} />
            <span style={{ fontSize: '12px', color: '#888', fontFamily: 'Georgia, serif' }}>公開する</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input name="is_active" type="checkbox" checked={form.is_active} onChange={handleChange} style={{ accentColor: '#c9a84c', width: '14px', height: '14px' }} />
            <span style={{ fontSize: '12px', color: '#888', fontFamily: 'Georgia, serif' }}>有効（is_active）</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
          <button
            type="submit"
            disabled={saving}
            style={{ background: saving ? '#555' : '#c9a84c', color: '#0a0a0a', padding: '12px 40px', fontSize: '12px', letterSpacing: '0.15em', fontWeight: 300, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Georgia, serif' }}
          >
            {saving ? '保存中...' : '保存する'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            style={{ background: 'transparent', color: '#555', padding: '12px 24px', fontSize: '12px', letterSpacing: '0.1em', border: '0.5px solid #2a2a2a', cursor: 'pointer', fontFamily: 'Georgia, serif' }}
          >
            キャンセル
          </button>
        </div>
      </form>

      {/* 画像管理セクション */}
      <div style={{ borderTop: '0.5px solid #1a1a1a', paddingTop: '40px' }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#555', marginBottom: '20px', fontFamily: 'Georgia, serif' }}>
          IMAGES
        </p>

        {/* 画像一覧 */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {images.length === 0 && (
            <p style={{ fontSize: '12px', color: '#333', fontFamily: 'Georgia, serif' }}>画像がありません</p>
          )}
          {images.map((url, i) => (
            <div key={url} style={{ position: 'relative', width: '100px', height: '75px' }}>
              <img src={url} alt={`image-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
              {i === 0 && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, background: 'rgba(201,168,76,0.8)', fontSize: '8px', color: '#0a0a0a', padding: '2px 6px', fontFamily: 'Georgia, serif' }}>
                  メイン
                </div>
              )}
              <button
                onClick={() => handleDeleteImage(i)}
                title="削除"
                style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', background: '#1a1a1a', border: '0.5px solid #555', color: '#888', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* 追加ボタン */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{ background: 'transparent', border: '0.5px solid #2a2a2a', color: uploading ? '#555' : '#888', padding: '10px 24px', fontSize: '11px', letterSpacing: '0.1em', cursor: uploading ? 'not-allowed' : 'pointer', fontFamily: 'Georgia, serif' }}
          >
            {uploading ? 'アップロード中...' : '＋ 画像を追加'}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
        </div>
        <p style={{ fontSize: '10px', color: '#333', marginTop: '8px', fontFamily: 'Georgia, serif' }}>
          1枚目がメイン画像になります。複数枚追加できます。
        </p>
      </div>
    </div>
  );
}
