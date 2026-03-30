// KamonBackground.tsx
// 千鳥配列の家紋背景コンポーネント
// SVGパターン（同心円＋十字線）を千鳥配置で表示

export default function KamonBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          {/* 家紋モチーフ: 同心円＋十字線 — 60×60 グリッド用 */}
          <pattern
            id="kamon-a"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* 外円 */}
            <circle cx="30" cy="30" r="12" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
            {/* 中円 */}
            <circle cx="30" cy="30" r="7" fill="none" stroke="#c9a84c" strokeWidth="0.6" />
            {/* 内円 */}
            <circle cx="30" cy="30" r="3" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
            {/* 十字線（縦） */}
            <line x1="30" y1="18" x2="30" y2="42" stroke="#c9a84c" strokeWidth="0.5" />
            {/* 十字線（横） */}
            <line x1="18" y1="30" x2="42" y2="30" stroke="#c9a84c" strokeWidth="0.5" />
          </pattern>

          {/* 千鳥用 — 30px オフセット */}
          <pattern
            id="kamon-b"
            x="30"
            y="30"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* 外円 */}
            <circle cx="30" cy="30" r="12" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
            {/* 中円 */}
            <circle cx="30" cy="30" r="7" fill="none" stroke="#c9a84c" strokeWidth="0.6" />
            {/* 内円 */}
            <circle cx="30" cy="30" r="3" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
            {/* 十字線（縦） */}
            <line x1="30" y1="18" x2="30" y2="42" stroke="#c9a84c" strokeWidth="0.5" />
            {/* 十字線（横） */}
            <line x1="18" y1="30" x2="42" y2="30" stroke="#c9a84c" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* レイヤー1: 通常配置 */}
        <rect width="100%" height="100%" fill="url(#kamon-a)" opacity="0.05" />
        {/* レイヤー2: 千鳥（30pxオフセット） */}
        <rect width="100%" height="100%" fill="url(#kamon-b)" opacity="0.05" />
      </svg>
    </div>
  );
}
