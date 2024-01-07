import Header from '@/components/layout/Header';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 max-w-5xl">{children}</div>
    </>
  );
}
