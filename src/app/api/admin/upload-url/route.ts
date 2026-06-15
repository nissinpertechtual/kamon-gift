import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdmin } from '@supabase/supabase-js';

export const runtime = 'nodejs';

// 署名付きアップロードURLを発行。ブラウザから Supabase へ直接アップロードするため、
// Netlify Functions の本体サイズ上限（~6MB）を回避でき、大容量(〜100MB)に対応できる。
export async function POST(req: NextRequest) {
  try {
    // 認証チェック（管理者のみ）
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: 'Supabaseの環境変数が未設定です' }, { status: 500 });
    }

    const { productId, ext } = await req.json().catch(() => ({}));
    if (!productId) {
      return NextResponse.json({ error: 'productId は必須です' }, { status: 400 });
    }

    const safeExt = String(ext ?? 'jpg').replace(/[^a-z0-9]/gi, '').slice(0, 5) || 'jpg';
    const rand = Math.random().toString(36).slice(2, 8);
    const path = `${productId}/real_${Date.now()}_${rand}.${safeExt}`;

    const admin = createAdmin(url, key);
    const { data, error } = await admin.storage
      .from('product-images')
      .createSignedUploadUrl(path);

    if (error) {
      return NextResponse.json({ error: `署名URL発行に失敗: ${error.message}` }, { status: 500 });
    }

    const { data: pub } = admin.storage.from('product-images').getPublicUrl(path);

    return NextResponse.json({
      path,
      token: data.token,
      signedUrl: data.signedUrl,
      publicUrl: pub.publicUrl,
    });
  } catch (e) {
    console.error('[admin/upload-url]', e);
    const message = e instanceof Error ? e.message : '不明なエラー';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
