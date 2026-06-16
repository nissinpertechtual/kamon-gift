import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, name_ja, description_ja, price, material, scene, sort_order, is_published, is_active, images } = body;

    if (!name || !name_ja || !material) {
      return NextResponse.json({ error: 'name, name_ja, material は必須です' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        name_ja,
        description_ja: description_ja ?? null,
        price: price ?? null,
        material,
        scene: scene ?? null,
        sort_order: sort_order ?? 0,
        is_published: !!is_published,
        is_active: is_active !== false,
        images: images ?? [],
      })
      .select()
      .single();

    if (error) {
      console.error('Product insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logAudit({ actor: user.email ?? user.id, action: 'create', entity: 'product', entityId: data?.id, detail: { name_ja } });
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Product POST error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
