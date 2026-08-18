import mongoose, { Document, Model, Schema } from "mongoose";

export interface IQuestion {
  questionText: string;
  options: string[];      // خيارات الإجابة (MCQ)
  correctAnswer: number; // رقم الإجابة الصحيحة (0, 1, 2, أو 3)
}

export interface IQuiz extends Document {
  title: string;
  course: mongoose.Types.ObjectId;
  lesson?: mongoose.Types.ObjectId; // لو الكويز مرتبط بدرس معين
  questions: IQuestion[];
  passingScore: number;  // درجة النجاح
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true, trim: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
});

const quizSchema = new Schema<IQuiz>(
  {
    title: {
      type: String,
      required: [true, "عنوان الامتحان مطلوب."],
      trim: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
    questions: [questionSchema],
    passingScore: {
      type: Number,
      default: 50, // 50%
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Quiz: Model<IQuiz> =
  (mongoose.models.Quiz as Model<IQuiz>) ||
  mongoose.model<IQuiz>("Quiz", quizSchema);

export default Quiz;