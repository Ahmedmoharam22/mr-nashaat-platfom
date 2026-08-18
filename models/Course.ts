import mongoose, { Document, Model, Schema } from "mongoose";

export type Subject = "history" | "geography" | "geology";

export type Grade =
  | "first_prep"
  | "second_prep"
  | "third_prep"
  | "first_secondary"
  | "second_secondary"
  | "third_secondary";

export interface ICourse extends Document {
  title: string;
  description: string;
  slug: string;
  subject: Subject;
  grade: Grade;
  coverImage?: string;
  isPublished: boolean;
  price: number;
  teacher: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "عنوان الكورس مطلوب."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "وصف الكورس مطلوب."],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      enum: {
        values: ["history", "geography", "geology"] satisfies Subject[],
        message: "المادة يجب أن تكون: تاريخ، جغرافيا، أو جيولوجيا.",
      },
      required: [true, "المادة المنهجية مطلوبة."],
    },
    grade: {
      type: String,
      enum: {
        values: [
          "first_prep",
          "second_prep",
          "third_prep",
          "first_secondary",
          "second_secondary",
          "third_secondary",
        ] satisfies Grade[],
        message: "الصف الدراسي غير صالح.",
      },
      required: [true, "الصف الدراسي مطلوب."],
    },
    coverImage: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: [true, "السعر مطلوب."],
      default: 0,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "الكورس يجب أن يكون مرتبطاً بمدرس."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Search optimization & Filtering Indexes
courseSchema.index({ subject: 1, grade: 1 });
courseSchema.index({ slug: 1 }, { unique: true });

const Course: Model<ICourse> =
  (mongoose.models.Course as Model<ICourse>) ||
  mongoose.model<ICourse>("Course", courseSchema);

export default Course;