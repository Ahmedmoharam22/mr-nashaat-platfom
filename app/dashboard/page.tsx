import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role;

  if (role === "teacher") {
    redirect("/dashboard/teacher");
  }

  if (role === "student") {
    redirect("/dashboard/student");
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">مرحباً بك في لوحة التحكم</h1>
    </div>
  );
}