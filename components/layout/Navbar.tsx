"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="fixed top-4 inset-x-0 z-50 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Floating Container with Glassmorphism */}
      <div className="w-full h-16 px-5 sm:px-8 flex items-center justify-between rounded-2xl bg-[var(--color-bg-elevated)]/80 backdrop-blur-md border border-[var(--color-border)] shadow-lg shadow-black/5 transition-all duration-300">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-[var(--color-primary)] hover:opacity-90 transition">
          <Image
            src="/images/main-logo.png"
            alt="كلام مؤرخين - مستر نشأت"
            width={60}
            height={60}
            className="h-auto w-auto object-contain"
          />
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-[var(--radius-md)]" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:text-amber-600 border border-transparent hover:border-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors duration-200"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>لوحة التحكم</span>
              </Link>

              <div className="flex items-center gap-2 pl-1 pr-3 border-r border-[var(--color-border)]">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {session.user?.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                </div>
                <div className="hidden md:flex flex-col text-xs">
                  <span className="font-semibold text-[var(--color-text-primary)] leading-tight">
                    {session.user?.name}
                  </span>
                  <span className="text-[var(--color-text-secondary)] capitalize leading-tight">
                    {(session.user as any)?.role === "teacher" ? "معلم" : "طالب"}
                  </span>
                </div>
              </div>
<button
  onClick={() => signOut({ callbackUrl: "/login" })}
  className="p-2 text-red-500 hover:text-red-600 border border-transparent hover:border-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200 cursor-pointer"
  title="تسجيل الخروج"
  type="button"
>
  <LogOut className="w-5 h-5" />
</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)] hover:text-amber-600 border border-transparent hover:border-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors duration-200"
              >
                دخول
              </Link>
              <Link
                href="/register"
                className="px-4.5 py-2 text-sm font-semibold bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-primary)] text-slate-950 hover:text-[var(--color-primary-active)] rounded-xl transition-colors duration-200"
              >
                حساب جديد
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}