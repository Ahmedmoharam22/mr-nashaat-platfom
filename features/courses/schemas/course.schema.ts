import { z } from "zod";

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(3, "عنوان الكورس يجب أن يكون 3 أحرف على الأقل")
    .max(100, "العنوان طويل جداً"),
  description: z
    .string()
    .min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
  grade: z.enum(
    [
      "first_prep",
      "second_prep",
      "third_prep",
      "first_secondary",
      "second_secondary",
      "third_secondary",
    ],
    { required_error: "يرجى اختيار الصف الدراسي" }
  ),
  subject: z.enum(["history", "geography", "geology"], {
    required_error: "يرجى اختيار المادة الدراسية",
  }),
  price: z.coerce.number().min(0, "السعر لا يمكن أن يكون بالسالب").default(0),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;