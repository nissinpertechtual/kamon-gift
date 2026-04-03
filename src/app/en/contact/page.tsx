import { Suspense } from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { SectionLabel } from '@/components/ui/SectionLabel';
import KamonBackground from '@/components/KamonBackground';
import { EN } from '@/lib/i18n/translations';

export default function EnContactPage() {
  return (
    <div style={{ position: 'relative', background: '#0a0a0a', minHeight: '100vh' }}>
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
        <SectionLabel en="CONTACT" />
        <p
          style={{
            fontSize: '12px',
            color: '#666',
            lineHeight: 2.6,
            letterSpacing: '0.04em',
            textAlign: 'center',
            marginBottom: '64px',
            fontWeight: 300,
            whiteSpace: 'pre-line',
            fontFamily: 'Georgia, serif',
          }}
        >
          {EN.contact.description}
        </p>
        <Suspense fallback={<div style={{ height: '400px' }} />}>
          <ContactForm lang="en" />
        </Suspense>
      </div>
    </div>
  );
}
