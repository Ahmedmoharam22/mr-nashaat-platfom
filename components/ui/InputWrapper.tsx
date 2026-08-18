import React from "react";

interface InputWrapperProps {
  icon?: React.ReactNode;
  leftElement?: React.ReactNode;
  children: React.ReactNode;
  error?: string;
  className?: string;
}

export function InputWrapper({
  icon,
  leftElement,
  children,
  error,
  className = "",
}: InputWrapperProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {icon && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
          {icon}
        </div>
      )}
      {children}
      {leftElement && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 z-10">
          {leftElement}
        </div>
      )}
      {error && (
        <p className="text-xs text-red-500 mt-1 pr-1 font-medium">{error}</p>
      )}
    </div>
  );
}