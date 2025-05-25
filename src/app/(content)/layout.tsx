import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto flex justify-between px-4 py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
