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
        <span className="text-xs sm:text-sm font-bold text-primary-active tracking-wide bg-primary-light/80 px-3.5 py-1 rounded-full border border-primary/60 w-fit">
          {subtitle}
        </span>
      )}

      <h2 className="font-amin text-[40px] sm:text-[60px] font-bold text-text-primary leading-[1.05] tracking-tight">
        {title}
      </h2>

      <div className="flex items-center gap-1.5 mt-1">
        <div className="h-1 w-10 bg-primary rounded-full shadow-sm" />
        <div className="h-1 w-2.5 bg-primary-active/70 rounded-full" />
      </div>
    </div>
  );
}

export default SectionTitle;