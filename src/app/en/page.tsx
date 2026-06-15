import Link from 'next/link';
import { EN } from '@/lib/i18n/translations';
import { createClient } from '@/lib/supabase/server';
import KamonBackground from '@/components/KamonBackground';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { EnProductCard } from '@/components/products/EnProductCard';
import { CinematicBand } from '@/components/top/CinematicBand';
import type { Product } from '@/types/supabase';

const SERIF = "'Cormorant Garamond', Georgia, serif";

export default async function EnTopPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .limit(6);
  const products = (data ?? []) as (Product & { name_en?: string | null })[];

  return (
    <div style={{ position: 'relative', background: '#0b0c0e' }}>
      <KamonBackground />

      {/* ───── Hero (KV) ───── */}
      <section
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 90px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="kv-stage" aria-hidden="true">
          {[
            'photo-1545569341-9eb8b30979d9',
            'photo-1558618666-fcd25c85cd64',
            'photo-1557409518-691ebcd96038',
            'photo-1512909006721-3d6018887383',
          ].map((id) => (
            <div
              key={id}
              className="kv"
              style={{ backgroundImage: `url('https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop')` }}
            />
          ))}
        </div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(11,12,14,0.55) 0%, rgba(11,12,14,0.25) 30%, rgba(11,12,14,0.4) 70%, rgba(11,12,14,0.98) 100%)',
            zIndex: 1,
          }}
        />

        <div
          className="hidden-mobile"
          aria-hidden="true"
          style={{ position: 'absolute', right: 'clamp(22px, 5vw, 68px)', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
        >
          <p className="tate" style={{ margin: 0, fontSize: '13px', color: 'rgba(247,241,230,0.72)', fontStyle: 'italic', fontFamily: SERIF }}>
            {EN.hero.tate}
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '26px' }}>
            <svg width="36" height="36" viewBox="0 0 72 72" aria-hidden="true">
              <circle cx="36" cy="36" r="30" fill="none" stroke="#f3ece0" strokeWidth="1" opacity="0.85" />
              <circle cx="36" cy="36" r="18" fill="none" stroke="#f3ece0" strokeWidth="0.8" opacity="0.85" />
              <circle cx="36" cy="36" r="7" fill="none" stroke="#e0b15a" strokeWidth="0.9" />
              <line x1="36" y1="6" x2="36" y2="66" stroke="#f3ece0" strokeWidth="0.7" opacity="0.7" />
              <line x1="6" y1="36" x2="66" y2="36" stroke="#f3ece0" strokeWidth="0.7" opacity="0.7" />
            </svg>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '30px' }}>
            <span style={{ width: '30px', height: '0.5px', background: 'rgba(247,241,230,0.5)' }} />
            <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '13px', letterSpacing: '0.34em', color: 'rgba(247,241,230,0.92)', paddingLeft: '0.34em' }}>
              {EN.hero.label}
            </span>
            <span style={{ width: '30px', height: '0.5px', background: 'rgba(247,241,230,0.5)' }} />
          </div>

          <h1
            style={{
              fontSize: 'clamp(30px, 5.6vw, 54px)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1.5,
              color: '#f7f1e6',
              margin: 0,
              fontFamily: SERIF,
              whiteSpace: 'pre-line',
              textShadow: '0 2px 30px rgba(26,22,18,0.45)',
            }}
          >
            {EN.hero.heading}
          </h1>

          <p
            style={{
              fontSize: '14px',
              letterSpacing: '0.04em',
              lineHeight: 2.2,
              color: 'rgba(247,241,230,0.85)',
              marginTop: '28px',
              whiteSpace: 'pre-line',
              fontFamily: SERIF,
              fontStyle: 'italic',
              textShadow: '0 1px 16px rgba(26,22,18,0.5)',
            }}
          >
            {EN.hero.sub}
          </p>

          <div className="hero-cta-buttons">
            <Link
              href="/en/products"
              style={{ display: 'inline-block', background: '#e23b2e', color: '#f7f1e6', padding: '16px 48px', fontSize: '12px', letterSpacing: '0.22em', fontWeight: 500, textDecoration: 'none', border: '0.5px solid #e23b2e', fontFamily: SERIF }}
            >
              {EN.hero.ctaShop}
            </Link>
            <Link
              href="/en/contact"
              style={{ display: 'inline-block', background: 'rgba(247,241,230,0.06)', color: '#f7f1e6', padding: '16px 48px', fontSize: '12px', letterSpacing: '0.22em', textDecoration: 'none', border: '0.5px solid rgba(247,241,230,0.5)', fontFamily: SERIF }}
            >
              {EN.hero.ctaOrder}
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '10px 18px', marginTop: '34px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '13px', letterSpacing: '0.04em', color: 'rgba(247,241,230,0.88)' }}>
            {EN.hero.trust.map((t, i) => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '18px' }}>
                {i > 0 && <span style={{ width: '1px', height: '12px', background: 'rgba(247,241,230,0.35)' }} />}
                <span>{t}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Story ───── */}
      <section id="story" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <SectionLabel en={EN.story.label} />
          {[EN.story.block1, EN.story.block2, EN.story.block3].map((block, i) => (
            <div key={i}>
              <h2 style={{ fontSize: 'clamp(20px, 3.4vw, 28px)', fontWeight: 500, letterSpacing: '0.03em', lineHeight: 1.5, color: '#e9e7e1', marginBottom: '18px', fontFamily: SERIF }}>
                {block.heading}
              </h2>
              <p style={{ fontSize: '14px', lineHeight: 2.3, color: '#9aa0a6', letterSpacing: '0.02em', whiteSpace: 'pre-line', fontFamily: SERIF, fontStyle: 'italic' }}>
                {block.body}
              </p>
              {i < 2 && <div style={{ width: '40px', height: '0.5px', background: 'rgba(226,59,46,0.4)', margin: '56px auto' }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ───── Cinematic band ───── */}
      <CinematicBand
        eyebrow="Femtosecond Laser"
        caption={'Engraved with light.'}
        sub="λ 1030nm IR · 515nm GR — FOCUS Ø15μm / 0.1μm"
        lang="en"
      />

      {/* ───── Scenes ───── */}
      <section style={{ padding: '120px 24px', background: '#101315', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel en={EN.scenes.label} />
          <div className="scene-grid">
            {EN.scenes.items.map((scene) => (
              <Link key={scene.title} href={scene.href} className="scene-card" style={{ overflow: 'hidden', position: 'relative', textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${scene.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.42) saturate(0.72)', zIndex: 0 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 25%, rgba(20,17,13,0.82) 100%)', zIndex: 1 }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <p style={{ fontSize: '18px', letterSpacing: '0.04em', fontWeight: 500, margin: '0 0 12px', color: '#f7f1e6', fontFamily: SERIF }}>
                    {scene.title}
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(247,241,230,0.82)', lineHeight: 2, margin: 0, whiteSpace: 'pre-line', fontFamily: SERIF, fontStyle: 'italic' }}>
                    {scene.body}
                  </p>
                  <span style={{ display: 'inline-block', marginTop: '20px', fontSize: '12px', color: '#f3ddd0', letterSpacing: '0.08em', fontStyle: 'italic', fontFamily: SERIF, borderBottom: '0.5px solid rgba(243,221,208,0.4)', paddingBottom: '3px' }}>
                    View products →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── How it works ───── */}
      <section style={{ padding: '110px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <SectionLabel en={EN.flow.label} />
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {EN.flow.steps.map((step) => (
              <div key={step.number} style={{ textAlign: 'center', maxWidth: '230px', flex: '1 1 200px' }}>
                <div style={{ fontSize: '30px', color: '#e23b2e', opacity: 0.55, fontFamily: SERIF }}>{step.number}</div>
                <div style={{ fontSize: '15px', letterSpacing: '0.04em', margin: '12px 0 10px', color: '#e9e7e1', fontWeight: 500, fontFamily: SERIF }}>{step.title}</div>
                <div style={{ fontSize: '12.5px', color: '#9aa0a6', lineHeight: 2, whiteSpace: 'pre-line', fontFamily: SERIF, fontStyle: 'italic' }}>{step.body}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '52px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 36px' }}>
            {EN.flow.points.map((p) => (
              <p key={p} style={{ fontSize: '12px', color: '#828990', margin: 0, fontFamily: SERIF, fontStyle: 'italic' }}>
                <span style={{ color: '#e23b2e', marginRight: '7px' }}>✓</span>{p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Products ───── */}
      <section style={{ padding: '110px 24px', background: '#101315', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <SectionLabel en={EN.products.label} />
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#5d636a', fontSize: '14px', padding: '40px 0', fontFamily: SERIF, fontStyle: 'italic' }}>
              {EN.products.empty}
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <EnProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/en/products" style={{ display: 'inline-block', border: '0.5px solid #e23b2e', color: '#e23b2e', padding: '13px 44px', fontSize: '12px', letterSpacing: '0.16em', textDecoration: 'none', fontFamily: SERIF, fontStyle: 'italic' }}>
              {EN.products.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* ───── Final CTA ───── */}
      <section style={{ padding: '120px 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="rule-v" style={{ marginBottom: '40px' }} />
        <h2 style={{ fontSize: 'clamp(20px, 3.4vw, 28px)', fontWeight: 500, letterSpacing: '0.03em', marginBottom: '14px', color: '#e9e7e1', fontFamily: SERIF }}>
          {EN.finalCta.heading}
        </h2>
        <p style={{ fontSize: '13px', color: '#9aa0a6', marginBottom: '40px', fontFamily: SERIF, fontStyle: 'italic' }}>
          {EN.finalCta.sub}
        </p>
        <Link href="/en/contact" style={{ background: '#e23b2e', color: '#f7f1e6', padding: '16px 50px', fontSize: '13px', letterSpacing: '0.18em', textDecoration: 'none', display: 'inline-block', fontWeight: 500, fontFamily: SERIF }}>
          {EN.finalCta.button}
        </Link>
      </section>
    </div>
  );
}
