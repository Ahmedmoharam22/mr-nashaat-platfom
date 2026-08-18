import mongoose, { Document, Model, Schema } from "mongoose";

// ---------------------------------------------------------------------------
// Enumerations
// ---------------------------------------------------------------------------

export type Provider = "credentials" | "google";
export type Role = "student" | "teacher";
export type Grade =
  | "first_prep"
  | "second_prep"
  | "third_prep"
  | "first_secondary"
  | "second_secondary"
  | "third_secondary";

// ---------------------------------------------------------------------------
// IUser Interface
// ---------------------------------------------------------------------------

export interface IUser extends Document {
  /** The user's full display name. */
  name: string;

  /** Unique email address used for authentication and identification. */
  email: string;

  /**
   * Hashed password — only present when provider is "credentials".
   * Excluded from query results by default (select: false).
   */
  password?: string;

  /** URL of the user's profile picture (e.g. from Google OAuth). */
  image?: string;

  /** Authentication provider used to create this account. */
  provider: Provider;

  /** Platform role that controls access and available features. */
  role: Role;

  /** The parent's phone number. */
  parentPhone?: string;

  /**
   * Academic grade — mandatory for students, not applicable for teachers.
   * Maps to Egyptian secondary school grades (grades 10–12).
   */
  grade?: Grade;

  /** Whether the account is currently active; set to false to ban a user. */
  isActive: boolean;

  /** Automatically managed by Mongoose timestamps option. */
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const userSchema = new Schema<IUser>(
  {
    /** The user's full display name. */
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },

    /** Unique email address used for authentication and identification. */
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },

    /**
     * Hashed password — only present when provider is "credentials".
     * Excluded from query results by default (select: false).
     */
    password: {
      type: String,
      select: false,
      validate: {
        validator(this: IUser, value: string | undefined): boolean {
          // Password is required only when using credentials provider.
          if (this.provider === "credentials") {
            return typeof value === "string" && value.length > 0;
          }
          return true;
        },
        message: "Password is required for credentials-based accounts.",
      },
    },

    /** URL of the user's profile picture (e.g. from Google OAuth). */
    image: {
      type: String,
      trim: true,
    },

    /** Authentication provider used to create this account. */
    provider: {
      type: String,
      enum: {
        values: ["credentials", "google"] satisfies Provider[],
        message: "Provider must be either 'credentials' or 'google'.",
      },
      required: [true, "Provider is required."],
      default: "credentials",
    },

    /** Platform role that controls access and available features. */
    role: {
      type: String,
      enum: {
        values: ["student", "teacher"] satisfies Role[],
        message: "Role must be either 'student' or 'teacher'.",
      },
      required: [true, "Role is required."],
      default: "student",
    },

    /**
     * Academic grade — mandatory for students, not applicable for teachers.
     * Maps to Egyptian secondary school grades (grades 10–12).
     */
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
        message:
          "Grade must be one of: first_prep, second_prep, third_prep, first_secondary, second_secondary, third_secondary.",

        required: false,
        default: null,
      },
      validate: {
        validator(this: IUser, value: string | undefined): boolean {
          // Grade is required when the role is "student".
          if (this.role === "student") {
            return typeof value === "string" && value.length > 0;
          }
          return true;
        },
        message: "Grade is required for students.",
      },
    },

    /** Whether the account is currently active; set to false to ban a user. */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ---------------------------------------------------------------------------
// Indexes
// ---------------------------------------------------------------------------

// Unique index on email for fast lookup and constraint enforcement.
userSchema.index({ email: 1 }, { unique: true });

// Compound index to efficiently query "all students in a specific grade".
userSchema.index({ role: 1, grade: 1 });

// ---------------------------------------------------------------------------
// Model — Next.js-safe export to prevent recompilation errors in dev mode
// ---------------------------------------------------------------------------

const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
