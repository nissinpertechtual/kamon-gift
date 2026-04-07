'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SCENE_OPTIONS = [
  { value: '', label: '— 指定なし —' },
  { value: 'oshi', label: '推し活・個人ギフト' },
  { value: 'bridal', label: '結婚式・内祝い' },
  { value: 'inbound', label: '海外の方へのお土産' },
  { value: 'corporate', label: '法人・まとめ発注' },
];

export default function AdminProductsNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    name_ja: '',
    description_ja: '',
    price: '',
    material: '',
    scene: '',
    sort_order: '0',
    is_published: false,
    is_active: true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
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
      const res = await fetch('/api/admin/products', {
        method: 'POST',
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
          images: [],
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '保存に失敗しました');
      }
      const data = await res.json();
      // 作成後は編集ページへ（画像追加のため）
      router.push(`/admin/products/${data.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    } finally {
      setSaving(false);
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
    <div style={{ maxWidth: '680px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
        <button
          onClick={() => router.back()}
          style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '12px', fontFamily: 'Georgia, serif', padding: 0 }}
        >
          ← 戻る
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 300, letterSpacing: '0.1em', color: '#f0ede6', margin: 0, fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif" }}>
          新規商品登録
        </h1>
      </div>

      {error && (
        <div style={{ background: 'rgba(200,50,50,0.08)', border: '0.5px solid rgba(200,50,50,0.3)', color: '#f87171', padding: '12px 16px', fontSize: '12px', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>商品名（日本語）*</label>
            <input name="name_ja" value={form.name_ja} onChange={handleChange} required placeholder="例：金属プレート 家紋彫刻" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>管理名（英語）*</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="例：metal-plate-kamon" style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>商品説明文</label>
          <textarea
            name="description_ja"
            value={form.description_ja}
            onChange={handleChange}
            placeholder="素材の特徴、彫刻の精度、おすすめの用途など"
            rows={5}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.8 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>価格（円）</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="空欄 = お見積もり"
              style={inputStyle}
            />
            <p style={{ fontSize: '10px', color: '#444', marginTop: '4px', fontFamily: 'Georgia, serif' }}>空欄にするとカスタム注文扱い</p>
          </div>
          <div>
            <label style={labelStyle}>素材 *</label>
            <input name="material" value={form.material} onChange={handleChange} required placeholder="例：ステンレス、真鍮、革" style={inputStyle} />
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
            style={{
              background: saving ? '#555' : '#c9a84c',
              color: '#0a0a0a',
              padding: '12px 40px',
              fontSize: '12px',
              letterSpacing: '0.15em',
              fontWeight: 300,
              border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif',
            }}
          >
            {saving ? '保存中...' : '作成する（次に画像を追加）'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            style={{ background: 'transparent', color: '#555', padding: '12px 24px', fontSize: '12px', letterSpacing: '0.1em', border: '0.5px solid #2a2a2a', cursor: 'pointer', fontFamily: 'Georgia, serif' }}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}
