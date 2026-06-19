import { Suspense } from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { SectionLabel } from '@/components/ui/SectionLabel';
import KamonBackground from '@/components/KamonBackground';

export default function ContactPage() {
  return (
    <div style={{ position: 'relative', background: '#17181c', minHeight: '100vh' }}>
      <KamonBackground />
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '100px 24px 120px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionLabel en="CONTACT" ja="お問い合わせ" />
        <p
          style={{
            fontSize: '12px',
            color: '#8b9298',
            lineHeight: 2.6,
            letterSpacing: '0.05em',
            textAlign: 'center',
            marginBottom: '64px',
            fontWeight: 300,
            fontFamily: "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'Cormorant Garamond', Georgia, serif",
          }}
        >
          家紋名が分からない方も、まずはお気軽にご相談ください。
          <br />
          2〜3営業日以内に担当者よりご連絡いたします。
        </p>
        {/* useSearchParams は Suspense で囲む必要がある */}
        <Suspense fallback={<div style={{ height: '400px' }} />}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
