import { create } from "zustand";

interface LessonType {
  _id: string;
  title: string;
  videoUrl: string;
  pdfUrl?: string;
  description?: string;
  order: number;
  isFree: boolean;
}

interface CourseType {
  _id: string;
  title: string;
  grade: string;
  price: number;
  isPublished: boolean;
  subject: string;
}

interface CourseStore {
  course: CourseType | null;
  lessons: LessonType[];
  setCourse: (course: CourseType) => void;
  togglePublish: () => void;
  setLessons: (lessons: LessonType[]) => void;
  addLesson: (lesson: LessonType) => void;
  removeLesson: (lessonId: string) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  course: null,
  lessons: [],
  setCourse: (course) => set({ course }),
  togglePublish: () =>
    set((state) =>
      state.course
        ? { course: { ...state.course, isPublished: !state.course.isPublished } }
        : state
    ),
  setLessons: (lessons) => set({ lessons }),
  addLesson: (lesson) =>
    set((state) => ({ lessons: [...state.lessons, lesson] })),
  removeLesson: (lessonId) =>
    set((state) => ({
      lessons: state.lessons.filter((l) => l._id !== lessonId),
    })),
}));