import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logAudit } from '@/lib/audit';
import { upsertWholesalePrice } from '@/lib/buyer';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, name_ja, description_ja, price, material, scene, sort_order, is_published, is_active } = body;

    if (!name || !name_ja || !material) {
      return NextResponse.json({ error: 'name, name_ja, material は必須です' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        name_ja,
        description_ja: description_ja ?? null,
        price: price ?? null,
        material,
        scene: scene ?? null,
        sort_order: sort_order ?? 0,
        is_published: !!is_published,
        is_active: is_active !== false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Product update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 下代（別テーブル・service-role）を保存。失敗しても更新は成立させる。
    {
      const wp = body.wholesale_price;
      if (wp !== undefined) {
        try {
          await upsertWholesalePrice(id, wp === '' || wp == null ? null : Number(wp));
        } catch (e) {
          console.error('wholesale upsert failed (update):', e);
        }
      }
    }

    await logAudit({ actor: user.email ?? user.id, action: 'update', entity: 'product', entityId: id, detail: { name_ja } });
    return NextResponse.json(data);
  } catch (err) {
    console.error('Product PATCH error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Product delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logAudit({ actor: user.email ?? user.id, action: 'delete', entity: 'product', entityId: id });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Product DELETE error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
