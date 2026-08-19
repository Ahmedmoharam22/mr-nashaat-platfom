import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreateCourseForm from "@/components/teacher/CreateCourseForm";
import { BackButton } from "@/components/ui/BackButton";
import { BookPlus } from "lucide-react";

export default async function NewCoursePage() {
  const session = await auth();

  if (!session || session.user.role !== "teacher") {
    redirect("/dashboard");
  }

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookPlus className="w-7 h-7 text-[var(--color-accent)]" />
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--color-primary)]">
              إضافة كورس جديد
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              أنشئ كورساً جديداً وابدأ في رفع الدروس والملازم لطلابك.
            </p>
          </div>
        </div>

        <BackButton fallbackUrl="/dashboard/teacher" />
      </div>

      <CreateCourseForm />
    </div>
  );
}
