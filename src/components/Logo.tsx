import { SITE } from '@/lib/site';

type Props = {
  /** 一辺のピクセルサイズ */
  size?: number;
  /** 線・文字の色（既定: 墨／currentColor）※内蔵SVGロゴのみ有効 */
  color?: string;
  className?: string;
};

/**
 * 家紋の彫刻室 ロゴ。
 * SITE.logoSrc に画像パスが設定されていればその画像を、
 * 未設定なら内蔵の落款（角印）SVG（左列「家／紋」・右列「彫／刻／室」）を描画。
 * → public/ に画像を置き src/lib/site.ts の logoSrc を設定するだけで差し替え可能。
 */
export default function Logo({ size = 46, color = 'currentColor', className }: Props) {
  if (SITE.logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={SITE.logoSrc}
        alt={SITE.name}
        height={size}
        className={className}
        style={{ height: size, width: 'auto', display: 'block', flexShrink: 0 }}
      />
    );
  }
  const mincho =
    "'Zen Old Mincho', 'Hina Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="家紋の彫刻室"
      className={className}
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* 外枠 */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="7"
        fill="none"
        stroke={color}
        strokeWidth="4.5"
      />
      {/* 中央の縦罫線 */}
      <line x1="50" y1="15" x2="50" y2="85" stroke={color} strokeWidth="3" />
      {/* 罫線の上下の点 */}
      <circle cx="50" cy="13" r="2.6" fill={color} />
      <circle cx="50" cy="87" r="2.6" fill={color} />

      <g
        fill={color}
        fontFamily={mincho}
        fontWeight={700}
        textAnchor="middle"
        style={{ fontFeatureSettings: '"palt" 0' }}
      >
        {/* 左列：家・紋 */}
        <text x="27.5" y="35" fontSize="30" dominantBaseline="central">家</text>
        <text x="27.5" y="69" fontSize="30" dominantBaseline="central">紋</text>
        {/* 右列：彫・刻・室 */}
        <text x="72.5" y="28" fontSize="21" dominantBaseline="central">彫</text>
        <text x="72.5" y="51" fontSize="21" dominantBaseline="central">刻</text>
        <text x="72.5" y="74" fontSize="21" dominantBaseline="central">室</text>
      </g>
    </svg>
  );
}
