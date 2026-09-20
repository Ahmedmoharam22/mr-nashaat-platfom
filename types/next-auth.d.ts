import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "student" | "teacher" | "admin";
      grade?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: "student" | "teacher" | "admin";
    grade?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "student" | "teacher" | "admin";
    grade?: string;
  }
}