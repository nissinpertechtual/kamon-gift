import { NextRequest, NextResponse } from 'next/server';
import { generateProductImage } from '@/lib/gemini';
import { createClient } from '@supabase/supabase-js';

// リクエスト時に初期化（ビルド時に環境変数がなくてもエラーにならないよう遅延）
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { productId, productName, material } = body;

    if (!productId || !productName) {
      return NextResponse.json(
        { error: 'productId と productName は必須です' },
        { status: 400 }
      );
    }

    // Step 1: Gemini で画像生成
    const { base64, mimeType } = await generateProductImage(productName, material ?? 'metal');

    // Step 2: base64 → Buffer
    const buffer = Buffer.from(base64, 'base64');
    const ext = mimeType.includes('png') ? 'png' : 'jpg';
    const filename = `${productId}_sample_${Date.now()}.${ext}`;

    const supabase = getSupabase();

    // Supabase URL/KEY が未設定の場合はストレージをスキップして base64 を返す
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const dataUrl = `data:${mimeType};base64,${base64}`;
      return NextResponse.json({ success: true, imageUrl: dataUrl });
    }

    // Step 3: Supabase Storage にアップロード
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filename, buffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      // Storage エラーは警告扱い — base64 data URL を返す
      console.warn('[generate/product-image] Storage upload failed:', uploadError.message);
      const dataUrl = `data:${mimeType};base64,${base64}`;
      return NextResponse.json({ success: true, imageUrl: dataUrl });
    }

    // Step 4: 公開 URL を取得
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filename);

    const publicUrl = urlData.publicUrl;

    // Step 5: products テーブルの images カラムを更新（先頭に追加）
    // テーブルが存在しない場合はエラーを無視して URL だけ返す
    try {
      const { data: product } = await supabase
        .from('products')
        .select('images')
        .eq('id', productId)
        .single();

      const currentImages: string[] = product?.images ?? [];
      const newImages = [publicUrl, ...currentImages];

      await supabase
        .from('products')
        .update({ images: newImages })
        .eq('id', productId);
    } catch (dbErr) {
      console.warn('[generate/product-image] DB update skipped:', dbErr);
    }

    return NextResponse.json({ success: true, imageUrl: publicUrl });

  } catch (error) {
    console.error('[generate/product-image]', error);
    const message = error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
