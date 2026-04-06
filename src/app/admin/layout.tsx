// admin/layout.tsx は認証チェックを行わない。
// 各ページ（login除く）で個別にチェックするか、
// AdminLayoutInner コンポーネントで管理する。
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
