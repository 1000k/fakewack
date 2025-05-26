import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/signin');

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  if (!isAuthPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl.origin));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
