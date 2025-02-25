'use client';
import Header from '@/components/Header';
import useCheckAuth from '@/hooks/useCheckAuth';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //  check user cookie at first app lunches
  useCheckAuth();
  return (
    <>
      <Header />
      <section className="dwedwed pt-[74px] px-14">{children}</section>
    </>
  );
}
