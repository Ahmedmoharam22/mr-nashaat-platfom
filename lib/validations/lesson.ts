import { z } from "zod";

export const createLessonSchema = z.object({
  title: z.string().min(3, "عنوان الدرس يجب أن يكون 3 حروف على الأقل"),
  videoUrl: z.string().url("يرجى إدخال رابط فيديو صحيح"),
  pdfUrl: z.string().url("يرجى إدخال رابط PDF صحيح").optional().or(z.literal("")),
  description: z.string().optional(),
  order: z.number().default(1),
  isFree: z.boolean().default(false),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;