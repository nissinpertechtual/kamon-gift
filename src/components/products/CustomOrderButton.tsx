import Link from 'next/link';

type Props = { productName: string };

export function CustomOrderButton({ productName }: Props) {
  const encoded = encodeURIComponent(productName);
  return (
    <Link
      href={`/contact?product=${encoded}`}
      style={{
        display: 'block',
        width: '100%',
        padding: '14px',
        background: 'transparent',
        color: '#c9a84c',
        border: '0.5px solid #c9a84c',
        fontSize: '12px',
        letterSpacing: '0.25em',
        textAlign: 'center',
        textDecoration: 'none',
        fontWeight: 300,
        fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'transparent';
      }}
    >
      カスタムで注文する
    </Link>
  );
}
