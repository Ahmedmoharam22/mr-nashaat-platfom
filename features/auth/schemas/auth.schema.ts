import { z } from "zod";

// ---------------------------------------------------------------------------
// Login Schema — Phone-based credentials
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "رقم الهاتف مطلوب.")
    .regex(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط."),
  password: z.string().min(1, "كلمة المرور مطلوبة."),
});

// ---------------------------------------------------------------------------
// Constants & Labels
// ---------------------------------------------------------------------------

export const GRADES = [
  "first_secondary",
  "second_secondary",
  "third_secondary",
] as const;

export const GRADE_LABELS: Record<(typeof GRADES)[number], string> = {
  first_secondary: "الأول الثانوي",
  second_secondary: "الثاني الثانوي",
  third_secondary: "الثالث الثانوي",
};

export const GOVERNORATES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية",
  "البحر الأحمر",
  "البحيرة",
  "الفيوم",
  "الغربية",
  "الإسماعيلية",
  "المنوفية",
  "المنيا",
  "القليوبية",
  "الوادي الجديد",
  "السويس",
  "أسوان",
  "أسيوط",
  "بني سويف",
  "بورسعيد",
  "دمياط",
  "الشرقية",
  "جنوب سيناء",
  "كفر الشيخ",
  "مطروح",
  "الأقصر",
  "قنا",
  "شمال سيناء",
  "سوهاج",
] as const;

// ---------------------------------------------------------------------------
// Multi-Step Registration Schemas
// ---------------------------------------------------------------------------

// Step 1: Personal information
export const registerStep1Schema = z.object({
  firstName: z.string().trim().min(2, "الاسم الأول يجب أن يكون حرفين على الأقل."),
  lastName: z.string().trim().min(2, "الاسم الأخير يجب أن يكون حرفين على الأقل."),
  phone: z
    .string()
    .trim()
    .min(1, "رقم الهاتف مطلوب.")
    .regex(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط."),
});

// Step 2: Account security
export const registerStep2Schema = z
  .object({
    password: z.string().min(6, "كلمة المرور يجب ألا تقل عن 6 أحرف."),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب."),
    parentPhone: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => !val || /^[0-9]+$/.test(val),
        "رقم هاتف ولي الأمر غير صحيح."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين.",
    path: ["confirmPassword"],
  });

// Step 3: Academic information
export const registerStep3Schema = z.object({
  grade: z.enum(GRADES, { error: "يرجى اختيار الصف الدراسي." }),
  governorate: z.enum(GOVERNORATES, { error: "يرجى اختيار المحافظة." }),
});

// Full registration payload schema
export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(1),
  password: z.string().min(6),
  parentPhone: z.string().optional(),
  grade: z.enum(GRADES),
  governorate: z.enum(GOVERNORATES),
  role: z.enum(["student", "teacher"]).default("student"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type Grade = (typeof GRADES)[number];
export type Governorate = (typeof GOVERNORATES)[number];