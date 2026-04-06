import { createClient } from '@/lib/supabase/server';
import ColumnEditForm from './ColumnEditForm';
import { notFound } from 'next/navigation';

export default async function AdminColumnEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: column } = await supabase
    .from('columns')
    .select('*')
    .eq('id', id)
    .single();

  if (!column) notFound();

  return <ColumnEditForm column={column} />;
}
