// サイト共通の事業者・連絡先情報（特定商取引法の表記に準拠）
// LINE 公式アカウントのURLが決まったら lineUrl に設定すると、
// ヘッダー・フッターに自動でLINEボタンが表示されます。
export const SITE = {
  name: '家紋の彫刻室',
  legalName: 'ニッシン・パーテクチュアル株式会社',
  description:
    '金属・革・ガラスへのフェムト秒レーザー彫刻による家紋ギフト専門店。結婚式・内祝い・推し活・訪日外国人向けの贈り物に。',
  url: 'https://kamongift.com',
  tel: '048-754-6511',
  telHref: 'tel:+81487546511',
  email: 'noreply@kamongift.com',
  addressRegion: '埼玉県',
  addressLocality: '春日部市',
  lineUrl: '', // 例: 'https://lin.ee/xxxxxxx'（未設定の間は非表示）

  // ── ロゴ画像 ─────────────────────────────────────────────
  // 自前のロゴ画像を使う場合：
  //   1) 画像を public/ に置く（例: public/logo.png ※背景透過PNG推奨）
  //   2) ここに公開パスを設定（例: '/logo.png'）
  // 空文字のままなら、内蔵の落款（角印）SVGロゴが表示されます。
  logoSrc: '',

  // ── シネマティック帯の動画 ───────────────────────────────
  // レーザー彫刻などの実写動画を流す場合：
  //   public/ に動画(mp4/webm)を置いて '/craft.mp4' を設定、
  //   もしくは外部の動画URLを設定。
  // 空文字の間は、静止画のスローズーム（動画風）でフォールバック表示します。
  craftVideo: '',
  craftVideoPoster:
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop',
} as const;
