import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const maxDuration = 60;

// 認証なしの公開エンドポイント（問い合わせフォームの家紋画像添付に使用）。
// 悪用を防ぐため、画像形式のみ・サイズ上限を絞る。
const PUBLIC_MAX_BYTES = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];
const ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif'];

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'ファイルがありません' }, { status: 400 });
    }

    // 画像形式のみ許可
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: '画像ファイル（JPEG / PNG / WebP / GIF / HEIC）のみアップロードできます' },
        { status: 400 }
      );
    }

    // ファイルサイズ制限
    if (file.size > PUBLIC_MAX_BYTES) {
      return NextResponse.json(
        { error: 'ファイルサイズは15MB以下にしてください' },
        { status: 400 }
      );
    }

    const rawExt = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const ext = ALLOWED_EXT.includes(rawExt) ? rawExt : 'jpg';
    const filename = `inquiry_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = getSupabase();
    const { error: uploadError } = await supabase.storage
      .from('kamon-images')
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data } = supabase.storage.from('kamon-images').getPublicUrl(filename);
    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
