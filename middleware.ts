import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';


export async function middleware(req: NextRequest) {
  console.log(req);

  const cookiesList = await cookies();
  const token = cookiesList.get("token");

  if (!token?.value || token?.value === null) {
    const url = req.nextUrl.clone();
    url.pathname = '/reload/2';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: '/panel/:path*',
}
