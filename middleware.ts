// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Các đường dẫn công khai không cần xác thực
  const publicPaths = ['/login', '/api'];
  const pathname = request.nextUrl.pathname

  // Nếu request url thuộc publicPaths, cho phép truy cập
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Kiểm tra cookie có accessToken không
  const accessToken = request.cookies.get('accessToken')?.value;
  console.log(accessToken);
  if (!accessToken) {
    // Nếu chưa đăng nhập, chuyển hướng về trang /login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  const user = request.cookies.get('role')?.value;
  console.log(user);

  if (pathname.startsWith('/dashboard') && user !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();
}

export const config = {
  // Bỏ qua các tài nguyên tĩnh, hình ảnh, favicon...
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
