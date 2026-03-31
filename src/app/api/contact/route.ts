import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { customerAutoReply, adminNotification } from '@/lib/email/templates';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      name,
      email,
      phone,
      productName,
      kamonName,
      kamonImageUrl,
      quantity,
      purpose,
      budget,
      message,
    } = body;

    // バリデーション
    if (!name || !email) {
      return NextResponse.json(
        { error: 'お名前とメールアドレスは必須です' },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'メールアドレスの形式が正しくありません' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // 1. Supabase に保存
    const { data: inquiry, error: dbError } = await supabase
      .from('inquiries')
      .insert({
        name,
        email,
        phone: phone || null,
        product_name: productName || null,
        kamon_name: kamonName || null,
        kamon_image: kamonImageUrl || null,
        quantity: quantity ? parseInt(String(quantity)) : null,
        purpose: purpose || null,
        budget: budget || null,
        message: message || null,
        status: 'new',
      })
      .select()
      .single();

    if (dbError) {
      console.error('DB insert error:', dbError);
      throw new Error('データベースへの保存に失敗しました');
    }

    const emailData = {
      name,
      email,
      phone,
      productName,
      kamonName,
      quantity: quantity ? parseInt(String(quantity)) : undefined,
      purpose,
      budget,
      message,
    };

    const fromAddress = `家紋の彫刻室 <${process.env.CONTACT_FROM_EMAIL}>`;

    // 2. 顧客への自動返信
    const { error: customerMailError } = await getResend().emails.send({
      from: fromAddress,
      to: [email],
      subject: '【家紋の彫刻室】お問い合わせを受け付けました',
      html: customerAutoReply(emailData),
    });
    if (customerMailError) {
      console.error('Customer mail error:', customerMailError);
    }

    // 3. 社内通知
    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (toEmail) {
      const { error: adminMailError } = await getResend().emails.send({
        from: fromAddress,
        to: [toEmail],
        subject: `【新着問い合わせ】${name}様 — ${productName ?? '商品未指定'}`,
        html: adminNotification(emailData),
      });
      if (adminMailError) {
        console.error('Admin mail error:', adminMailError);
      }
    }

    return NextResponse.json({ success: true, inquiryId: inquiry.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : '不明なエラー';
    console.error('contact route error:', error);
    return NextResponse.json(
      { error: `送信に失敗しました。時間をおいて再度お試しください。（${message}）` },
      { status: 500 }
    );
  }
}
