import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProductEditForm from './ProductEditForm';

export default async function AdminProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', id).single();
  if (!product) notFound();
  return <ProductEditForm product={product} />;
}
