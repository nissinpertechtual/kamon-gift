const mincho =
  "'Zen Old Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif";

export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#17181c',
        color: '#9a958b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        fontFamily: mincho,
        fontSize: '13px',
        letterSpacing: '0.2em',
        fontWeight: 400,
      }}
    >
      読み込み中…
    </div>
  );
}
