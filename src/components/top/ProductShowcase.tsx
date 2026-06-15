import { SectionLabel } from '@/components/ui/SectionLabel';
import { SITE } from '@/lib/site';

type Props = { lang?: 'ja' | 'en' };

/** 実作品ギャラリー。SITE.productPhotos の実写を静かなグリッドで見せる。 */
export function ProductShowcase({ lang = 'ja' }: Props) {
  const photos = SITE.productPhotos;
  if (!photos.length) return null;
  const en = lang === 'en';

  return (
    <section style={{ padding: '120px 24px', background: '#0b0b0c', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <SectionLabel en="Works" ja={en ? undefined : '実作品'} align="left" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: '#1c1c19',
            border: '1px solid #1c1c19',
          }}
        >
          {photos.map((src, i) => (
            <div key={src} style={{ aspectRatio: '1 / 1', background: '#000', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={en ? `Engraved kamon on glass ${i + 1}` : `家紋彫刻 ガラス ${i + 1}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: '24px',
            fontSize: '13px',
            letterSpacing: '0.04em',
            color: '#9a958b',
            fontFamily: 'var(--font-mincho)',
          }}
        >
          {en
            ? 'Glass, engraved with a femtosecond laser — holographic finish.'
            : 'ガラスへのフェムト秒レーザー彫刻。光をたたえるホログラム仕上げ。'}
        </p>
      </div>
    </section>
  );
}
