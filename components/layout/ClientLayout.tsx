"use client";

import { usePathname } from "next/navigation";
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/register" || pathname === "/login";

  return (
    <AuthProvider>
      {!isAuthPage && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAuthPage && <Footer />}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--color-bg-elevated, #ffffff)",
            color: "var(--color-text-primary, #1f2937)",
            borderRadius: "var(--radius-md, 8px)",
            border: "1px solid var(--color-border, #e5e7eb)",
            fontFamily: "inherit",
            direction: "rtl",
          },
        }}
      />
    </AuthProvider>
  );
}