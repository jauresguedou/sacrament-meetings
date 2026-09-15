export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</section>;
}
