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

// 顧客への自動返信
export function customerAutoReply(data: InquiryData): string {
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { background: #0a0a0a; color: #f0ede6; font-family: Georgia, 'Hiragino Mincho ProN', serif; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 0 auto; padding: 48px 32px; }
    .logo { font-size: 13px; letter-spacing: 0.2em; color: #c9a84c; margin-bottom: 40px; }
    .divider { width: 40px; height: 1px; background: #c9a84c; opacity: 0.4; margin: 32px 0; }
    h1 { font-size: 18px; font-weight: 300; letter-spacing: 0.1em; margin-bottom: 16px; color: #f0ede6; }
    p { font-size: 13px; line-height: 2.2; color: #888; letter-spacing: 0.05em; margin: 0 0 16px; }
    .table { width: 100%; border-collapse: collapse; margin: 24px 0; }
    .table td { padding: 10px 0; border-bottom: 1px solid #1e1e1e; font-size: 12px; color: #888; }
    .table td:first-child { color: #555; width: 120px; letter-spacing: 0.1em; }
    .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #1e1e1e; font-size: 10px; color: #444; letter-spacing: 0.1em; line-height: 2; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="logo">家紋の彫刻室</div>
    <div class="divider"></div>
    <h1>${data.name} 様</h1>
    <p>
      お問い合わせいただきありがとうございます。<br>
      内容を確認のうえ、担当者より2〜3営業日以内にご連絡いたします。
    </p>
    <div class="divider"></div>
    <p style="font-size:11px; color:#555; letter-spacing:0.1em;">お問い合わせ内容</p>
    <table class="table">
      ${data.productName ? `<tr><td>商品</td><td>${data.productName}</td></tr>` : ''}
      ${data.kamonName ? `<tr><td>家紋名</td><td>${data.kamonName}</td></tr>` : ''}
      ${data.quantity ? `<tr><td>数量</td><td>${data.quantity}個</td></tr>` : ''}
      ${data.purpose ? `<tr><td>用途</td><td>${data.purpose}</td></tr>` : ''}
      ${data.budget ? `<tr><td>ご予算</td><td>${data.budget}</td></tr>` : ''}
      ${data.message ? `<tr><td>メッセージ</td><td style="white-space:pre-wrap">${data.message}</td></tr>` : ''}
    </table>
    <div class="divider"></div>
    <p>
      ご不明な点がございましたら、<br>
      このメールへの返信にてお気軽にお問い合わせください。
    </p>
    <div class="footer">
      家紋の彫刻室<br>
      Nisshin Partectual Co., Ltd.<br>
      レーザー彫刻による家紋ギフト専門店
    </div>
  </div>
</body>
</html>
  `;
}

// 社内通知メール
export function adminNotification(data: InquiryData): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://spiffy-tiramisu-ef114a.netlify.app';
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, sans-serif; color: #333; margin: 0; padding: 0; background: #fff; }
    .wrap { max-width: 560px; margin: 0 auto; padding: 32px; }
    h1 { font-size: 16px; border-bottom: 2px solid #c9a84c; padding-bottom: 8px; margin-bottom: 24px; }
    .table { width: 100%; border-collapse: collapse; }
    .table tr:nth-child(even) { background: #f9f9f9; }
    .table td { padding: 10px 12px; border: 1px solid #eee; font-size: 13px; }
    .table td:first-child { font-weight: bold; width: 120px; color: #666; }
    .badge { display: inline-block; background: #c9a84c; color: #fff; font-size: 11px; padding: 2px 8px; border-radius: 2px; margin-left: 8px; }
    .link-btn { display: inline-block; margin-top: 24px; padding: 10px 24px; background: #c9a84c; color: #fff; text-decoration: none; font-size: 12px; border-radius: 2px; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>新着問い合わせ <span class="badge">NEW</span></h1>
    <table class="table">
      <tr><td>お名前</td><td>${data.name}</td></tr>
      <tr><td>メール</td><td>${data.email}</td></tr>
      ${data.phone ? `<tr><td>電話番号</td><td>${data.phone}</td></tr>` : ''}
      ${data.productName ? `<tr><td>商品名</td><td>${data.productName}</td></tr>` : ''}
      ${data.kamonName ? `<tr><td>家紋名</td><td>${data.kamonName}</td></tr>` : ''}
      ${data.quantity ? `<tr><td>数量</td><td>${data.quantity}個</td></tr>` : ''}
      ${data.purpose ? `<tr><td>用途</td><td>${data.purpose}</td></tr>` : ''}
      ${data.budget ? `<tr><td>ご予算</td><td>${data.budget}</td></tr>` : ''}
      ${data.message ? `<tr><td>メッセージ</td><td style="white-space:pre-wrap">${data.message}</td></tr>` : ''}
    </table>
    <a href="${baseUrl}/admin/inquiries" class="link-btn">管理画面で確認する</a>
  </div>
</body>
</html>
  `;
}
