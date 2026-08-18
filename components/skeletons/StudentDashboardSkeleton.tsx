/**
 * StudentDashboardSkeleton
 *
 * Mirrors the exact layout of app/dashboard/student/page.tsx:
 *   - Page header (icon + title + subtitle)
 *   - 3-column stat cards row
 *   - Enrolled courses grid (2×2 course cards with cover + progress)
 *   - Two-column: Upcoming homework/quizzes list + Recent grades overview
 *
 * Pure RSC — no runtime JS.
 */

import {
  CourseCardSkeleton,
  HeaderSkeleton,
  ListRowSkeleton,
  ProgressBarSkeleton,
  SectionCardSkeleton,
  Skeleton,
  StatCardSkeleton,
} from "@/components/ui/skeleton";

export default function StudentDashboardSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="جارٍ تحميل لوحة الطالب"
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

        {/* ── Overall Progress Indicators ─────────────────── */}
        <SectionCardSkeleton titleWidth="w-36">
          <div className="space-y-4">
            <ProgressBarSkeleton />
            <ProgressBarSkeleton />
            <ProgressBarSkeleton />
          </div>
        </SectionCardSkeleton>

        {/* ── Enrolled Courses Grid ────────────────────────── */}
        <div aria-hidden="true" className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
          </div>
        </div>

        {/* ── Two-column: Homework/Quizzes + Recent Grades ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upcoming homework / quizzes */}
          <SectionCardSkeleton titleWidth="w-44">
            {Array.from({ length: 4 }).map((_, i) => (
              <ListRowSkeleton key={i} wide={i % 2 === 0} />
            ))}
          </SectionCardSkeleton>

          {/* Recent grades overview */}
          <SectionCardSkeleton titleWidth="w-36">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5 border-b border-[var(--color-border)] last:border-0"
              >
                <div className="flex-1 space-y-1.5">
                  <Skeleton className={`h-3.5 ${i % 2 === 0 ? "w-3/4" : "w-1/2"}`} />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                {/* Grade badge */}
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <Skeleton className="h-8 w-12 rounded-[var(--radius-sm)]" />
                  <Skeleton className="h-2.5 w-10" />
                </div>
              </div>
            ))}
          </SectionCardSkeleton>
        </div>
      </div>
    </div>
  );
}
