// ブラウザ内で画像を縮小・圧縮する（依存なし / canvas）。
// 送信前に長辺を maxDim まで縮小し JPEG 化することで、帯域・保存容量・表示速度を削減。
// 画像以外（SVG/GIF/PDF/動画等）はそのまま返す。
export async function compressImage(
  file: File,
  maxDim = 2000,
  quality = 0.82
): Promise<File> {
  if (typeof window === 'undefined') return file;
  if (!file.type.startsWith('image/')) return file;
  if (/svg|gif/i.test(file.type)) return file;

  try {
    const dataUrl: string = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(file);
    });

    const img: HTMLImageElement = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = dataUrl;
    });

    let { width, height } = img;
    const longest = Math.max(width, height);
    if (longest > maxDim) {
      const s = maxDim / longest;
      width = Math.round(width * s);
      height = Math.round(height * s);
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', quality)
    );
    if (!blob || blob.size >= file.size) return file; // 縮小できなければ原本

    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg' });
  } catch {
    return file; // 失敗時は原本でフォールバック
  }
}
