/**
 * Shared skeleton primitive components.
 * Pure RSC — no "use client" needed, zero runtime JS.
 */

interface SkeletonProps {
  className?: string;
}

/** A single pulsing placeholder block. */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-[var(--radius-md)] bg-[var(--color-border)] ${className}`}
    />
  );
}

/** Stat card skeleton — icon circle + two text lines. */
export function StatCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex items-center gap-4"
    >
      {/* Icon placeholder */}
      <Skeleton className="w-9 h-9 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-3.5 w-24" />
      </div>
    </div>
  );
}

/** Generic list-row skeleton — icon + two text lines. */
export function ListRowSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-3 py-3 border-b border-[var(--color-border)] last:border-0"
    >
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className={`h-3.5 ${wide ? "w-3/4" : "w-1/2"}`} />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full shrink-0" />
    </div>
  );
}

/** Section card wrapper with title + children. */
export function SectionCardSkeleton({
  children,
  titleWidth = "w-32",
}: {
  children: React.ReactNode;
  titleWidth?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 space-y-4"
    >
      <Skeleton className={`h-4 ${titleWidth}`} />
      {children}
    </div>
  );
}

/** Progress bar skeleton. */
export function ProgressBarSkeleton({ label = true }: { label?: boolean }) {
  return (
    <div aria-hidden="true" className="space-y-1.5">
      {label && (
        <div className="flex justify-between">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-8" />
        </div>
      )}
      <div className="h-2.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
        <div className="h-full w-2/5 animate-pulse rounded-full bg-[var(--color-primary)]/20" />
      </div>
    </div>
  );
}

/** Quick-action button skeleton. */
export function QuickActionSkeleton() {
  return (
    <Skeleton className="h-10 w-full rounded-[var(--radius-md)]" />
  );
}

/** Dashboard page header skeleton. */
export function HeaderSkeleton() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3">
      <Skeleton className="w-7 h-7 rounded-full shrink-0" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3.5 w-64" />
      </div>
    </div>
  );
}

/** Course card skeleton (used in student enrolled courses grid). */
export function CourseCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden"
    >
      {/* Cover image placeholder */}
      <Skeleton className="h-36 w-full rounded-none" />
      <div className="p-4 space-y-2.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <ProgressBarSkeleton label={false} />
      </div>
    </div>
  );
}
