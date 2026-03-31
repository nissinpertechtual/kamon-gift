'use client';

import { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type FormData = {
  name: string;
  email: string;
  phone: string;
  productName: string;
  kamonName: string;
  quantity: string;
  purpose: string;
  budget: string;
  message: string;
};

const PURPOSES = [
  '推し活・個人ギフト',
  '結婚式・内祝い',
  '海外の方へのお土産',
  '法人・まとめ発注',
  'その他',
];

const BUDGETS = [
  '〜5,000円',
  '5,000〜10,000円',
  '10,000〜30,000円',
  '30,000円〜',
  '未定・ご相談',
];

const INPUT: React.CSSProperties = {
  width: '100%',
  background: '#111',
  border: '0.5px solid #2a2a2a',
  color: '#f0ede6',
  padding: '12px 16px',
  fontSize: '13px',
  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
  fontWeight: 300,
  outline: 'none',
  borderRadius: 0,
  transition: 'border-color 0.3s',
  boxSizing: 'border-box' as const,
};

const LABEL: React.CSSProperties = {
  display: 'block',
  fontSize: '9px',
  letterSpacing: '0.2em',
  color: '#555',
  marginBottom: '8px',
  fontFamily: 'Georgia, serif',
};

const FIELD: React.CSSProperties = { marginBottom: '28px' };

const REQUIRED = (
  <span style={{ color: '#c9a84c', marginLeft: '4px', fontSize: '10px' }}>*</span>
);

function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = '#c9a84c';
}
function blurGray(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = '#2a2a2a';
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const presetProduct = searchParams.get('product') ?? '';

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    productName: presetProduct,
    kamonName: '',
    quantity: '',
    purpose: '',
    budget: '',
    message: '',
  });
  const [kamonImage, setKamonImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    setError('');
    if (!form.name || !form.email) {
      setError('お名前とメールアドレスは必須です');
      return;
    }
    setSubmitting(true);
    try {
      let kamonImageUrl: string | undefined;

      // 家紋画像アップロード
      if (kamonImage) {
        const fd = new FormData();
        fd.append('file', kamonImage);
        const uploadRes = await fetch('/api/upload/kamon-image', {
          method: 'POST',
          body: fd,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error ?? '画像のアップロードに失敗しました');
        kamonImageUrl = uploadData.url;
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, kamonImageUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? '送信に失敗しました');

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setError(e instanceof Error ? e.message : '送信に失敗しました');
    } finally {
      setSubmitting(false);
    }
  }

  // 送信完了画面
  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 72 72"
          style={{ marginBottom: '24px', opacity: 0.6 }}
        >
          <circle cx="36" cy="36" r="30" fill="none" stroke="#c9a84c" strokeWidth="1" />
          <circle cx="36" cy="36" r="16" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
          <line x1="36" y1="6" x2="36" y2="66" stroke="#c9a84c" strokeWidth="0.8" />
          <line x1="6" y1="36" x2="66" y2="36" stroke="#c9a84c" strokeWidth="0.8" />
        </svg>
        <div
          style={{
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: '#c9a84c',
            marginBottom: '20px',
            fontFamily: 'Georgia, serif',
          }}
        >
          SENT
        </div>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 300,
            letterSpacing: '0.1em',
            marginBottom: '16px',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
          }}
        >
          お問い合わせを受け付けました
        </h2>
        <p
          style={{
            fontSize: '12px',
            color: '#666',
            lineHeight: 2.4,
            marginBottom: '40px',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
          }}
        >
          自動返信メールをお送りしました。
          <br />
          2〜3営業日以内に担当者よりご連絡いたします。
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            border: '0.5px solid #c9a84c',
            color: '#c9a84c',
            padding: '12px 40px',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textDecoration: 'none',
            fontFamily: 'Georgia, serif',
          }}
        >
          トップページへ
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      {/* お名前 + 電話番号 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <label style={LABEL}>
            お名前{REQUIRED}
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="山田 太郎"
            style={INPUT}
            onFocus={focusGold}
            onBlur={blurGray}
          />
        </div>
        <div>
          <label style={LABEL}>電話番号</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="090-0000-0000"
            style={INPUT}
            onFocus={focusGold}
            onBlur={blurGray}
          />
        </div>
      </div>

      {/* メールアドレス */}
      <div style={FIELD}>
        <label style={LABEL}>
          メールアドレス{REQUIRED}
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@email.com"
          style={INPUT}
          onFocus={focusGold}
          onBlur={blurGray}
        />
      </div>

      {/* ご希望の商品 */}
      <div style={FIELD}>
        <label style={LABEL}>ご希望の商品</label>
        <input
          name="productName"
          value={form.productName}
          onChange={handleChange}
          placeholder="家紋刻印 真鍮プレート など"
          style={INPUT}
          onFocus={focusGold}
          onBlur={blurGray}
        />
      </div>

      {/* 家紋名 + 画像アップロード */}
      <div style={FIELD}>
        <label style={LABEL}>家紋名または家紋画像</label>
        <input
          name="kamonName"
          value={form.kamonName}
          onChange={handleChange}
          placeholder="例：丸に三つ柏、五七桐 など（不明でも可）"
          style={{ ...INPUT, marginBottom: '8px' }}
          onFocus={focusGold}
          onBlur={blurGray}
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `0.5px dashed ${kamonImage ? '#c9a84c' : '#2a2a2a'}`,
            padding: '16px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.3s, background 0.3s',
            background: kamonImage ? 'rgba(201,168,76,0.04)' : 'transparent',
          }}
          onMouseEnter={(e) =>
            !kamonImage && (e.currentTarget.style.borderColor = '#444')
          }
          onMouseLeave={(e) =>
            !kamonImage && (e.currentTarget.style.borderColor = '#2a2a2a')
          }
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => setKamonImage(e.target.files?.[0] ?? null)}
          />
          {kamonImage ? (
            <span
              style={{
                fontSize: '11px',
                color: '#c9a84c',
                letterSpacing: '0.05em',
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              }}
            >
              ✓ {kamonImage.name}
            </span>
          ) : (
            <span
              style={{
                fontSize: '10px',
                color: '#444',
                letterSpacing: '0.1em',
                fontFamily: 'Georgia, serif',
              }}
            >
              家紋の画像があればアップロード（任意）
            </span>
          )}
        </div>
      </div>

      {/* 数量 + 予算 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <label style={LABEL}>数量</label>
          <input
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            placeholder="1"
            style={INPUT}
            onFocus={focusGold}
            onBlur={blurGray}
          />
        </div>
        <div>
          <label style={LABEL}>ご予算</label>
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            style={{ ...INPUT, cursor: 'pointer', appearance: 'none' }}
            onFocus={focusGold}
            onBlur={blurGray}
          >
            <option value="">選択してください</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 用途・シーン */}
      <div style={FIELD}>
        <label style={LABEL}>用途・シーン</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {PURPOSES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, purpose: prev.purpose === p ? '' : p }))}
              style={{
                padding: '6px 14px',
                fontSize: '10px',
                letterSpacing: '0.05em',
                border: `0.5px solid ${form.purpose === p ? '#c9a84c' : '#2a2a2a'}`,
                color: form.purpose === p ? '#c9a84c' : '#555',
                background: form.purpose === p ? 'rgba(201,168,76,0.06)' : 'transparent',
                cursor: 'pointer',
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
                fontWeight: 300,
                transition: 'all 0.3s',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* メッセージ */}
      <div style={FIELD}>
        <label style={LABEL}>ご要望・メッセージ</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="ご要望・ご質問など、お気軽にお書きください。"
          rows={5}
          style={{ ...INPUT, resize: 'vertical', lineHeight: 1.9 }}
          onFocus={focusGold}
          onBlur={blurGray}
        />
      </div>

      {/* エラー */}
      {error && (
        <div
          style={{
            border: '0.5px solid #c0392b',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#e05a5a',
            marginBottom: '20px',
            letterSpacing: '0.05em',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
          }}
        >
          {error}
        </div>
      )}

      {/* 送信ボタン */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: '#c9a84c',
            opacity: 0.25,
            margin: '0 auto 24px',
          }}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            width: '100%',
            padding: '16px',
            background: submitting ? '#1a1a1a' : '#c9a84c',
            color: submitting ? '#444' : '#0a0a0a',
            border: 'none',
            fontSize: '12px',
            letterSpacing: '0.25em',
            cursor: submitting ? 'wait' : 'pointer',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            fontWeight: 300,
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            if (!submitting) e.currentTarget.style.opacity = '0.88';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          {submitting ? '送信中...' : 'お問い合わせを送信する'}
        </button>
        <p
          style={{
            fontSize: '10px',
            color: '#444',
            marginTop: '12px',
            letterSpacing: '0.05em',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
          }}
        >
          送信後、自動返信メールをお送りします
        </p>
      </div>
    </div>
  );
}
