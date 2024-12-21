import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(req: NextRequest) {
  const token = localStorage.getItem("token");

  if (!token || token === null) {
    const url = req.nextUrl.clone();
    url.pathname = '/reload';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: '/panel/:path*',
}
