import { ImageResponse } from 'next/og';

export const alt = '家紋の彫刻室 — レーザー彫刻による家紋ギフト';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f4f0e7',
          color: '#2a2620',
        }}
      >
        {/* 落款（角印）モチーフ */}
        <div
          style={{
            display: 'flex',
            width: 168,
            height: 168,
            border: '8px solid #2a2620',
            borderRadius: 16,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'absolute', top: 22, bottom: 22, width: 6, background: '#2a2620' }} />
          <div style={{ position: 'absolute', top: 8, width: 14, height: 14, borderRadius: 14, background: '#a3282b' }} />
          <div style={{ position: 'absolute', bottom: 8, width: 14, height: 14, borderRadius: 14, background: '#a3282b' }} />
        </div>

        <div
          style={{
            marginTop: 54,
            fontSize: 38,
            letterSpacing: 10,
            color: '#a3282b',
            display: 'flex',
          }}
        >
          KAMON ENGRAVING STUDIO
        </div>
        <div style={{ marginTop: 20, fontSize: 24, letterSpacing: 4, color: '#6f675a', display: 'flex' }}>
          Laser-engraved family-crest gifts
        </div>
      </div>
    ),
    { ...size }
  );
}
