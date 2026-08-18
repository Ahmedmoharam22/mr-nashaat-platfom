import React, { useState } from "react";
import { Lock, Phone, Eye, EyeOff } from "lucide-react";
import { InputWrapper } from "@/components/ui/InputWrapper";
import { StepProps } from "@/types/auth";

export function RegisterStep2({ formData, errors, onChange }: StepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputClass = (hasError: boolean) =>
    `w-full bg-white border-b-2 ${
      hasError ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-amber-500"
    } pb-2 pr-9 pl-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors`;

  return (
    <>
      {/* كلمة المرور */}
      <InputWrapper
        icon={<Lock className="w-4 h-4" />}
        leftElement={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            aria-label="إظهار/إخفاء كلمة المرور"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        error={errors.password}
      >
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          autoComplete="new-password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={onChange}
          className={`${inputClass(!!errors.password)} pl-10`}
        />
      </InputWrapper>

      {/* تأكيد كلمة المرور */}
      <InputWrapper
        icon={<Lock className="w-4 h-4" />}
        leftElement={
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            aria-label="إظهار/إخفاء تأكيد كلمة المرور"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        error={errors.confirmPassword}
      >
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="تأكيد كلمة المرور"
          value={formData.confirmPassword}
          onChange={onChange}
          className={`${inputClass(!!errors.confirmPassword)} pl-10`}
        />
      </InputWrapper>

      {/* رقم هاتف ولي الأمر */}
      <div className="pt-1">
        <InputWrapper icon={<Phone className="w-4 h-4" />} error={errors.parentPhone}>
          <input
            type="tel"
            name="parentPhone"
            autoComplete="tel"
            placeholder="رقم هاتف ولي الأمر (اختياري)"
            value={formData.parentPhone}
            onChange={onChange}
            className={inputClass(!!errors.parentPhone)}
            maxLength={11}
          />
        </InputWrapper>
        <p className="text-[11px] text-slate-400 mt-1 pr-1">
          سيتم التواصل مع ولي الأمر عبر هذا الرقم عند الحاجة
        </p>
      </div>
    </>
  );
}
