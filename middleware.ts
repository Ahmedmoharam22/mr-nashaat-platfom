import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  });
  const { pathname } = req.nextUrl;

  // المسارات المحمية وقواعد الأدوار
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboard = pathname.startsWith("/dashboard");
  const isTeacherRoute = pathname.startsWith("/dashboard/teacher");
  const isStudentRoute = pathname.startsWith("/dashboard/student");

  // 1. لو مستخدم محروق/مش مسجل وبيحاول يدخل الدواخل -> وّديه اللوجن
  if (!token && isDashboard) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. لو مسجل دخول وبيحاول يفتح صفحة التسجيل أو اللوجن -> وّديه للداشبورد فوراً
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3. التحقق من الصلاحيات حسب الدور (Role Protection)
  if (token) {
    if (isTeacherRoute && token.role !== "teacher" && (token.role as string) !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (isStudentRoute && token.role !== "student" && (token.role as string) !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};