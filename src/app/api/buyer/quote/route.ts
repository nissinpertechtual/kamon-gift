import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE } from '@/lib/site';
import { buyerNotification } from '@/lib/email/templates';
import { getWholesalePrice, insertBuyerLead, countRecentBuyerLeadsByEmail } from '@/lib/buyer';

// 公開エンドポイント（バイヤーがログインせず利用）。
// 送信時にリードを保存し、その商品の下代（卸価格）を返す。下代はDBには匿名公開されず、
// ここ（サーバー）でのみ service-role で読み出して返す。
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      productId,
      productName,
      company,
      contactName,
      email,
      phone,
      quantity,
      message,
      website, // ハニーポット（人間は空のまま）
    } = body;

    // ハニーポット: ボットには成功を装って静かに破棄（価格は返さない）
    if (website) {
      return NextResponse.json({ ok: true, wholesalePrice: null });
    }

    if (!company || !contactName || !email) {
      return NextResponse.json(
        { error: '会社名・ご担当者名・メールアドレスは必須です' },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'メールアドレスの形式が正しくありません' },
        { status: 400 }
      );
    }

    // 連投制限: 同一メールから直近60秒以内は弾く
    if ((await countRecentBuyerLeadsByEmail(email)) > 0) {
      return NextResponse.json(
        { error: '送信が続けて行われました。しばらくお待ちください。' },
        { status: 429 }
      );
    }

    const qtyParsed =
      quantity != null && String(quantity).trim() !== '' ? parseInt(String(quantity), 10) : null;
    const expectedQuantity = qtyParsed != null && !Number.isNaN(qtyParsed) ? qtyParsed : null;

    // リードを保存
    await insertBuyerLead({
      product_id: productId ?? null,
      product_name: productName ?? null,
      company,
      contact_name: contactName,
      email,
      phone: phone || null,
      expected_quantity: expectedQuantity,
      message: message || null,
    });

    // 下代を取得（商品に未設定なら null = 個別見積もり）
    const wholesalePrice = productId ? await getWholesalePrice(productId) : null;

    // 社内通知（ベストエフォート）
    try {
      const toEmail = process.env.CONTACT_TO_EMAIL;
      if (process.env.RESEND_API_KEY && toEmail) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: `${SITE.mailFromName} <${SITE.mailFrom}>`,
          to: [toEmail],
          subject: `【卸見積もり依頼】${company} 様 — ${productName ?? '商品未指定'}`,
          html: buyerNotification({
            productName,
            company,
            contactName,
            email,
            phone,
            quantity: expectedQuantity ?? undefined,
            message,
            wholesalePrice,
          }),
        });
      }
    } catch (mailErr) {
      console.error('buyer notify mail error:', mailErr);
    }

    return NextResponse.json({ ok: true, wholesalePrice, productName: productName ?? null });
  } catch (error) {
    console.error('buyer quote error:', error);
    return NextResponse.json(
      { error: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
