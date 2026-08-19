import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "right" | "center" | "left";
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  align = "right",
  className = "",
}: SectionTitleProps) {
  const alignmentClasses = {
    right: "text-right items-start",
    center: "text-center items-center",
    left: "text-left items-end",
  };

  return (
    <div className={`flex flex-col gap-1.5 my-6 ${alignmentClasses[align]} ${className}`}>
      {subtitle && (
        <span className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400 tracking-wide bg-amber-100/80 dark:bg-amber-950/40 px-3.5 py-1 rounded-full border border-amber-300/60 dark:border-amber-800/40 w-fit">
          {subtitle}
        </span>
      )}

      <h2 className="font-amin text-[40px] sm:text-[60px] font-bold text-[#111827] leading-[1.05] tracking-tight">
        {title}
      </h2>

      {/* خط ديكوري أنيق بلمسة أصفر/عنبر منصة مستر نشأت */}
      <div className="flex items-center gap-1.5 mt-1">
        <div className="h-1 w-10 bg-[var(--color-primary)] rounded-full shadow-sm" />
        <div className="h-1 w-2.5 bg-amber-400/70 rounded-full" />
      </div>
    </div>
  );
}

export default SectionTitle;