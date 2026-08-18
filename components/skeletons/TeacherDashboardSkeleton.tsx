/**
 * TeacherDashboardSkeleton
 *
 * Mirrors the exact layout of app/dashboard/teacher/page.tsx:
 *   - Page header (icon + title + subtitle)
 *   - 3-column stat cards row
 *   - Recent student assignments table section
 *   - Upcoming schedule / lectures list section
 *   - Quick action bar (3 CTA buttons)
 *
 * Pure RSC — no runtime JS.
 */

import {
  HeaderSkeleton,
  ListRowSkeleton,
  QuickActionSkeleton,
  SectionCardSkeleton,
  Skeleton,
  StatCardSkeleton,
} from "@/components/ui/skeleton";

export default function TeacherDashboardSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="جارٍ تحميل لوحة تحكم المعلم"
      className="min-h-screen bg-[var(--color-bg)] p-6"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ── Header ──────────────────────────────────────── */}
        <HeaderSkeleton />

        {/* ── Stat Cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        {/* ── Recent Student Assignments ───────────────────── */}
        <SectionCardSkeleton titleWidth="w-44">
          {/* Table header row */}
          <div className="grid grid-cols-4 gap-3 pb-2 border-b border-[var(--color-border)]">
            {["w-28", "w-20", "w-16", "w-16"].map((w, i) => (
              <Skeleton key={i} className={`h-3 ${w}`} />
            ))}
          </div>
          {/* Table body rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-3 items-center py-2.5 border-b border-[var(--color-border)] last:border-0">
              <div className="flex items-center gap-2 col-span-1">
                <Skeleton className="w-7 h-7 rounded-full shrink-0" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          ))}
        </SectionCardSkeleton>

        {/* ── Two-column: Schedule + Quick Actions ─────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upcoming schedule / lectures */}
          <SectionCardSkeleton titleWidth="w-40">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-[var(--color-border)] last:border-0"
              >
                {/* Date badge */}
                <div className="shrink-0 flex flex-col items-center gap-1 w-10">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-5 w-8 rounded-[var(--radius-sm)]" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full shrink-0" />
              </div>
            ))}
          </SectionCardSkeleton>

          {/* Quick action bar */}
          <div
            aria-hidden="true"
            className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 space-y-4"
          >
            <Skeleton className="h-4 w-28" />
            <p className="sr-only">أزرار الإجراءات السريعة</p>
            <div className="space-y-3">
              <QuickActionSkeleton />
              <QuickActionSkeleton />
              <QuickActionSkeleton />
            </div>
            <div className="pt-2 border-t border-[var(--color-border)]">
              <Skeleton className="h-3 w-40 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
