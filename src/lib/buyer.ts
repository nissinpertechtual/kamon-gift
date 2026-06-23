import { createClient } from '@supabase/supabase-js';
import type { BuyerLead } from '@/types/supabase';

// 下代・バイヤーリードは service-role でのみアクセスする（RLSで匿名・authenticated を遮断）。
// これにより下代（卸価格）が匿名キーで読まれることを防ぐ。
function admin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// 下代を取得（テーブル未作成・未設定なら null）
export async function getWholesalePrice(productId: string): Promise<number | null> {
  try {
    const { data } = await admin()
      .from('product_wholesale')
      .select('wholesale_price')
      .eq('product_id', productId)
      .maybeSingle();
    return data?.wholesale_price ?? null;
  } catch {
    return null;
  }
}

// 下代を保存（null/空は削除）。失敗しても商品保存自体は止めない用途のため throw する側で握る。
export async function upsertWholesalePrice(productId: string, price: number | null): Promise<void> {
  const db = admin();
  if (price == null || Number.isNaN(price)) {
    await db.from('product_wholesale').delete().eq('product_id', productId);
  } else {
    await db.from('product_wholesale').upsert(
      { product_id: productId, wholesale_price: Math.round(price), updated_at: new Date().toISOString() },
      { onConflict: 'product_id' }
    );
  }
}

// バイヤーリードを保存
export async function insertBuyerLead(lead: {
  product_id?: string | null;
  product_name?: string | null;
  company: string;
  contact_name: string;
  email: string;
  phone?: string | null;
  expected_quantity?: number | null;
  message?: string | null;
}): Promise<void> {
  await admin().from('buyer_leads').insert({
    product_id: lead.product_id ?? null,
    product_name: lead.product_name ?? null,
    company: lead.company,
    contact_name: lead.contact_name,
    email: lead.email,
    phone: lead.phone ?? null,
    expected_quantity: lead.expected_quantity ?? null,
    message: lead.message ?? null,
  });
}

// 管理画面での一覧表示用
export async function getBuyerLeads(): Promise<BuyerLead[]> {
  try {
    const { data } = await admin()
      .from('buyer_leads')
      .select('*')
      .order('created_at', { ascending: false });
    return (data ?? []) as BuyerLead[];
  } catch {
    return [];
  }
}

// 連投制限用（直近 sinceMs 以内の同一メール件数）
export async function countRecentBuyerLeadsByEmail(email: string, sinceMs = 60_000): Promise<number> {
  try {
    const since = new Date(Date.now() - sinceMs).toISOString();
    const { count } = await admin()
      .from('buyer_leads')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', since);
    return count ?? 0;
  } catch {
    return 0;
  }
}
