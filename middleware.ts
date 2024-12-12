import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';


export async function middleware(req: NextRequest) {
  console.log(req);

  const cookiesList = await cookies();
  const token = cookiesList.get("token");

  if (!token?.value) {
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
