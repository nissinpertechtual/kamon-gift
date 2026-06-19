'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { readJson } from '@/lib/http';
import { compressImage } from '@/lib/compress-image';
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
  const [progress, setProgress] = useState(0);
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
      const data = await readJson<{ error?: string }>(res);
      if (!res.ok) throw new Error(data.error || '保存に失敗しました');
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
      const data = await readJson<{ error?: string }>(res);
      if (!res.ok) throw new Error(data.error || '削除に失敗しました');
      router.push('/admin/products');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '削除に失敗しました');
      setDeleting(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.files?.[0];
    if (!raw) return;
    setUploading(true);
    setProgress(0);
    setMessage('');
    setError('');
    try {
      // 送信前に圧縮（画像のみ。長辺2000px / JPEG）
      const file = await compressImage(raw);

      let images: string[] | undefined;

      if (file.size <= 4 * 1024 * 1024) {
        // 小容量: サーバ経由（実績のある経路）
        const fd = new FormData();
        fd.append('productId', initial.id);
        fd.append('file', file);
        const res = await fetch('/api/admin/product-image', { method: 'POST', body: fd });
        const data = await readJson<{ error?: string; images?: string[] }>(res);
        if (!res.ok) throw new Error(data.error ?? 'アップロード失敗');
        images = data.images;
      } else {
        // 大容量: Supabase へ直接アップロード（Netlifyの本体上限を回避）
        const ext = file.name.split('.').pop() || 'jpg';
        const r1 = await fetch('/api/admin/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: initial.id, ext }),
        });
        const sig = await readJson<{ path?: string; token?: string; publicUrl?: string; error?: string }>(r1);
        if (!r1.ok || !sig.path || !sig.token || !sig.publicUrl) {
          throw new Error(sig.error || '署名URLの取得に失敗しました');
        }
        const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const putUrl = `${base}/storage/v1/object/upload/sign/product-images/${sig.path}?token=${sig.token}`;
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('PUT', putUrl);
          xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
          xhr.setRequestHeader('x-upsert', 'false');
          xhr.upload.onprogress = (ev) => {
            if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100));
          };
          xhr.onload = () =>
            xhr.status >= 200 && xhr.status < 300
              ? resolve()
              : reject(new Error(`アップロードに失敗しました (${xhr.status})`));
          xhr.onerror = () => reject(new Error('ネットワークエラー'));
          xhr.send(file);
        });
        const r2 = await fetch('/api/admin/product-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: initial.id, publicUrl: sig.publicUrl }),
        });
        const data = await readJson<{ error?: string; images?: string[] }>(r2);
        if (!r2.ok) throw new Error(data.error ?? '画像の登録に失敗しました');
        images = data.images;
      }

      if (images) setImages(images);
      setMessage('画像をアップロードしました');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'アップロード失敗');
    } finally {
      setUploading(false);
      setProgress(0);
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
      const data = await readJson<{ error?: string; images?: string[] }>(res);
      if (!res.ok) throw new Error(data.error ?? '削除失敗');
      if (data.images) setImages(data.images);
      setMessage('画像を削除しました');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '削除失敗');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#202127',
    border: '0.5px solid #2a2f35',
    color: '#e9e7e1',
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
    color: '#828990',
    marginBottom: '8px',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  };

  return (
    <div style={{ maxWidth: '720px' }}>
      {/* ヘッダー */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => router.push('/admin/products')}
            style={{ background: 'none', border: 'none', color: '#828990', cursor: 'pointer', fontSize: '12px', fontFamily: "'Cormorant Garamond', Georgia, serif", padding: 0 }}
          >
            ← 戻る
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: 300, letterSpacing: '0.1em', color: '#e9e7e1', margin: 0, fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif" }}>
            商品編集
          </h1>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{ background: 'transparent', border: '0.5px solid rgba(239,236,228,0.4)', color: '#ff6b5e', padding: '8px 16px', fontSize: '11px', cursor: deleting ? 'not-allowed' : 'pointer', fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: deleting ? 0.5 : 1 }}
        >
          {deleting ? '削除中...' : '削除'}
        </button>
      </div>

      {/* エラー・メッセージ */}
      {error && (
        <div style={{ background: 'rgba(239,236,228,0.08)', border: '0.5px solid rgba(239,236,228,0.3)', color: '#ff6b5e', padding: '12px 16px', fontSize: '12px', marginBottom: '24px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {error}
        </div>
      )}
      {message && !error && (
        <div style={{ background: 'rgba(239,236,228,0.06)', border: '0.5px solid rgba(239,236,228,0.3)', color: '#efece4', padding: '12px 16px', fontSize: '12px', marginBottom: '24px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
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
            <p style={{ fontSize: '10px', color: '#5d636a', marginTop: '4px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>空欄にするとカスタム注文扱い</p>
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
                <option key={o.value} value={o.value} style={{ background: '#202127' }}>{o.label}</option>
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
            <input name="is_published" type="checkbox" checked={form.is_published} onChange={handleChange} style={{ accentColor: '#efece4', width: '14px', height: '14px' }} />
            <span style={{ fontSize: '12px', color: '#9aa0a6', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>公開する</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input name="is_active" type="checkbox" checked={form.is_active} onChange={handleChange} style={{ accentColor: '#efece4', width: '14px', height: '14px' }} />
            <span style={{ fontSize: '12px', color: '#9aa0a6', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>有効（is_active）</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
          <button
            type="submit"
            disabled={saving}
            style={{ background: saving ? '#828990' : '#efece4', color: '#0b0b0c', padding: '12px 40px', fontSize: '12px', letterSpacing: '0.15em', fontWeight: 300, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {saving ? '保存中...' : '保存する'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            style={{ background: 'transparent', color: '#828990', padding: '12px 24px', fontSize: '12px', letterSpacing: '0.1em', border: '0.5px solid #2a2f35', cursor: 'pointer', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            キャンセル
          </button>
        </div>
      </form>

      {/* 画像管理セクション */}
      <div style={{ borderTop: '0.5px solid #1b1f23', paddingTop: '40px' }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#828990', marginBottom: '20px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          IMAGES
        </p>

        {/* 画像一覧 */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {images.length === 0 && (
            <p style={{ fontSize: '12px', color: '#2c3137', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>画像がありません</p>
          )}
          {images.map((url, i) => (
            <div key={url} style={{ position: 'relative', width: '100px', height: '75px' }}>
              <img src={url} alt={`image-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
              {i === 0 && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, background: 'rgba(239,236,228,0.8)', fontSize: '8px', color: '#0b0b0c', padding: '2px 6px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  メイン
                </div>
              )}
              <button
                onClick={() => handleDeleteImage(i)}
                title="削除"
                style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', background: '#1b1f23', border: '0.5px solid #828990', color: '#9aa0a6', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
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
            style={{ background: 'transparent', border: '0.5px solid #2a2f35', color: uploading ? '#828990' : '#9aa0a6', padding: '10px 24px', fontSize: '11px', letterSpacing: '0.1em', cursor: uploading ? 'not-allowed' : 'pointer', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {uploading ? (progress > 0 ? `アップロード中... ${progress}%` : 'アップロード中...') : '＋ 画像を追加'}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
        </div>
        <p style={{ fontSize: '10px', color: '#2c3137', marginTop: '8px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          1枚目がメイン画像になります。複数枚追加できます。
        </p>
      </div>
    </div>
  );
}
