'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import type { Product } from '@/types/supabase';

export default function ProductAdminCard({ product: initialProduct }: { product: Product }) {
  const [product, setProduct] = useState(initialProduct);
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const primaryImage = product.images?.[0] ?? null;

  async function handleGenerate() {
    setGenerating(true);
    setMessage('');
    try {
      const res = await fetch('/api/generate/product-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          material: product.material,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? '生成失敗');
      setProduct((prev) => ({
        ...prev,
        images: [data.imageUrl, ...prev.images.filter((_, i) => i > 0)],
      }));
      setMessage('AI画像を生成しました');
    } catch (e) {
      setMessage(`エラー: ${e instanceof Error ? e.message : '不明'}`);
    } finally {
      setGenerating(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('productId', product.id);
      formData.append('file', file);
      const res = await fetch('/api/admin/product-image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'アップロード失敗');
      setProduct((prev) => ({ ...prev, images: data.images }));
      setMessage('画像をアップロードしました');
    } catch (e) {
      setMessage(`エラー: ${e instanceof Error ? e.message : '不明'}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleDeleteImage(index: number) {
    if (!confirm('この画像を削除しますか？')) return;
    try {
      const res = await fetch('/api/admin/product-image', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, index }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? '削除失敗');
      setProduct((prev) => ({ ...prev, images: data.images }));
      setMessage('画像を削除しました');
    } catch (e) {
      setMessage(`エラー: ${e instanceof Error ? e.message : '不明'}`);
    }
  }

  return (
    <div
      style={{
        background: '#111',
        border: '0.5px solid #2a2a2a',
        overflow: 'hidden',
      }}
    >
      {/* 画像エリア */}
      <div style={{ position: 'relative', aspectRatio: '4/3', background: '#0d0d0d' }}>
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', opacity: 0.85 }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ fontSize: '10px', color: '#333', fontFamily: 'Georgia, serif' }}>NO IMAGE</p>
          </div>
        )}

        {/* 画像枚数バッジ */}
        {product.images.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(0,0,0,0.7)',
              color: '#888',
              fontSize: '9px',
              padding: '3px 8px',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.05em',
            }}
          >
            {product.images.length} 枚
          </div>
        )}
      </div>

      {/* 商品情報 */}
      <div style={{ padding: '16px' }}>
        <p
          style={{
            fontSize: '13px',
            color: '#f0ede6',
            margin: '0 0 4px',
            fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
            fontWeight: 300,
            letterSpacing: '0.06em',
          }}
        >
          {product.name}
        </p>
        <p style={{ fontSize: '10px', color: '#555', margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>
          {product.material}{product.price != null ? ` · ¥${product.price.toLocaleString()}` : ' · お見積もり'}
        </p>

        {/* アクションボタン */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={handleGenerate}
            disabled={generating}
            style={{
              flex: 1,
              padding: '8px',
              background: 'transparent',
              border: '0.5px solid #c9a84c',
              color: generating ? '#555' : '#c9a84c',
              fontSize: '9px',
              letterSpacing: '0.12em',
              cursor: generating ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => !generating && (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {generating ? '生成中...' : 'AI 生成'}
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{
              flex: 1,
              padding: '8px',
              background: 'transparent',
              border: '0.5px solid #2a2a2a',
              color: uploading ? '#555' : '#888',
              fontSize: '9px',
              letterSpacing: '0.12em',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!uploading) {
                e.currentTarget.style.borderColor = '#555';
                e.currentTarget.style.color = '#f0ede6';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2a2a2a';
              e.currentTarget.style.color = '#888';
            }}
          >
            {uploading ? 'アップロード中...' : '写真を追加'}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleUpload}
          />
        </div>

        {/* 画像一覧（削除用） */}
        {product.images.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {product.images.map((url, i) => (
              <div key={url} style={{ position: 'relative', width: '48px', height: '48px' }}>
                <Image
                  src={url}
                  alt={`image-${i}`}
                  fill
                  style={{ objectFit: 'cover', opacity: 0.7 }}
                  sizes="48px"
                />
                <button
                  onClick={() => handleDeleteImage(i)}
                  title="削除"
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '16px',
                    height: '16px',
                    background: '#333',
                    border: '0.5px solid #555',
                    color: '#888',
                    fontSize: '9px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    padding: 0,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* メッセージ */}
        {message && (
          <p
            style={{
              marginTop: '10px',
              fontSize: '10px',
              color: message.startsWith('エラー') ? '#e05a5a' : '#c9a84c',
              fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
              letterSpacing: '0.05em',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
