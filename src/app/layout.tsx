export const runtime = 'nodejs';

import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'fakewack',
  description: 'Making the world more boasting.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body>{children}</body>
      </SessionProvider>
    </html>
  );
}
