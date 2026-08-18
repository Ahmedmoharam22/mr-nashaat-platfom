import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/connect";
import Course from "@/models/Course";
import { LayoutDashboard, BookOpen, Users, Plus, FileText } from "lucide-react";
import TeacherDashboardSkeleton from "@/components/skeletons/TeacherDashboardSkeleton";

// خريطة لتنسيق أسماء المواد بالعربي
const subjectLabels: Record<string, string> = {
  history: "تاريخ",
  geography: "جغرافيا",
  geology: "جيولوجيا",
};

// ─── Inner async component (data-fetching boundary) ─────────────────────────
async function TeacherDashboardContent() {
  const session = await auth();

  if (!session || session.user.role !== "teacher") {
    redirect("/dashboard");
  }

  // الاتصال بالداتابيز وإحضار بيانات المعلم فقط
  await connectDB();

  const [coursesCount, courses] = await Promise.all([
    Course.countDocuments({ teacher: session.user.id }),
    Course.find({ teacher: session.user.id })
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  return (
    <div className="w-full bg-[var(--color-bg)] p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header with Quick Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-7 h-7 text-[var(--color-accent)]" />
            <div>
              <h1 className="text-2xl font-extrabold text-[var(--color-primary)]">
                لوحة تحكم المعلم
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)]">
                مرحباً {session.user.name}، إدارة كورساتك من هنا.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/teacher/courses/new"
            className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-primary)] text-slate-950 hover:text-[var(--color-primary-active)] text-sm font-medium rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            كورس جديد
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex items-center gap-4">
            <BookOpen className="w-9 h-9 text-[var(--color-primary)] shrink-0" />
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)]">
                {coursesCount}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                كورسات منشورة
              </p>
            </div>
          </div>

          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex items-center gap-4">
            <Users className="w-9 h-9 text-[var(--color-accent)] shrink-0" />
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)]">0</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                طلاب مشتركين
              </p>
            </div>
          </div>

          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex items-center gap-4">
            <FileText className="w-9 h-9 text-[var(--color-success)] shrink-0" />
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)]">0</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                دروس مرفوعة
              </p>
            </div>
          </div>
        </div>

        {/* قائمة الكورسات المنشورة */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--color-primary)]">
            الكورسات الحالية
          </h2>

          {courses.length === 0 ? (
            <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-[var(--color-text-secondary)] mx-auto opacity-50" />
              <p className="text-sm text-[var(--color-text-secondary)]">
                لم تقم بإنشاء أي كورسات حتى الآن.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course: any) => (
                <div
                  key={course._id.toString()}
                  className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2.5 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full font-medium">
                        {subjectLabels[course.subject] ?? course.subject}
                      </span>
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {course.price > 0 ? `${course.price} ج.م` : "مجاني"}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-[var(--color-primary)]">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                    <Link
                      href={`/dashboard/teacher/courses/${course._id}`}
                      className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
                    >
                      إدارة الدروس والمحتوى ←
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Page export ─────────────────────────────────────────────────────────────
export default function TeacherDashboardPage() {
  return (
    <Suspense fallback={<TeacherDashboardSkeleton />}>
      <TeacherDashboardContent />
    </Suspense>
  );
}