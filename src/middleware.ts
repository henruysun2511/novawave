import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { UserJwtPayload } from './types/body.type';

// Define public routes that don't require authentication
const publicContentRoutes = ['/song', '/album', '/artist', '/genre', '/playlist', '/search', '/news'];
const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/verify-otp', '/auth/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;

  // 1. Xác định loại route
  const isPublicContentRoute = publicContentRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isHomePage = pathname === '/';
  const isPublicRoute = isPublicContentRoute || isAuthRoute || isHomePage;

  // 2. NẾU LÀ TRANG AUTH (Login/Register) và đã có token HỢP LỆ -> Về trang chủ
  if (isAuthRoute && token) {
    try {
      const decoded = jwtDecode<UserJwtPayload>(token);
      if (decoded.exp > Math.floor(Date.now() / 1000)) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (e) {
      // Token lỗi thì kệ, cho ở lại trang login để login lại
    }
  }

  // 3. NẾU LÀ TRANG PUBLIC -> CHO QUA LUÔN (Không check token ở đây)
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 4. NẾU KHÔNG CÓ TOKEN (Và không phải trang public) -> Về Login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // 5. CHECK TOKEN CHO CÁC TRANG PRIVATE (Admin, Commerce...)
  try {
    const decoded = jwtDecode<UserJwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('accessToken');
      return response;
    }

    // ... Logic check Role của bạn giữ nguyên ở đây ...

  } catch (error) {
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('accessToken');
    return response;
  }

  return NextResponse.next();
}

// Routes to run middleware on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|videos).*)',
  ],
};
