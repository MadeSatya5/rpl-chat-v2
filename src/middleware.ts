import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/home') || request.nextUrl.pathname.startsWith('/profile')) {
    const isLogin = request.cookies.get('accessToken');
    if (isLogin) {
      return NextResponse.rewrite(
        new URL(request.nextUrl.pathname, request.url),
      );
    } else {
      return NextResponse.rewrite(new URL('/login', request.url));
    }
  }
}
