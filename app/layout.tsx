import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "منصة مستر نشأت التعليمية",
  description: "المنصة الرسمية لمادة التاريخ، الجغرافيا، والجيولوجيا",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body dir="rtl" className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans dir-rtl text-right">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}