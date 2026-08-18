import React from "react";
import { ChevronRight, ChevronLeft, CheckCircle, Loader2 } from "lucide-react";

interface FormNavigationButtonsProps {
  step: number;
  isLoading: boolean;
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function FormNavigationButtons({
  step,
  isLoading,
  onNext,
  onBack,
}: FormNavigationButtonsProps) {
  return (
    <div className="pt-2 flex gap-3">
      {/* زر الرجوع */}
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 px-5 py-3 sm:py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 font-bold text-sm transition-colors duration-200 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
          رجوع
        </button>
      )}

      {/* زر التالي / الإرسال */}
      {step < 3 ? (
        <button
          type="button"
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] border border-[var(--color-primary)] text-slate-950 font-black py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base transition-colors duration-200 shadow-md cursor-pointer"
        >
          التالي
          <ChevronLeft className="w-4 h-4" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] border border-[var(--color-primary)] text-slate-950 font-black py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base transition-colors duration-200 shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-800" />
              جاري التسجيل...
            </>
          ) : (
            <>
              إنشاء الحساب
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
