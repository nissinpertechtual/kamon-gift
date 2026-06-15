import { SectionLabel } from '@/components/ui/SectionLabel';
import { SITE } from '@/lib/site';

type Props = { lang?: 'ja' | 'en' };

/**
 * 実作品ギャラリー。SITE.productPhotos に実物の家紋彫刻写真を設定すると表示。
 * 黒背景＋ホログラム発光の写真がニアブラックの地に自然に溶け込む。
 * 未設定なら何も描画しない（壊れ画像を出さない）。
 */
export function ProductShowcase({ lang = 'ja' }: Props) {
  const photos = SITE.productPhotos;
  if (!photos.length) return null;
  const en = lang === 'en';

  return (
    <section style={{ padding: '110px 24px', background: '#0b0c0e', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionLabel en="Works" ja={en ? undefined : '実作品'} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
          }}
        >
          {photos.map((src, i) => (
            <div
              key={src}
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                background: '#000',
                border: '1px solid #23272c',
                overflow: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={en ? `Engraved kamon, glass — ${i + 1}` : `家紋彫刻 ガラス ${i + 1}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* 計器マーカー（隅） */}
              <span className="mono" style={{ position: 'absolute', top: 10, left: 12, fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(233,231,225,0.6)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        <p className="mono" style={{ textAlign: 'center', marginTop: '26px', fontSize: '10px', letterSpacing: '0.22em', color: '#9aa0a6' }}>
          {en ? 'GLASS · FEMTOSECOND LASER ENGRAVING' : 'ガラス × フェムト秒レーザー彫刻 — ホログラム仕上げ'}
        </p>
      </div>
    </section>
  );
}
