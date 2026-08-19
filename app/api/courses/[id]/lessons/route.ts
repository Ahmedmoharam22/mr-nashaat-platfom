import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import { createLessonSchema } from "@/lib/validations/lesson";

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/courses/[id]/lessons — Fetch all lessons for a course */
export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    await connectDB();

    const lessons = await Lesson.find({ course: id })
      .sort({ order: 1 })
      .lean();

    return NextResponse.json({ lessons }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "حدث خطأ أثناء جلب الدروس" },
      { status: 500 }
    );
  }
}

/** POST /api/courses/[id]/lessons — Teacher only: add a lesson to a course */
export async function POST(req: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "غير مصرح لك بإضافة دروس" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    // Verify course ownership
    const course = await Course.findOne({ _id: id, teacher: session.user.id });

    if (!course) {
      return NextResponse.json(
        { error: "الكورس غير موجود أو لا تملك صلاحية الإضافة" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const validatedData = createLessonSchema.parse(body);

    // Auto-calculate order (append to end)
    const lastLesson = await Lesson.findOne({ course: id })
      .sort({ order: -1 })
      .lean();
    const order = lastLesson ? (lastLesson as any).order + 1 : 1;

    const lesson = await Lesson.create({
      ...validatedData,
      course: id,
      order,
      pdfUrl: validatedData.pdfUrl || undefined,
    });

    return NextResponse.json(
      { message: "تم إضافة الدرس بنجاح", lesson },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "فشل في إضافة الدرس" },
      { status: 500 }
    );
  }
}