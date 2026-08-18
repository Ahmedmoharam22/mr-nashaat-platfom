import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connect";
import User from "@/models/User";

/**
 * Drop legacy non-sparse unique indexes on `email` and `phone` that were
 * created by older versions of the schema.  Mongoose won't auto-drop them
 * when the schema definition changes — they persist in the database until
 * explicitly removed.  After dropping, the schema-level index definitions
 * (sparse + unique) will recreate them correctly on next query/insert.
 */
async function ensureIndexes() {
  try {
    const collection = User.collection;

    // Get all current indexes
    const indexes = await collection.indexes();

    for (const idx of indexes) {
      // Skip the default _id index
      if (idx.name === "_id_") continue;

      const keyFields = Object.keys(idx.key ?? {});

      // Drop any non-sparse unique index on email or phone
      if (
        idx.unique &&
        !idx.sparse &&
        keyFields.length === 1 &&
        (keyFields[0] === "email" || keyFields[0] === "phone")
      ) {
        console.log(`[register] Dropping legacy non-sparse index: ${idx.name}`);
        await collection.dropIndex(idx.name!);
      }
    }

    // Let Mongoose rebuild the correct sparse+unique indexes
    await User.syncIndexes();
  } catch (err) {
    // If the collection doesn't exist yet, syncIndexes will create it.
    // Log but don't crash — first insert will create the collection anyway.
    console.warn("[register] ensureIndexes warning:", err);
  }
}

// Run once on cold-start (module-level promise, deduped by Node cache)
const indexReady = ensureIndexes();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, phone, password, parentPhone, grade, governorate } = body;

    // --- Basic server-side validation ---
    if (!firstName || !lastName || !phone || !password || !grade || !governorate) {
      return NextResponse.json(
        { error: "جميع الحقول المطلوبة يجب ملؤها." },
        { status: 400 }
      );
    }
    if (!/^[0-9]+$/.test(phone)) {
      return NextResponse.json(
        { error: "رقم الهاتف غير صحيح." },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "كلمة المرور يجب ألا تقل عن 6 أحرف." },
        { status: 400 }
      );
    }

    await connectDB();
    // Wait for legacy indexes to be cleaned up
    await indexReady;

    // التأكد من عدم تكرار رقم الهاتف
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { error: "رقم الهاتف مسجل بالفعل." },
        { status: 400 }
      );
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    // Explicitly do NOT pass `email` — leave it undefined so the sparse
    // unique index on email skips this document entirely.
    const newUser = await User.create({
      name: fullName,
      phone,
      password: hashedPassword,
      parentPhone: parentPhone || undefined,
      grade,
      governorate,
      role: "student",
      provider: "credentials",
    });

    return NextResponse.json(
      { message: "تم إنشاء الحساب بنجاح", userId: newUser._id },
      { status: 201 }
    );
  } catch (error: unknown) {
    // ---- Detailed error logging for debugging ----
    console.error("[register] Registration error:", error);

    // Handle MongoDB duplicate key error specifically
    if (
      error instanceof Error &&
      "code" in error &&
      (error as any).code === 11000
    ) {
      const keyPattern = (error as any).keyPattern ?? {};
      if (keyPattern.phone) {
        return NextResponse.json(
          { error: "رقم الهاتف مسجل بالفعل." },
          { status: 400 }
        );
      }
      if (keyPattern.email) {
        return NextResponse.json(
          { error: "البريد الإلكتروني مسجل بالفعل." },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "هذا الحساب موجود بالفعل." },
        { status: 400 }
      );
    }

    // Mongoose validation error
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "حدث خطأ أثناء التسجيل";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}