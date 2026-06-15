import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// リクエスト時に初期化（ビルド時に環境変数がなくてもエラーにならないよう遅延）
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabaseの環境変数が設定されていません');
  return createClient(url, key);
}

// POST: 本物の写真をアップロードして指定インデックスを差し替え（または先頭に追加）
export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase();
    const formData = await req.formData();
    const productId = formData.get('productId') as string | null;
    const indexStr = formData.get('index') as string | null;
    const file = formData.get('file') as File | null;

    if (!productId || !file) {
      return NextResponse.json({ error: 'productId と file は必須です' }, { status: 400 });
    }

    const index = indexStr != null ? parseInt(indexStr, 10) : null;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name.split('.').pop() ?? 'jpg';
    const filename = `${productId}_real_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: `アップロード失敗: ${uploadError.message}` }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(filename);
    const publicUrl = urlData.publicUrl;

    const { data: product } = await supabase
      .from('products')
      .select('images')
      .eq('id', productId)
      .single();

    const currentImages: string[] = product?.images ?? [];

    let newImages: string[];
    if (index != null && !isNaN(index) && index >= 0 && index < currentImages.length) {
      newImages = [...currentImages];
      newImages[index] = publicUrl;
    } else {
      newImages = [publicUrl, ...currentImages];
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ images: newImages })
      .eq('id', productId);

    if (updateError) {
      return NextResponse.json({ error: `DB更新失敗: ${updateError.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, imageUrl: publicUrl, images: newImages });
  } catch (error) {
    console.error('[admin/product-image POST]', error);
    const message = error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE: 指定インデックスの画像を削除
export async function DELETE(req: NextRequest) {
  try {
    const supabase = getSupabase();
    const { productId, index } = await req.json().catch(() => ({}));

    if (!productId || index == null) {
      return NextResponse.json({ error: 'productId と index は必須です' }, { status: 400 });
    }

    const { data: product } = await supabase
      .from('products')
      .select('images')
      .eq('id', productId)
      .single();

    const currentImages: string[] = product?.images ?? [];

    if (index < 0 || index >= currentImages.length) {
      return NextResponse.json({ error: '無効なインデックスです' }, { status: 400 });
    }

    const url = currentImages[index];
    const pathMatch = url.match(/product-images\/(.+)$/);
    if (pathMatch) {
      await supabase.storage.from('product-images').remove([pathMatch[1]]);
    }

    const newImages = currentImages.filter((_, i) => i !== index);

    const { error: updateError } = await supabase
      .from('products')
      .update({ images: newImages })
      .eq('id', productId);

    if (updateError) {
      return NextResponse.json({ error: `DB更新失敗: ${updateError.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, images: newImages });
  } catch (error) {
    console.error('[admin/product-image DELETE]', error);
    const message = error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
