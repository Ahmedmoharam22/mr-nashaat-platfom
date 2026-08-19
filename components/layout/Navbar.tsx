"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User, LayoutDashboard, BookOpen, Plus, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTeacher = (session?.user as any)?.role === "teacher";

  return (
    <header className="fixed top-4 inset-x-0 z-50 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Floating Container with Glassmorphism */}
      <div className="w-full h-16 px-5 sm:px-8 flex items-center justify-between rounded-2xl bg-[var(--color-bg-elevated)]/90 backdrop-blur-md border border-[var(--color-border)] shadow-lg shadow-black/5 transition-all duration-300">
        
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
        <div className="flex items-center gap-2 sm:gap-3">
          {isLoading ? (
            <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-[var(--radius-md)]" />
          ) : session ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Teacher Specific Navigation */}
              {isTeacher ? (
                <>
                  {/* Courses List Link */}
                  {/* <Link
                    href="/dashboard/teacher"
                    className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-[var(--color-text-primary)] hover:text-amber-600 border border-transparent hover:border-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors duration-200"
                  >
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span>قائمة الكورسات</span>
                  </Link> */}

                  {/* Create New Course CTA */}
                  {/* <Link
                    href="/dashboard/teacher/courses/new"
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] border border-[var(--color-primary)] text-slate-950 rounded-xl transition-all duration-200 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ كورس جديد</span>
                  </Link> */}
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:text-amber-600 border border-transparent hover:border-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors duration-200"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>لوحة التحكم</span>
                </Link>
              )}

              {/* User Info */}
              <div className="flex items-center gap-2 pl-1 pr-2 sm:pr-3 border-r border-[var(--color-border)]">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm">
                  {session.user?.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                </div>
                <div className="hidden md:flex flex-col text-xs">
                  <span className="font-semibold text-[var(--color-text-primary)] leading-tight">
                    {session.user?.name}
                  </span>
                  <span className="text-[var(--color-text-secondary)] capitalize leading-tight">
                    {isTeacher ? "معلم" : "طالب"}
                  </span>
                </div>
              </div>

              {/* Sign out button */}
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="p-2 text-red-500 hover:text-red-600 border border-transparent hover:border-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200 cursor-pointer"
                title="تسجيل الخروج"
                type="button"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 rounded-lg"
                aria-label="القائمة"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

      {/* Mobile Drawer Menu for Teachers and Students */}
      {mobileMenuOpen && session && (
        <div className="sm:hidden mt-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-3">
          {isTeacher ? (
            <>
              <Link
                href="/dashboard/teacher"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>قائمة الكورسات</span>
              </Link>

              <Link
                href="/dashboard/teacher/courses/new"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 p-2.5 text-sm font-bold bg-[var(--color-primary)] text-slate-950 rounded-xl shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>+ إنشاء كورس جديد</span>
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard/student"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-500" />
              <span>لوحة تحكم الطالب</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}