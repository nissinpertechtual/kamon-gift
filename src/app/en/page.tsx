import Link from 'next/link';
import { EN } from '@/lib/i18n/translations';
import KamonBackground from '@/components/KamonBackground';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default function EnTopPage() {
  return (
    <div style={{ position: 'relative', background: '#0a0a0a' }}>
      <KamonBackground />

      {/* Hero */}
      <div
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px 60px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#c9a84c',
            marginBottom: '24px',
            fontFamily: 'Georgia, serif',
          }}
        >
          {EN.hero.label}
        </div>
        <h1
          style={{
            fontSize: 'clamp(22px, 5vw, 36px)',
            fontWeight: 300,
            letterSpacing: '0.06em',
            lineHeight: 1.7,
            color: '#f0ede6',
            marginBottom: '28px',
            whiteSpace: 'pre-line',
            fontFamily: 'Georgia, serif',
          }}
        >
          {EN.hero.heading}
        </h1>
        <p
          style={{
            fontSize: '12px',
            color: '#888',
            letterSpacing: '0.08em',
            lineHeight: 2.2,
            marginBottom: '48px',
            whiteSpace: 'pre-line',
            fontFamily: 'Georgia, serif',
          }}
        >
          {EN.hero.sub}
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/en/products"
            style={{
              background: '#c9a84c',
              color: '#0a0a0a',
              padding: '13px 44px',
              fontSize: '11px',
              letterSpacing: '0.25em',
              fontWeight: 300,
              textDecoration: 'none',
              display: 'inline-block',
              fontFamily: 'Georgia, serif',
            }}
          >
            {EN.hero.ctaShop}
          </Link>
          <Link
            href="/en/contact"
            style={{
              background: 'transparent',
              color: '#c9a84c',
              padding: '13px 44px',
              fontSize: '11px',
              letterSpacing: '0.25em',
              fontWeight: 300,
              border: '0.5px solid #c9a84c',
              textDecoration: 'none',
              display: 'inline-block',
              fontFamily: 'Georgia, serif',
            }}
          >
            {EN.hero.ctaOrder}
          </Link>
        </div>
      </div>

      {/* Story */}
      <div
        style={{
          padding: '120px 24px',
          maxWidth: '560px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionLabel en="STORY" />
        {[EN.story.block1, EN.story.block2, EN.story.block3].map((block, i) => (
          <div key={i}>
            <h2
              style={{
                fontSize: 'clamp(16px, 3vw, 22px)',
                fontWeight: 300,
                letterSpacing: '0.06em',
                lineHeight: 1.6,
                color: '#f0ede6',
                marginBottom: '16px',
                fontFamily: 'Georgia, serif',
              }}
            >
              {block.heading}
            </h2>
            <p
              style={{
                fontSize: '13px',
                lineHeight: 2.4,
                color: '#888',
                letterSpacing: '0.04em',
                fontWeight: 300,
                whiteSpace: 'pre-line',
                fontFamily: 'Georgia, serif',
              }}
            >
              {block.body}
            </p>
            {i < 2 && (
              <div
                style={{
                  width: '40px',
                  height: '0.5px',
                  background: '#c9a84c',
                  opacity: 0.4,
                  margin: '64px auto',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* How it works */}
      <div
        style={{
          padding: '100px 24px',
          background: '#0d0d0d',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionLabel en={EN.flow.label} />
        <div
          style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {EN.flow.steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center', maxWidth: '200px' }}>
              <div
                style={{
                  fontSize: '28px',
                  color: '#c9a84c',
                  opacity: 0.6,
                  fontWeight: 300,
                  fontFamily: 'Georgia, serif',
                }}
              >
                {step.number}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  margin: '12px 0 8px',
                  color: '#f0ede6',
                  fontWeight: 300,
                  fontFamily: 'Georgia, serif',
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#666',
                  lineHeight: 1.9,
                  whiteSpace: 'pre-line',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {step.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div
        style={{
          padding: '100px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '1px',
            height: '48px',
            background: '#c9a84c',
            opacity: 0.3,
            margin: '0 auto 40px',
          }}
        />
        <h2
          style={{
            fontSize: 'clamp(16px, 3vw, 22px)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            marginBottom: '12px',
            color: '#f0ede6',
            fontFamily: 'Georgia, serif',
          }}
        >
          Questions? We&apos;re here to help.
        </h2>
        <p
          style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '40px',
            fontFamily: 'Georgia, serif',
          }}
        >
          Not sure about your family crest? Just ask.
        </p>
        <Link
          href="/en/contact"
          style={{
            background: '#c9a84c',
            color: '#0a0a0a',
            padding: '16px 48px',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textDecoration: 'none',
            display: 'inline-block',
            fontWeight: 300,
            fontFamily: 'Georgia, serif',
          }}
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
