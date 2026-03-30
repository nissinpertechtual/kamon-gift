import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 素材名 → 英語プロンプト用マッピング
const MATERIAL_MAP: Record<string, string> = {
  // 日本語キー（DBの値に合わせる）
  '真鍮':    'polished brass with dark oxidized patina',
  '牛革':    'dark brown aged full-grain leather',
  'ガラス':  'clear optical crystal glass with frosted finish',
  'アクリル': 'transparent frosted acrylic panel',
  // 英語キー（フォールバック）
  metal:   'polished brass and dark steel surface',
  leather: 'dark brown aged leather surface',
  glass:   'clear optical crystal glass',
  acrylic: 'transparent frosted acrylic panel',
};

export async function generateProductImage(
  productName: string,
  material: string
): Promise<{ base64: string; mimeType: string }> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-preview-image-generation',
  });

  const materialDesc = MATERIAL_MAP[material] ?? 'polished metal with fine surface';

  const prompt = `
    Professional product photography.
    A premium Japanese gift item: "${productName}".
    Material: ${materialDesc}.
    A traditional Japanese family crest (kamon) is laser-engraved
    on the surface with extremely fine, precise lines.
    Dark studio background (#0a0a0a) with dramatic warm side lighting.
    The engraving glows faintly gold (#c9a84c) from the lighting.
    Luxury gift, minimal composition, centered product.
    High-end Japanese craftsmanship aesthetic.
    No text, no watermark, no hands, no people.
    Square crop, top-down or 3/4 angle view.
  `.trim();

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ['image', 'text'],
    } as object,
  });

  const parts = result.response.candidates?.[0]?.content?.parts;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imagePart = parts?.find((p: any) => p.inlineData);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(imagePart as any)?.inlineData) {
    throw new Error('Geminiからの画像データが取得できませんでした');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, mimeType } = (imagePart as any).inlineData;
  return { base64: data, mimeType };
}
