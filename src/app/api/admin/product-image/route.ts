import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// リクエスト時に初期化（ビルド時に環境変数がなくてもエラーにならないよう遅延）
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// POST: 本物の写真をアップロードして指定インデックスを差し替え
export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  const formData = await req.formData();
  const productId = formData.get('productId') as string;
  const indexStr = formData.get('index') as string;
  const file = formData.get('file') as File;

  if (!productId || !file) {
    return NextResponse.json({ error: 'productId と file は必須です' }, { status: 400 });
  }

  const index = indexStr != null ? parseInt(indexStr, 10) : null;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name.split('.').pop() ?? 'jpg';
    const filename = `${productId}_real_${Date.now()}.${ext}`;

    // Step 1: Supabase Storage にアップロード
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Step 2: 公開 URL を取得
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filename);

    const publicUrl = urlData.publicUrl;

    // Step 3: products テーブルの images カラムを更新
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

    await supabase
      .from('products')
      .update({ images: newImages })
      .eq('id', productId);

    return NextResponse.json({ success: true, imageUrl: publicUrl });

  } catch (error) {
    console.error('[admin/product-image POST]', error);
    const message = error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE: 指定インデックスの画像を削除
export async function DELETE(req: NextRequest) {
  const supabase = getSupabase();
  const { productId, index } = await req.json();

  if (!productId || index == null) {
    return NextResponse.json({ error: 'productId と index は必須です' }, { status: 400 });
  }

  try {
    const { data: product } = await supabase
      .from('products')
      .select('images')
      .eq('id', productId)
      .single();

    const currentImages: string[] = product?.images ?? [];

    if (index < 0 || index >= currentImages.length) {
      return NextResponse.json({ error: '無効なインデックスです' }, { status: 400 });
    }

    // Storage からファイルを削除
    const url = currentImages[index];
    const pathMatch = url.match(/product-images\/(.+)$/);
    if (pathMatch) {
      const storagePath = pathMatch[1];
      await supabase.storage.from('product-images').remove([storagePath]);
    }

    // images 配列からも除去
    const newImages = currentImages.filter((_, i) => i !== index);

    await supabase
      .from('products')
      .update({ images: newImages })
      .eq('id', productId);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[admin/product-image DELETE]', error);
    const message = error instanceof Error ? error.message : '不明なエラー';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
