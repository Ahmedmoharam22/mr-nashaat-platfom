import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connect";
import User from "@/models/User";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "tel" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("الرجاء إدخال رقم الهاتف وكلمة المرور.");
        }

        await connectDB();

        const user = await User.findOne({ phone: credentials.phone }).select("+password");
        if (!user || !user.password) {
          throw new Error("بيانات الدخول غير صحيحة.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("بيانات الدخول غير صحيحة.");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          phone: user.phone,
          role: user.role,
          grade: user.grade,
        };
      },
    }),
  ],
});