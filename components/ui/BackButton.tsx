"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface BackButtonProps {
  label?: string;
  fallbackUrl?: string;
  className?: string;
}

export function BackButton({
  label = "رجوع",
  fallbackUrl,
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (fallbackUrl && typeof window !== "undefined" && window.history.length <= 2) {
      router.push(fallbackUrl);
    } else {
      router.back();
    }
  };

  return (
    <button
  type="button"
  onClick={handleBack}
  className={`group inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 hover:shadow-md active:scale-95 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-100 cursor-pointer select-none ${className}`}
  title={label}
>
  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
  <span>{label}</span>
</button>
  );
}

export default BackButton;
