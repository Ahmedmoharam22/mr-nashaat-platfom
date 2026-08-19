"use client";

import React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { formatGrade, formatPrice } from "@/lib/utils/formatGrade";

interface CourseHeaderProps {
  title: string;
  grade: string;
  price: number;
  isPublished: boolean;
  onOpenAddModal: () => void;
}

export function CourseHeader({
  title,
  grade,
  price,
  isPublished,
  onOpenAddModal,
}: CourseHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <BackButton fallbackUrl="/dashboard/teacher" label="العودة للكورسات" />
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
              isPublished
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
                : "bg-amber-50 text-amber-600 dark:bg-amber-950/50"
            }`}
          >
            {isPublished ? "منشور" : "مسودة"}
          </span>
        </div>

        <h1 className="font-amin text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
          {title}
        </h1>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 flex-wrap">
          <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md">
            {formatGrade(grade)}
          </span>
          <span>•</span>
          <span className="font-extrabold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 text-xs px-2.5 py-1 rounded-md">
            {formatPrice(price)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenAddModal}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-amber-400 active:scale-95 cursor-pointer"
      >
        <span>+</span> إضافة درس جديد
      </button>
    </div>
  );
}
