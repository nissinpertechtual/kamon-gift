// fetch レスポンスを安全に JSON 解析する。
// サーバが JSON でない 500（"Internal Server Error" 等）を返しても
// 「Unexpected token ...」ではなく読めるエラーにする。
export async function readJson<T = unknown>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    const snippet = text.replace(/\s+/g, ' ').trim().slice(0, 100);
    throw new Error(`サーバーエラー (${res.status})${snippet ? `: ${snippet}` : ''}`);
  }
}
