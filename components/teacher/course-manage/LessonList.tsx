"use client";

import React from "react";
import { LessonCard } from "./LessonCard";

interface Lesson {
  _id: string;
  title: string;
  videoUrl: string;
  pdfUrl?: string;
  isFree: boolean;
}

interface LessonListProps {
  lessons: Lesson[];
  onDeleteLesson?: (id: string) => void;
}

export function LessonList({ lessons, onDeleteLesson }: LessonListProps) {
  if (lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
        <p className="text-base font-bold text-slate-600 dark:text-slate-400">
          لا توجد دروس مضافة لهذا الكورس حتى الآن
        </p>
        <p className="mt-1 text-xs text-slate-400">
          اضغط على زر "إضافة درس جديد" للبدء في رفع المحتوى.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {lessons.map((lesson, idx) => (
        <LessonCard
          key={lesson._id}
          index={idx}
          title={lesson.title}
          videoUrl={lesson.videoUrl}
          pdfUrl={lesson.pdfUrl}
          isFree={lesson.isFree}
          onDelete={() => onDeleteLesson?.(lesson._id)}
        />
      ))}
    </div>
  );
}