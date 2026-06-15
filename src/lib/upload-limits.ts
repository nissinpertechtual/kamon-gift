// 画像アップロードの上限（バイト）
// 注意: Netlify Functions の HTTP リクエスト本体は標準で約6MB上限のため、
// 100MB の画像は実用上 Netlify 経由のサーバ側で受け取れません。
// 大容量を確実に扱うには「Supabase Storage への直接アップロード（署名付きURL）」が必要です。
// 詳細は src/lib/upload-limits.README を参照（または改善案ドキュメント）。
export const MAX_UPLOAD_BYTES = 100 * 1024 * 1024; // 100MB
export const MAX_UPLOAD_LABEL = '100MB';
