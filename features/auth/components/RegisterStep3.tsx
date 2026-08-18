import React from "react";
import { GraduationCap, MapPin } from "lucide-react";
import { StepProps } from "@/types/auth";
import { GRADES, GRADE_LABELS, GOVERNORATES } from "../schemas/auth.schema";

export function RegisterStep3({ formData, errors, onChange }: StepProps) {
  return (
    <>
      {/* الصف الدراسي */}
      <div className="relative w-full">
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
          <GraduationCap className="w-4 h-4" />
        </div>
        <select
          name="grade"
          value={formData.grade}
          onChange={onChange}
          className={`w-full bg-transparent border-b-2 ${
            errors.grade
              ? "border-red-400 focus:border-red-500"
              : "border-slate-300 focus:border-amber-500"
          } pb-2 pr-9 pl-3 text-sm outline-none transition-colors appearance-none cursor-pointer ${
            formData.grade ? "text-slate-900 font-medium" : "text-slate-400"
          }`}
        >
          <option value="" disabled>
            الصف الدراسي
          </option>
          {GRADES.map((g) => (
            <option key={g} value={g} className="text-slate-900">
              {GRADE_LABELS[g] ?? g}
            </option>
          ))}
        </select>
        {errors.grade && (
          <p className="text-xs text-red-500 mt-1 pr-1 font-medium">{errors.grade}</p>
        )}
      </div>

      {/* المحافظة */}
      <div className="relative w-full">
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
          <MapPin className="w-4 h-4" />
        </div>
        <select
          name="governorate"
          value={formData.governorate}
          onChange={onChange}
          className={`w-full bg-transparent border-b-2 ${
            errors.governorate
              ? "border-red-400 focus:border-red-500"
              : "border-slate-300 focus:border-amber-500"
          } pb-2 pr-9 pl-3 text-sm outline-none transition-colors appearance-none cursor-pointer ${
            formData.governorate ? "text-slate-900 font-medium" : "text-slate-400"
          }`}
        >
          <option value="" disabled>
            المحافظة
          </option>
          {GOVERNORATES.map((gov) => (
            <option key={gov} value={gov} className="text-slate-900">
              {gov}
            </option>
          ))}
        </select>
        {errors.governorate && (
          <p className="text-xs text-red-500 mt-1 pr-1 font-medium">{errors.governorate}</p>
        )}
      </div>
    </>
  );
}
