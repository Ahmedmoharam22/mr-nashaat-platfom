import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboard = pathname.startsWith("/dashboard");
  const isTeacherRoute = pathname.startsWith("/dashboard/teacher");
  const isStudentRoute = pathname.startsWith("/dashboard/student");

  // 1. If not logged in and accessing protected dashboard routes -> redirect to login with callbackUrl
  if (!isLoggedIn && isDashboard) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If logged in and accessing login or register -> redirect directly to appropriate dashboard based on role
  if (isLoggedIn && isAuthPage) {
    const target = userRole === "student" ? "/dashboard/student" : "/dashboard/teacher";
    return NextResponse.redirect(new URL(target, req.url));
  }

  // 3. Role-based route protection
  if (isLoggedIn) {
    if (isTeacherRoute && userRole !== "teacher" && userRole !== "admin") {
      const target = userRole === "student" ? "/dashboard/student" : "/dashboard";
      return NextResponse.redirect(new URL(target, req.url));
    }
    if (isStudentRoute && userRole !== "student" && userRole !== "admin") {
      const target = userRole === "teacher" ? "/dashboard/teacher" : "/dashboard";
      return NextResponse.redirect(new URL(target, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};