import React from "react";
import { CheckCircle } from "lucide-react";

export const STEPS = [
  { label: "البيانات الشخصية", percent: 33 },
  { label: "كلمة المرور", percent: 66 },
  { label: "البيانات الدراسية", percent: 100 },
];

interface FormStepProgressProps {
  currentStep: number;
}

export function FormStepProgress({ currentStep }: FormStepProgressProps) {
  const stepMeta = STEPS[currentStep - 1] || STEPS[0];

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1.5">
        <span>{stepMeta.percent}%</span>
        <span>{stepMeta.label}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${stepMeta.percent}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {STEPS.map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                i + 1 < currentStep
                  ? "bg-amber-400 text-white"
                  : i + 1 === currentStep
                  ? "bg-amber-400 text-white ring-2 ring-amber-200"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {i + 1 < currentStep ? <CheckCircle className="w-3 h-3" /> : i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}