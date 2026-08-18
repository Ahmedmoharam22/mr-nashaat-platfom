import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILesson extends Document {
  title: string;
  description?: string;
  videoUrl: string;       // رابط فيديو الشرح (Cloudinary / YouTube / Uploadthing)
  pdfUrl?: string;        // رابط ملزمة الشرح PDF
  course: mongoose.Types.ObjectId; // مرجع للكورس التابع له الدرس
  order: number;          // ترتيب الدرس جوه الكورس (الدرس 1، الدرس 2...)
  isFree: boolean;        // هل الدرس مجاني كـ Preview للطالب؟
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: [true, "عنوان الدرس مطلوب."],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: [true, "رابط الفيديو مطلوب."],
      trim: true,
    },
    pdfUrl: {
      type: String,
      trim: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "الدرس يجب أن يكون تابعاً لكورس."],
    },
    order: {
      type: Number,
      required: true,
      default: 1,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index للبحث السريع عن دروس كورس معين مرتبة برقم الدرس
lessonSchema.index({ course: 1, order: 1 });

const Lesson: Model<ILesson> =
  (mongoose.models.Lesson as Model<ILesson>) ||
  mongoose.model<ILesson>("Lesson", lessonSchema);

export default Lesson;