"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCourseStore } from "@/store/useCourseStore";

interface AddLessonModalProps {
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface LessonFormData {
  title: string;
  videoUrl: string;
  pdfUrl?: string;
  description?: string;
  isFree: boolean;
}

export function AddLessonModal({ courseId, isOpen, onClose }: AddLessonModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const addLesson = useCourseStore((state) => state.addLesson);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LessonFormData>();

  if (!isOpen) return null;

  const onSubmit = async (data: LessonFormData) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/courses/${courseId}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "فشل في إضافة الدرس");
      }

      addLesson(result.lesson);
      reset();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl">
        <h3 className="font-amin text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          إضافة درس جديد
        </h3>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              عنوان الدرس
            </label>
            <input
              {...register("title", { required: "عنوان الدرس مطلوب" })}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="مثال: الحملة الفرنسية على مصر"
            />
            {errors.title && (
              <span className="text-xs text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              رابط الفيديو (Vimeo / YouTube / Bunny)
            </label>
            <input
              {...register("videoUrl", { required: "رابط الفيديو مطلوب" })}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="https://..."
            />
            {errors.videoUrl && (
              <span className="text-xs text-red-500">{errors.videoUrl.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              رابط المذكرة / PDF (اختياري)
            </label>
            <input
              {...register("pdfUrl")}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFree"
              {...register("isFree")}
              className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <label htmlFor="isFree" className="text-sm text-slate-700 dark:text-slate-300">
              معاينة مجانية (متاح للجميع بدون اشتراك)
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-amber-500 px-6 py-2 text-sm font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50"
            >
              {loading ? "جاري الحفظ..." : "حفظ الدرس"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}