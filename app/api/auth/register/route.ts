import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connect";
import User from "@/models/User";
import { registerSchema } from "@/features/auth/schemas/auth.schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validation بواسطة Zod
    const validatedData = registerSchema.parse(body);

    await connectDB();

    // التأكد من عدم تكرار البريد
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مسجل بالفعل." },
        { status: 400 }
      );
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // حظر حقل grade إذا كان نوع الحساب معلم
    const userDataToSave = {
      ...validatedData,
      password: hashedPassword,
      grade: validatedData.role === "teacher" ? undefined : validatedData.grade,
    };

    const newUser = await User.create(userDataToSave);

    return NextResponse.json(
      { message: "تم إنشاء الحساب بنجاح", userId: newUser._id },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "حدث خطأ أثناء التسجيل" },
      { status: 500 }
    );
  }
}