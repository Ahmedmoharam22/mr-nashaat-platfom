import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/courses/[id] — Get single course by ID */
export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    await connectDB();

    const course = await Course.findById(id).lean();

    if (!course) {
      return NextResponse.json({ error: "الكورس غير موجود" }, { status: 404 });
    }

    return NextResponse.json({ course }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "حدث خطأ أثناء جلب بيانات الكورس" },
      { status: 500 }
    );
  }
}

/** PATCH /api/courses/[id] — Teacher only: update course metadata */
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "غير مصرح لك بالتعديل" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const course = await Course.findOneAndUpdate(
      { _id: id, teacher: session.user.id },
      { $set: body },
      { new: true }
    );

    if (!course) {
      return NextResponse.json(
        { error: "الكورس غير موجود أو لا تملك صلاحية التعديل" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "تم تحديث بيانات الكورس بنجاح", course },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "فشل في تحديث الكورس" },
      { status: 500 }
    );
  }
}

/** DELETE /api/courses/[id] — Teacher only: delete course + all its lessons */
export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "غير مصرح لك بالحذف" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const course = await Course.findOneAndDelete({
      _id: id,
      teacher: session.user.id,
    });

    if (!course) {
      return NextResponse.json(
        { error: "الكورس غير موجود أو لا تملك صلاحية الحذف" },
        { status: 404 }
      );
    }

    // Cascade delete all lessons belonging to this course
    await Lesson.deleteMany({ course: id });

    return NextResponse.json(
      { message: "تم حذف الكورس وجميع دروسه بنجاح" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "فشل في حذف الكورس" },
      { status: 500 }
    );
  }
}
