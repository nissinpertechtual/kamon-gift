export type InquiryData = {
  name: string;
  email: string;
  phone?: string;
  productName?: string;
  kamonName?: string;
  quantity?: number;
  purpose?: string;
  budget?: string;
  message?: string;
};

// ユーザー入力をHTMLメールに埋め込む前にエスケープ（HTML/フィッシング注入対策）
function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// メールは「明るい背景＋濃い文字」「全要素インラインstyle＋table組み」で作る。
// Gmail等は <head> の <style> や body背景を無視・除去するため、
// 配色は各要素のインラインstyleで完結させ、確実に可読にする。
const FONT = "'Hiragino Mincho ProN', 'Yu Mincho', 'YuMincho', 'Noto Serif JP', Georgia, serif";
const INK = '#1f1c18'; // 墨（濃）
const INK_SUB = '#4a453e'; // 本文
const INK_MUTE = '#8a847a'; // ラベル・補足
const PAPER = '#f4f0e8'; // 生成り（外周）
const CARD = '#ffffff'; // カード
const LINE = '#e7e0d4'; // 罫線
const AKANE = '#8a2e2e'; // 臙脂（アクセント）

// 明細行（値があるときだけ出力）。value は呼び出し側でエスケープ済みHTML。
function cell(label: string, value: string, pre = false): string {
  if (!value) return '';
  return `<tr>
    <td style="padding:12px 14px 12px 0;border-bottom:1px solid ${LINE};font-size:12px;color:${INK_MUTE};letter-spacing:0.06em;width:104px;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:12px 0;border-bottom:1px solid ${LINE};font-size:14px;color:${INK};line-height:1.7;${pre ? 'white-space:pre-wrap;' : ''}">${value}</td>
  </tr>`;
}

// 顧客への自動返信
export function customerAutoReply(data: InquiryData): string {
  const rows = [
    cell('商品', esc(data.productName)),
    cell('家紋名', esc(data.kamonName)),
    cell('数量', data.quantity ? `${esc(data.quantity)}個` : ''),
    cell('用途', esc(data.purpose)),
    cell('ご予算', esc(data.budget)),
    cell('メッセージ', esc(data.message), true),
  ].join('');

  return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${PAPER};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
    <tr><td align="center" style="padding:32px 14px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:${CARD};border:1px solid ${LINE};">
        <tr><td style="padding:44px 36px;font-family:${FONT};">

          <div style="font-size:15px;letter-spacing:0.22em;color:${INK};font-weight:700;">家紋の彫刻室</div>
          <div style="width:42px;height:2px;background:${AKANE};margin:22px 0 30px;"></div>

          <h1 style="font-size:21px;font-weight:700;letter-spacing:0.04em;margin:0 0 22px;color:${INK};">${esc(data.name)} 様</h1>
          <p style="font-size:14px;line-height:1.95;color:${INK_SUB};margin:0;">
            お問い合わせいただきありがとうございます。<br>
            内容を確認のうえ、担当者より2〜3営業日以内にご連絡いたします。
          </p>

          ${rows ? `
          <p style="font-size:12px;color:${INK_MUTE};letter-spacing:0.12em;margin:34px 0 6px;">お問い合わせ内容</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${rows}
          </table>` : ''}

          <p style="font-size:14px;line-height:1.95;color:${INK_SUB};margin:34px 0 0;">
            ご不明な点がございましたら、<br>
            このメールへの返信にてお気軽にお問い合わせください。
          </p>

          <div style="margin-top:40px;padding-top:22px;border-top:1px solid ${LINE};font-size:11px;color:${INK_MUTE};line-height:1.95;letter-spacing:0.04em;">
            家紋の彫刻室<br>
            Nisshin Partectual Co., Ltd.<br>
            レーザー彫刻による家紋ギフト専門店
          </div>

        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// 社内通知メール
export function adminNotification(data: InquiryData): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://kamon-gift.netlify.app';
  const rows = [
    cell('お名前', esc(data.name)),
    cell('メール', esc(data.email)),
    cell('電話番号', esc(data.phone)),
    cell('商品名', esc(data.productName)),
    cell('家紋名', esc(data.kamonName)),
    cell('数量', data.quantity ? `${esc(data.quantity)}個` : ''),
    cell('用途', esc(data.purpose)),
    cell('ご予算', esc(data.budget)),
    cell('メッセージ', esc(data.message), true),
  ].join('');

  return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${PAPER};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
    <tr><td align="center" style="padding:32px 14px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:${CARD};border:1px solid ${LINE};">
        <tr><td style="padding:36px 32px;font-family:${FONT};">

          <div style="font-size:17px;font-weight:700;color:${INK};letter-spacing:0.04em;">
            新着問い合わせ
            <span style="display:inline-block;background:${AKANE};color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.08em;padding:3px 9px;margin-left:8px;vertical-align:middle;border-radius:2px;">NEW</span>
          </div>
          <div style="width:42px;height:2px;background:${AKANE};margin:18px 0 26px;"></div>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${rows}
          </table>

          <a href="${baseUrl}/admin/inquiries"
             style="display:inline-block;margin-top:30px;padding:13px 30px;background:${INK};color:#ffffff;text-decoration:none;font-size:13px;letter-spacing:0.08em;border-radius:2px;">
            管理画面で確認する
          </a>

        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// バイヤー（卸）見積もり依頼の社内通知
export function buyerNotification(data: {
  productName?: string;
  company: string;
  contactName: string;
  email: string;
  phone?: string;
  quantity?: number;
  message?: string;
  wholesalePrice?: number | null;
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://kamon-gift.netlify.app';
  const rows = [
    cell('会社名', esc(data.company)),
    cell('ご担当者', esc(data.contactName)),
    cell('メール', esc(data.email)),
    cell('電話番号', esc(data.phone)),
    cell('商品', esc(data.productName)),
    cell('想定数量', data.quantity ? `${esc(data.quantity)}個` : ''),
    cell('提示した下代', data.wholesalePrice != null ? `¥${esc(data.wholesalePrice.toLocaleString())}` : '（未設定 / 個別見積もり）'),
    cell('メッセージ', esc(data.message), true),
  ].join('');

  return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${PAPER};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
    <tr><td align="center" style="padding:32px 14px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:${CARD};border:1px solid ${LINE};">
        <tr><td style="padding:36px 32px;font-family:${FONT};">

          <div style="font-size:17px;font-weight:700;color:${INK};letter-spacing:0.04em;">
            卸見積もり依頼
            <span style="display:inline-block;background:${AKANE};color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.08em;padding:3px 9px;margin-left:8px;vertical-align:middle;border-radius:2px;">BUYER</span>
          </div>
          <div style="width:42px;height:2px;background:${AKANE};margin:18px 0 26px;"></div>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${rows}
          </table>

          <a href="${baseUrl}/admin/buyer-leads"
             style="display:inline-block;margin-top:30px;padding:13px 30px;background:${INK};color:#ffffff;text-decoration:none;font-size:13px;letter-spacing:0.08em;border-radius:2px;">
            管理画面で確認する
          </a>

        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
