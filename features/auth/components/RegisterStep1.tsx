import React from "react";
import { User, Phone } from "lucide-react";
import { InputWrapper } from "@/components/ui/InputWrapper";
import { StepProps } from "@/types/auth";

export function RegisterStep1({ formData, errors, onChange }: StepProps) {
  const inputClass = (hasError: boolean) =>
    `w-full bg-white border-b-2 ${
      hasError ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-amber-500"
    } pb-2 pr-9 pl-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors`;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* الاسم الأول */}
        <InputWrapper icon={<User className="w-4 h-4" />} error={errors.firstName}>
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            placeholder="الاسم الأول"
            value={formData.firstName}
            onChange={onChange}
            className={inputClass(!!errors.firstName)}
          />
        </InputWrapper>

        {/* الاسم الأخير */}
        <InputWrapper icon={<User className="w-4 h-4" />} error={errors.lastName}>
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            placeholder="الاسم الأخير"
            value={formData.lastName}
            onChange={onChange}
            className={inputClass(!!errors.lastName)}
          />
        </InputWrapper>
      </div>

      {/* رقم الهاتف */}
      <InputWrapper icon={<Phone className="w-4 h-4" />} error={errors.phone}>
        <input
          type="tel"
          name="phone"
          dir="ltr"
          autoComplete="tel"
          placeholder="رقم الهاتف (01xxxxxxxxx)"
          value={formData.phone}
          onChange={onChange}
          className={`${inputClass(!!errors.phone)} text-right`}
          maxLength={11}
        />
      </InputWrapper>
    </>
  );
}
