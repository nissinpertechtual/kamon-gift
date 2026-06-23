import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getWholesalePrice } from '@/lib/buyer';
import ProductEditForm from './ProductEditForm';

export default async function AdminProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', id).single();
  if (!product) notFound();
  // 下代は別テーブル（service-role）から取得。このページは (protected) で認証済み。
  const wholesalePrice = await getWholesalePrice(id);
  return <ProductEditForm product={product} wholesalePrice={wholesalePrice} />;
}
