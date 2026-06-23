'use client';

import { useState } from 'react';
import { readJson } from '@/lib/http';

type Lang = 'ja' | 'en';

const T = {
  ja: {
    heading: 'バイヤー様はこちら',
    intro: '卸・OEMをご検討の事業者様向けに、下代（卸価格）をその場でご確認いただけます。下記をご入力ください。',
    company: '会社名',
    contact: 'ご担当者名',
    email: 'メールアドレス',
    phone: '電話番号（任意）',
    quantity: '想定数量（個）',
    message: 'ご要望・備考（任意）',
    submit: '下代を確認する',
    submitting: '送信中…',
    required: '必須',
    resultLabel: '下代（卸価格・税抜）',
    perUnit: '／個',
    noPrice: 'この商品の下代は個別お見積もりです。担当者よりご連絡いたします。',
    thanks: '送信ありがとうございます。担当者にも通知しました。詳細はメールでご連絡いたします。',
    note: '※ 想定数量により別途お見積もりいたします。お気軽にご相談ください。',
  },
  en: {
    heading: 'For Wholesale Buyers',
    intro: 'For businesses considering wholesale or OEM. Enter your details to see the wholesale price instantly.',
    company: 'Company',
    contact: 'Contact name',
    email: 'Email',
    phone: 'Phone (optional)',
    quantity: 'Expected quantity (units)',
    message: 'Requests / notes (optional)',
    submit: 'Reveal wholesale price',
    submitting: 'Sending…',
    required: 'required',
    resultLabel: 'Wholesale price (excl. tax)',
    perUnit: '/unit',
    noPrice: 'Wholesale price for this item is quoted individually. Our team will contact you.',
    thanks: 'Thank you. Our team has been notified and will follow up by email.',
    note: '* Final pricing may vary by quantity. Feel free to consult us.',
  },
} as const;

type Result = { wholesalePrice: number | null } | null;

export function BuyerQuoteForm({
  productId,
  productName,
  lang = 'ja',
}: {
  productId: string;
  productName: string;
  lang?: Lang;
}) {
  const t = T[lang];
  const [form, setForm] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    quantity: '',
    message: '',
    website: '', // honeypot
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/buyer/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          productName,
          company: form.company,
          contactName: form.contactName,
          email: form.email,
          phone: form.phone,
          quantity: form.quantity,
          message: form.message,
          website: form.website,
        }),
      });
      const data = await readJson<{ error?: string; wholesalePrice?: number | null }>(res);
      if (!res.ok) throw new Error(data.error || (lang === 'ja' ? '送信に失敗しました' : 'Submission failed'));
      setResult({ wholesalePrice: data.wholesalePrice ?? null });
    } catch (err) {
      setError(err instanceof Error ? err.message : lang === 'ja' ? '送信に失敗しました' : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  }

  const SERIF = "'Cormorant Garamond', Georgia, serif";
  const MINCHO =
    lang === 'ja'
      ? "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif"
      : SERIF;

  const label: React.CSSProperties = {
    display: 'block',
    fontSize: '10px',
    letterSpacing: '0.12em',
    color: '#9aa0a6',
    marginBottom: '7px',
    fontFamily: MINCHO,
  };
  const input: React.CSSProperties = {
    width: '100%',
    background: '#191a1f',
    border: '0.5px solid #2a2f35',
    color: '#e9e7e1',
    padding: '11px 12px',
    fontSize: '13px',
    fontFamily: MINCHO,
    outline: 'none',
    boxSizing: 'border-box',
  };
  const req = (
    <span style={{ color: '#c98b86', fontSize: '9px', marginLeft: '6px', letterSpacing: '0.1em' }}>{t.required}</span>
  );

  return (
    <section
      style={{
        marginTop: '64px',
        border: '0.5px solid #2a2f35',
        background: '#202127',
        padding: '36px 28px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
        <h2
          style={{
            fontSize: '17px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#efece4',
            margin: 0,
            fontFamily: MINCHO,
          }}
        >
          {t.heading}
        </h2>
        <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#7c8088', fontFamily: SERIF, fontStyle: 'italic' }}>
          WHOLESALE
        </span>
      </div>
      <p style={{ fontSize: '12.5px', lineHeight: 1.9, color: '#9aa0a6', margin: '0 0 26px', fontFamily: MINCHO }}>
        {t.intro}
      </p>

      {result ? (
        <div>
          {result.wholesalePrice != null ? (
            <div
              style={{
                border: '0.5px solid #3a3d33',
                background: '#191a1f',
                padding: '24px 22px',
                marginBottom: '16px',
              }}
            >
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#9a958b', marginBottom: '10px', fontFamily: SERIF }}>
                {t.resultLabel}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '36px', fontWeight: 500, color: '#f5e6c8', letterSpacing: '0.02em', lineHeight: 1, fontFamily: SERIF }}>
                  ¥{result.wholesalePrice.toLocaleString()}
                </span>
                <span style={{ fontSize: '13px', color: '#9a958b', fontFamily: SERIF }}>{t.perUnit}</span>
              </div>
              <p style={{ fontSize: '11px', color: '#7c8088', margin: '14px 0 0', lineHeight: 1.8, fontFamily: MINCHO }}>
                {t.note}
              </p>
            </div>
          ) : (
            <div
              style={{
                border: '0.5px solid #2a2f35',
                background: '#191a1f',
                padding: '22px',
                marginBottom: '16px',
                fontSize: '13px',
                color: '#cfcabf',
                lineHeight: 1.9,
                fontFamily: MINCHO,
              }}
            >
              {t.noPrice}
            </div>
          )}
          <p style={{ fontSize: '11.5px', color: '#8b9298', margin: 0, lineHeight: 1.8, fontFamily: MINCHO }}>
            {t.thanks}
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            <div>
              <label style={label}>{t.company}{req}</label>
              <input name="company" value={form.company} onChange={onChange} required style={input} />
            </div>
            <div>
              <label style={label}>{t.contact}{req}</label>
              <input name="contactName" value={form.contactName} onChange={onChange} required style={input} />
            </div>
            <div>
              <label style={label}>{t.email}{req}</label>
              <input name="email" type="email" value={form.email} onChange={onChange} required style={input} />
            </div>
            <div>
              <label style={label}>{t.phone}</label>
              <input name="phone" value={form.phone} onChange={onChange} style={input} />
            </div>
            <div>
              <label style={label}>{t.quantity}</label>
              <input name="quantity" type="number" min="1" value={form.quantity} onChange={onChange} style={input} />
            </div>
          </div>
          <div>
            <label style={label}>{t.message}</label>
            <textarea name="message" value={form.message} onChange={onChange} rows={3} style={{ ...input, resize: 'vertical', lineHeight: 1.7 }} />
          </div>

          {/* ハニーポット（視覚的に隠す） */}
          <input
            name="website"
            value={form.website}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          />

          {error && (
            <p style={{ fontSize: '12px', color: '#e0837b', margin: 0, fontFamily: MINCHO }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              alignSelf: 'flex-start',
              background: submitting ? '#828990' : '#efece4',
              color: '#17181c',
              padding: '13px 36px',
              fontSize: '12px',
              letterSpacing: '0.16em',
              fontWeight: 500,
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontFamily: MINCHO,
            }}
          >
            {submitting ? t.submitting : t.submit}
          </button>
        </form>
      )}
    </section>
  );
}
