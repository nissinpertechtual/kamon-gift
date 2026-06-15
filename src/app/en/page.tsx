import Link from 'next/link';
import { EN } from '@/lib/i18n/translations';
import { createClient } from '@/lib/supabase/server';
import KamonBackground from '@/components/KamonBackground';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { EnProductCard } from '@/components/products/EnProductCard';
import { CinematicBand } from '@/components/top/CinematicBand';
import { SITE } from '@/lib/site';
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

      {/* ───── Hero (KV) — editorial ───── */}
      <section style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: '#0b0b0c' }}>
        <div className="kv-stage" aria-hidden="true">
          <div
            className="cine-zoom"
            style={{ position: 'absolute', inset: 0, backgroundImage: `url('${SITE.heroPhotos[0] ?? '/products/hero-gen.jpg'}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.66) saturate(1)' }}
          />
        </div>
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(11,11,12,0.86) 0%, rgba(11,11,12,0.55) 42%, rgba(11,11,12,0.15) 100%), linear-gradient(to bottom, transparent 60%, #0b0b0c 100%)' }}
        />

        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1180px', margin: '0 auto', padding: '120px 32px' }}>
          <div style={{ maxWidth: '600px' }}>
            <p className="latin" style={{ fontSize: '13px', letterSpacing: '0.22em', color: 'rgba(239,236,228,0.6)', fontStyle: 'italic', margin: '0 0 28px' }}>
              {EN.hero.label}
            </p>
            <h1 style={{ fontSize: 'clamp(34px, 6vw, 64px)', fontWeight: 500, letterSpacing: '0.02em', lineHeight: 1.35, color: '#f3f0e8', margin: 0, fontFamily: SERIF, whiteSpace: 'pre-line' }}>
              {EN.hero.heading}
            </h1>
            <p style={{ fontSize: '15px', letterSpacing: '0.03em', lineHeight: 2, color: 'rgba(239,236,228,0.78)', margin: '28px 0 0', fontFamily: SERIF, fontStyle: 'italic', whiteSpace: 'pre-line' }}>
              {EN.hero.sub}
            </p>
            <div className="hero-cta-buttons">
              <Link href="/en/products" className="hero-btn-primary">{EN.hero.ctaShop}</Link>
              <Link href="/en/contact" className="hero-btn-secondary">{EN.hero.ctaOrder}</Link>
            </div>
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
              {i < 2 && <div style={{ width: '40px', height: '0.5px', background: 'rgba(239,236,228,0.4)', margin: '56px auto' }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ───── Cinematic band ───── */}
      <CinematicBand
        eyebrow="Femtosecond Laser"
        caption={'Engraved with light.'}
        sub="The femtosecond laser preserves the finest lines of your crest, exactly."
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
                <div style={{ fontSize: '30px', color: '#efece4', opacity: 0.55, fontFamily: SERIF }}>{step.number}</div>
                <div style={{ fontSize: '15px', letterSpacing: '0.04em', margin: '12px 0 10px', color: '#e9e7e1', fontWeight: 500, fontFamily: SERIF }}>{step.title}</div>
                <div style={{ fontSize: '12.5px', color: '#9aa0a6', lineHeight: 2, whiteSpace: 'pre-line', fontFamily: SERIF, fontStyle: 'italic' }}>{step.body}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '52px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 36px' }}>
            {EN.flow.points.map((p) => (
              <p key={p} style={{ fontSize: '12px', color: '#828990', margin: 0, fontFamily: SERIF, fontStyle: 'italic' }}>
                <span style={{ color: '#efece4', marginRight: '7px' }}>✓</span>{p}
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
            <Link href="/en/products" style={{ display: 'inline-block', border: '0.5px solid #efece4', color: '#efece4', padding: '13px 44px', fontSize: '12px', letterSpacing: '0.16em', textDecoration: 'none', fontFamily: SERIF, fontStyle: 'italic' }}>
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
        <Link href="/en/contact" style={{ background: '#efece4', color: '#0b0b0c', padding: '16px 50px', fontSize: '13px', letterSpacing: '0.18em', textDecoration: 'none', display: 'inline-block', fontWeight: 500, fontFamily: SERIF }}>
          {EN.finalCta.button}
        </Link>
      </section>
    </div>
  );
}
