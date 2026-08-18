import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GraduationCap, BookOpen, ClipboardList } from "lucide-react";
import StudentDashboardSkeleton from "@/components/skeletons/StudentDashboardSkeleton";

// ─── Grade label map ─────────────────────────────────────────────────────────
const gradeLabels: Record<string, string> = {
  first_prep: "الصف الأول الإعدادي",
  second_prep: "الصف الثاني الإعدادي",
  third_prep: "الصف الثالث الإعدادي",
  first_secondary: "الصف الأول الثانوي",
  second_secondary: "الصف الثاني الثانوي",
  third_secondary: "الصف الثالث الثانوي",
};

// ─── Inner async component (data-fetching boundary) ─────────────────────────
async function StudentDashboardContent() {
  const session = await auth();

  if (!session || session.user.role !== "student") {
    redirect("/dashboard");
  }

  const grade = session.user.grade
    ? gradeLabels[session.user.grade] ?? session.user.grade
    : "غير محدد";

  return (
    <div className=" bg-[var(--color-bg)] p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <GraduationCap className="w-7 h-7 text-[var(--color-accent)]" />
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--color-primary)]">
              لوحة الطالب
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              مرحباً {session.user.name} — {grade}
            </p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex items-center gap-4">
            <BookOpen className="w-9 h-9 text-[var(--color-primary)] shrink-0" />
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)]">0</p>
              <p className="text-sm text-[var(--color-text-secondary)]">كورسات مشترك فيها</p>
            </div>
          </div>
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex items-center gap-4">
            <ClipboardList className="w-9 h-9 text-[var(--color-accent)] shrink-0" />
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)]">0</p>
              <p className="text-sm text-[var(--color-text-secondary)]">اختبارات مكتملة</p>
            </div>
          </div>
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex items-center gap-4">
            <GraduationCap className="w-9 h-9 text-[var(--color-success)] shrink-0" />
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)]">0%</p>
              <p className="text-sm text-[var(--color-text-secondary)]">متوسط الدرجات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page export — Suspense wraps the async content ─────────────────────────
export default function StudentDashboardPage() {
  return (
    <Suspense fallback={<StudentDashboardSkeleton />}>
      <StudentDashboardContent />
    </Suspense>
  );
}
