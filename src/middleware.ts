import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value || '';
  const path =  request.nextUrl.pathname;
  const isPublicPath = path=== '/Login' ||  path ==='/Signup' 
  || path === "/VerifyEmail"
  || path === '/ForgetPassword'
  || path === '/ResetPassword'
  ;
  
  // redirect authenticated user to home page
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // redirect unauthenticated user to Login page
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/Login', request.url))
  }

}
 
export const config = {
  matcher: [
    '/',
    '/Profile',
    '/Signup', 
    '/Login',
    '/VerifyEmail',
    '/ForgetPassword',
    '/ResetPassword',
  ],
}