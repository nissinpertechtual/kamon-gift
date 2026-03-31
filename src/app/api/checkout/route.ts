import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-03-25.dahlia',
  });
}

function getSupabase() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const BASE_URL = () =>
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://spiffy-tiramisu-ef114a.netlify.app';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { productId, productName, price } = body;

    if (!productId || !productName || price == null) {
      return NextResponse.json({ error: 'パラメータ不足' }, { status: 400 });
    }

    const stripe = getStripe();
    const baseUrl = BASE_URL();

    // Stripe Checkout セッション作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: productName,
              description: '家紋の彫刻室 — レーザー彫刻ギフト',
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/products/${productId}`,
      metadata: { productId },
    });

    // orders テーブルに仮記録
    try {
      const supabase = getSupabase();
      await supabase.from('orders').insert({
        product_id: productId,
        stripe_session_id: session.id,
        amount: price,
        status: 'pending',
      });
    } catch (dbErr) {
      // DB記録失敗は非致命的 — Stripeセッションは続行
      console.error('orders insert error:', dbErr);
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : '不明なエラー';
    console.error('checkout error:', error);
    return NextResponse.json({ error: `決済の開始に失敗しました: ${message}` }, { status: 500 });
  }
}
