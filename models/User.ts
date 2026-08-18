import mongoose, { Document, Model, Schema, SchemaDefinitionProperty } from "mongoose";

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

  /**
   * Egyptian mobile phone number — used as the primary login identifier.
   * Required for credentials-based accounts.
   */
  phone?: string;

  /** Unique email address — kept optional for potential Google OAuth. */
  email?: string;

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

  /** Egyptian governorate the student is from. */
  governorate?: string;

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

    /**
     * Egyptian mobile phone number — primary login identifier for credentials users.
     * Uniqueness enforced via explicit sparse index below, NOT on the field itself.
     */
    phone: {
      type: String,
      trim: true,
    },

    /**
     * Unique email address — optional, retained for Google OAuth support.
     * Do NOT set `default: null` here — null values get indexed by sparse
     * unique indexes and cause E11000 on the second insert. Leaving it
     * undefined (absent) lets the sparse index skip it entirely.
     */
    email: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },

    /** The parent's phone number. */
    parentPhone: {
      type: String,
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
    } as SchemaDefinitionProperty<string>,

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

    /** Egyptian governorate the student is from. */
    governorate: {
      type: String,
      trim: true,
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

// Sparse unique index on email (only for Google OAuth users).
userSchema.index({ email: 1 }, { unique: true, sparse: true });

// Sparse unique index on phone for credentials-based login.
userSchema.index({ phone: 1 }, { unique: true, sparse: true });

// Compound index to efficiently query "all students in a specific grade".
userSchema.index({ role: 1, grade: 1 });

// ---------------------------------------------------------------------------
// Model — Force-refresh in dev mode so schema changes apply without restart
// ---------------------------------------------------------------------------

// In Next.js dev mode, mongoose.models.User persists across HMR reloads.
// If we just do `mongoose.models.User || mongoose.model(...)`, the OLD schema
// (e.g. with email required) stays cached forever. Delete it first so the
// updated schema is always applied.
if (process.env.NODE_ENV !== "production" && mongoose.models.User) {
  delete mongoose.models.User;
}

const User: Model<IUser> =
  mongoose.models.User as Model<IUser> ||
  mongoose.model<IUser>("User", userSchema);

export default User;
