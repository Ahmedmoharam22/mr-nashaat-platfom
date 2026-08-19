"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCourseSchema } from "@/features/courses/schemas/course.schema";
import { Loader2, PlusCircle } from "lucide-react";

// Use the *output* type (after coercion + defaults) so price is `number`, not `unknown`
type CreateCourseFormValues = z.output<typeof createCourseSchema>;


const gradeOptions = [
  { value: "first_prep", label: "الصف الأول الإعدادي" },
  { value: "second_prep", label: "الصف الثاني الإعدادي" },
  { value: "third_prep", label: "الصف الثالث الإعدادي" },
  { value: "first_secondary", label: "الصف الأول الثانوي" },
  { value: "second_secondary", label: "الصف الثاني الثانوي" },
  { value: "third_secondary", label: "الصف الثالث الثانوي" },
];

export default function CreateCourseForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<CreateCourseFormValues>({ resolver: zodResolver(createCourseSchema) as any });

  const onSubmit = async (data: CreateCourseFormValues) => {
    setServerError(null);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "حدث خطأ أثناء إضافة الكورس");
      }

      // توجيه المعلم لصفحة لوحة التحكم بعد النجاح
      router.push("/dashboard/teacher");
      router.refresh();
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 space-y-5"
    >
      {serverError && (
        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-md border border-red-200 dark:border-red-800">
          {serverError}
        </div>
      )}

      {/* عنوان الكورس */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-[var(--color-primary)]">
          عنوان الكورس
        </label>
        <input
          {...register("title")}
          type="text"
          placeholder="مثال: الشامل في الفيزياء - الصف الأول الثانوي"
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* الصف الدراسي */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-[var(--color-primary)]">
          الصف الدراسي
        </label>
        <select
          {...register("grade")}
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
        >
          <option value="">اختر الصف الدراسي...</option>
          {gradeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.grade && (
          <p className="text-xs text-red-500">{errors.grade.message}</p>
        )}
      </div>
      {/* المادة الدراسية */}
<div className="space-y-1.5">
  <label className="block text-sm font-semibold text-[var(--color-primary)]">
    المادة الدراسية
  </label>
  <select
    {...register("subject")}
    className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
  >
    <option value="">اختر المادة...</option>
    <option value="history">تاريخ</option>
    <option value="geography">جغرافيا</option>
    <option value="geology">جيولوجيا</option>
  </select>
  {errors.subject && (
    <p className="text-xs text-red-500">{errors.subject.message}</p>
  )}
</div>

      {/* وصف الكورس */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-[var(--color-primary)]">
          وصف الكورس
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="اكتب نبذة مختصرة عما سيتعلمه الطالب في هذا الكورس..."
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm resize-none"
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* السعر وصورة الغلاف */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-[var(--color-primary)]">
            السعر (جنيه)
          </label>
          <input
            {...register("price")}
            type="number"
            min={0}
            placeholder="0"
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
          />
          {errors.price && (
            <p className="text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-[var(--color-primary)]">
            رابط صورة الغلاف (اختياري)
          </label>
          <input
            {...register("coverImage")}
            type="url"
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
          />
          {errors.coverImage && (
            <p className="text-xs text-red-500">{errors.coverImage.message}</p>
          )}
        </div>
      </div>

      {/* زر الحفظ */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-primary)] text-slate-950 hover:text-[var(--color-primary-active)] font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 text-sm cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            جاري الإنشاء...
          </>
        ) : (
          <>
            <PlusCircle className="w-4 h-4" />
            إنشاء الكورس
          </>
        )}
      </button>
    </form>
  );
}