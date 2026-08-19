"use client";

import React, { useState, useEffect } from "react";
import { use } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { CourseHeader } from "@/components/teacher/course-manage/CourseHeader";
import { LessonList } from "@/components/teacher/course-manage/LessonList";
import { AddLessonModal } from "@/components/teacher/AddLessonModal";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ManageCoursePage({ params }: Props) {
  const { id } = use(params);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { course, setCourse, lessons, setLessons, removeLesson } = useCourseStore();

  useEffect(() => {
    async function loadCourseData() {
      try {
        setLoading(true);
        setError("");

        const [courseRes, lessonsRes] = await Promise.all([
          fetch(`/api/courses/${id}`),
          fetch(`/api/courses/${id}/lessons`),
        ]);

        if (!courseRes.ok) throw new Error("فشل في جلب بيانات الكورس");

        const courseData = await courseRes.json();
        setCourse(courseData.course);

        if (lessonsRes.ok) {
          const lessonsData = await lessonsRes.json();
          setLessons(lessonsData.lessons ?? []);
        }
      } catch (err: any) {
        setError(err.message ?? "حدث خطأ غير متوقع");
      } finally {
        setLoading(false);
      }
    }

    loadCourseData();
  }, [id, setCourse, setLessons]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center pt-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="p-8 text-center pt-24">
        <p className="text-red-500 font-bold">{error || "عذراً، لم يتم العثور على الكورس المطلوب."}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* 1. الهيدر ببيانات حقيقية */}
      <CourseHeader
        title={course.title}
        grade={course.grade}
        price={course.price}
        isPublished={course.isPublished}
        onOpenAddModal={() => setIsModalOpen(true)}
      />

      {/* 2. قائمة الدروس */}
      <div className="space-y-4">
        <h3 className="font-amin text-xl font-bold text-slate-900 dark:text-slate-100">
          محتوى الكورس ({lessons.length} درس)
        </h3>
        <LessonList lessons={lessons} onDeleteLesson={removeLesson} />
      </div>

      {/* 3. Modal الإضافة */}
      <AddLessonModal
        courseId={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}