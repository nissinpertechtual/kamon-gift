'use client';

import { useState } from 'react';

type Props = { images: string[]; name: string };

export function ImageSlider({ images, name }: Props) {
  const [current, setCurrent] = useState(0);

  const KamonPlaceholder = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="60" height="60" viewBox="0 0 72 72" style={{ opacity: 0.1 }}>
        <circle cx="36" cy="36" r="28" fill="none" stroke="#c9a84c" strokeWidth="1" />
        <circle cx="36" cy="36" r="14" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
        <line x1="36" y1="8" x2="36" y2="64" stroke="#c9a84c" strokeWidth="0.8" />
        <line x1="8" y1="36" x2="64" y2="36" stroke="#c9a84c" strokeWidth="0.8" />
      </svg>
    </div>
  );

  if (images.length === 0) {
    return (
      <div style={{ aspectRatio: '1/1', background: '#111' }}>
        <KamonPlaceholder />
      </div>
    );
  }

  return (
    <div>
      {/* メイン画像 */}
      <div
        style={{
          aspectRatio: '1/1',
          background: '#111',
          overflow: 'hidden',
          marginBottom: '12px',
          position: 'relative',
        }}
      >
        <img
          src={images[current]}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* 左右矢印（複数枚の時） */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                border: '0.5px solid #333',
                color: '#888',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ‹
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % images.length)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                border: '0.5px solid #333',
                color: '#888',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* サムネイル */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: '56px',
                height: '56px',
                padding: 0,
                border: `0.5px solid ${i === current ? '#c9a84c' : '#2a2a2a'}`,
                background: 'none',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'border-color 0.3s',
                flexShrink: 0,
              }}
            >
              <img
                src={img}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
