// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Các đường dẫn công khai không cần xác thực
  const publicPaths = ['/login', '/api'];

  // Nếu request url thuộc publicPaths, cho phép truy cập
  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Kiểm tra cookie có accessToken không
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    // Nếu chưa đăng nhập, chuyển hướng về trang /login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Bỏ qua các tài nguyên tĩnh, hình ảnh, favicon...
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
