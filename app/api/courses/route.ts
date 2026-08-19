import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connect";
import Course from "@/models/Course";
import { createCourseSchema } from "@/features/courses/schemas/course.schema";

function slugify(text: string) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

/** GET /api/courses — Public: list all published courses */
export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "حدث خطأ أثناء جلب الكورسات" },
      { status: 500 }
    );
  }
}

/** POST /api/courses — Teacher only: create new course */
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "teacher") {
      return NextResponse.json(
        { error: "غير مصرح لك بإنشاء كورسات." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = createCourseSchema.parse(body);

    await connectDB();

    const generatedSlug = `${slugify(validatedData.title)}-${Date.now()}`;

    const newCourse = await Course.create({
      ...validatedData,
      teacher: session.user.id,
      slug: generatedSlug,
    });

    return NextResponse.json(
      { message: "تم إنشاء الكورس بنجاح", course: newCourse },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "حدث خطأ أثناء إنشاء الكورس" },
      { status: 500 }
    );
  }
}