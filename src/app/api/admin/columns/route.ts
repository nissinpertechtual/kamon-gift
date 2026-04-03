import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // 認証チェック
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title_ja, slug, summary, body_ja, thumbnail, is_published, published_at } = body;

    if (!title_ja || !slug || !body_ja) {
      return NextResponse.json({ error: 'title_ja, slug, body_ja は必須です' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('columns')
      .insert({
        title_ja,
        slug,
        summary: summary || null,
        body_ja,
        thumbnail: thumbnail || null,
        is_published: !!is_published,
        published_at: published_at || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Column insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Column POST error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
