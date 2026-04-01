import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { UserJwtPayload } from './types/body.type';

// Define public routes that don't require authentication
const publicContentRoutes = ['/song', '/album', '/artist', '/genre', '/playlist', '/search', '/news'];
const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/verify-otp', '/auth/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check if the route is public
  const isPublicContentRoute = publicContentRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = isPublicContentRoute || isAuthRoute || pathname === '/';

  // 2. Get the token from cookies
  const token = request.cookies.get('accessToken')?.value;

  // 3. If no token and not a public route, redirect to login
  if (!token && !isPublicRoute) {
    const url = new URL('/auth/login', request.url);
    // Optional: save the intended destination to redirect back after login
    // url.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

  // 4. If token exists, decode it to check roles
  if (token) {
    try {
      const decoded = jwtDecode<UserJwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);

      // If token expired, clear cookie and redirect to login
      if (decoded.exp < currentTime) {
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        response.cookies.delete('accessToken');
        return response;
      }

      // Role-based protection
      const roleCookie = request.cookies.get('roleName')?.value;
      const role = (decoded as any).roleName || (decoded as any).role || roleCookie;

      // Admin routes protection
      const isArtistRoute = pathname.startsWith('/admin/artist');
      if (pathname.startsWith('/admin') && isArtistRoute && role !== 'ARTIST' && role !== 'ADMIN' && role !== 'SUPPER ADMIN') {
        return NextResponse.redirect(new URL('/403', request.url));
      }
      if (pathname.startsWith('/admin') && !isArtistRoute && role !== 'ADMIN' && role !== 'SUPPER ADMIN') {
        return NextResponse.redirect(new URL('/403', request.url));
      }

      // Commerce Manager routes protection
      if (pathname.startsWith('/commerce') && role !== 'COMMERCE MANAGER' && role !== 'ADMIN' && role !== 'SUPPER ADMIN') {
        return NextResponse.redirect(new URL('/403', request.url));
      }

      // If the user is logged in and trying to access auth pages, redirect to home
      if (isAuthRoute && pathname !== '/auth/reset-password') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error("Middleware decode error:", error);
      // Invalid token, treat as unauthenticated
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('accessToken');
      return response;
    }
  }

  return NextResponse.next();
}

// Routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
