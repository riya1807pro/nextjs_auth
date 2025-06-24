import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value || '';
  const path =  request.nextUrl.pathname;
  const isPublicPath = path=== '/login' ||  path ==='/signup' || path === "/verifyEmail";
  
  // redirect authenticated user to home page
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // redirect unauthenticated user to login page
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/signup', 
    '/login',
    '/verifyEmail',
  ],
}