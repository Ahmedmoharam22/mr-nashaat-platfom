import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح."),
  password: z.string().min(6, "كلمة المرور يجب ألا تقل عن 6 أحرف."),
});

export const registerSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل."),
  email: z.string().email("البريد الإلكتروني غير صحيح."),
  password: z.string().min(6, "كلمة المرور يجب ألا تقل عن 6 أحرف."),
  role: z.enum(["student", "teacher"]).default("student"),
  grade: z.enum([
    "first_prep", "second_prep", "third_prep",
    "first_secondary", "second_secondary", "third_secondary"
  ]).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;