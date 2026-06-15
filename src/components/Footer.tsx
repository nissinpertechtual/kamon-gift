'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { SITE } from '@/lib/site';
import { EN } from '@/lib/i18n/translations';

const MINCHO = "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif";
const SERIF = "'Cormorant Garamond', Georgia, serif";

const JA_LINKS = [
  { label: '商品', href: '/products' },
  { label: 'ストーリー', href: '/#story' },
  { label: 'コラム', href: '/column' },
  { label: 'よくある質問', href: '/faq' },
  { label: '特定商取引法に基づく表記', href: '/legal' },
];

export default function Footer() {
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');

  const links = isEn ? EN.footer.links : JA_LINKS;
  const font = isEn ? SERIF : MINCHO;
  const tagline = isEn ? EN.footer.tagline : 'レーザー彫刻による\n家紋ギフト専門店';
  const contactLabel = isEn ? EN.footer.contactLabel : 'お電話・お問い合わせ';
  const lineLabel = isEn ? 'Chat on LINE' : 'LINEで相談';
  const ctaLabel = isEn ? EN.footer.cta : 'ご注文・お問い合わせ';
  const ctaHref = isEn ? '/en/contact' : '/contact';

  return (
    <footer style={{ backgroundColor: '#0b0c0e', borderTop: '0.5px solid #23272c', padding: '32px 24px' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px',
        }}
      >
        {/* 左：ロゴ + キャッチ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Logo size={38} color="#e9e7e1" />
            <span style={{ color: '#e9e7e1', fontSize: '13px', letterSpacing: '0.18em', fontWeight: 500, fontFamily: MINCHO }}>
              家紋の彫刻室
            </span>
          </div>
          <p style={{ color: '#828990', fontSize: '11px', letterSpacing: '0.05em', margin: 0, lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: font, fontStyle: isEn ? 'italic' : 'normal' }}>
            {tagline}
          </p>
        </div>

        {/* 中：リンク */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: '#8b9298', fontSize: '11px', letterSpacing: '0.05em', textDecoration: 'none', fontFamily: font }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 右：連絡先 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <p style={{ color: '#828990', fontSize: '11px', letterSpacing: '0.05em', margin: 0, fontFamily: font }}>
            {contactLabel}
          </p>

          <a href={SITE.telHref} style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '0.04em', color: '#efece4', fontFamily: SERIF }}>
              {SITE.tel}
            </span>
          </a>

          {SITE.lineUrl && (
            <a
              href={SITE.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', color: '#f7f1e6', background: '#06c755', fontSize: '11px', letterSpacing: '0.1em', textDecoration: 'none', padding: '9px 20px' }}
            >
              {lineLabel}
            </a>
          )}

          <Link
            href={ctaHref}
            style={{ display: 'inline-block', color: '#efece4', fontSize: '11px', letterSpacing: '0.15em', textDecoration: 'none', border: '0.5px solid #efece4', padding: '10px 20px', fontFamily: font }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>

      {/* コピーライト */}
      <div style={{ borderTop: '0.5px solid #23272c', marginTop: '24px', paddingTop: '16px', textAlign: 'center' }}>
        <p style={{ color: '#5d636a', fontSize: '10px', letterSpacing: '0.05em', margin: 0, fontFamily: SERIF }}>
          © Nisshin Partectual Co., Ltd.
        </p>
      </div>
    </footer>
  );
}
