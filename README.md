# 家紋の彫刻室 (kamon-gift)

レーザー彫刻による家紋ギフト専門店のWebサイト。金属・革・ガラスへのフェムト秒レーザー彫刻を、結婚式・内祝い・推し活・訪日外国人向けギフトとして紹介します。

## 技術スタック

- **Next.js 16** (App Router / Turbopack)
- **React 19**
- **Supabase** — 商品・コラム・問い合わせのデータ保存
- **Resend** — お問い合わせの自動返信／社内通知メール
- **Netlify** — ホスティング（`@netlify/plugin-nextjs`）

## 主なページ

| パス | 内容 |
| --- | --- |
| `/` | トップ（ヒーロー・ストーリー・シーン別・商品・流れ・CTA） |
| `/products`, `/products/[id]` | 商品一覧・商品詳細 |
| `/contact` | お問い合わせ・お見積もりフォーム |
| `/column`, `/column/[slug]` | コラム |
| `/faq` | よくある質問 |
| `/buyer` | 法人・卸売向け |
| `/legal` | 特定商取引法に基づく表記 |
| `/en/*` | 英語版 |
| `/admin/*` | 管理画面（商品・コラム・問い合わせ管理） |

## EC（オンライン決済）について

現状、ECサイト機能（Stripeによるオンライン決済）は**無効**です。商品ページの価格は「参考価格」として表示し、購入はすべてお問い合わせ・お見積もりフォームに集約しています。

Stripe決済関連のコード（`src/app/api/checkout`、`src/app/checkout/*`、`BuyButton`、`StickyBuyBar`）はサイト上の導線を外したうえで温存してあり、将来ECを再開する際に再利用できます。

## セットアップ

```bash
npm install
cp .env.local.example .env.local   # 各種キーを設定
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

### 環境変数

`.env.local.example` を参照してください。Supabase・Resend は必須、Stripe・Gemini はオプション（EC／AI画像生成を使う場合のみ）。

## スクリプト

- `npm run dev` — 開発サーバー
- `npm run build` — 本番ビルド
- `npm run start` — 本番サーバー
- `npm run lint` — ESLint
