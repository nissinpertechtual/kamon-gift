// ログインページはadmin layoutの認証チェックを受けないよう
// 独自のシンプルなlayoutで上書きする
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
