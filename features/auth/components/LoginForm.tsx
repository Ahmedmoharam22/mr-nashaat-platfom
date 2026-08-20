"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { InputWrapper } from "@/components/ui/InputWrapper";
import { useLoginForm } from "../hooks/useLoginForm";

type LoginFormProps = {
  callbackUrl?: string;
};

export default function LoginForm({ callbackUrl }: LoginFormProps) {
  const {
    formData,
    showPassword,
    errors,
    isLoading,
    serverError,
    handleChange,
    toggleShowPassword,
    handleSubmit,
  } = useLoginForm(callbackUrl);

  const inputClass = (hasError: boolean) =>
    `w-full bg-white border-b-2 ${
      hasError ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-amber-500"
    } pb-2 pr-9 pl-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors`;

  return (
    <main className="h-screen max-h-screen w-full bg-[var(--color-bg)] p-3 sm:p-4 lg:p-6 flex items-center justify-center overflow-hidden dir-rtl">
      <div className="max-w-6xl w-full h-full max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-2rem)] bg-slate-50/50 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 shadow-sm border border-slate-100 flex flex-col justify-center overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch h-full overflow-hidden">
          
          {/* الجانب الأيمن: صورة الأستاذ والديكور */}
          <div className="lg:col-span-6 relative hidden lg:block h-full min-h-[300px] rounded-2xl overflow-hidden shadow-inner">
            <Image
              src="/images/teacher-library.jpg"
              alt="مستر نشأت - معلم التاريخ"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* الجانب الأيسر: الفورم بتوزيع أبعاد متطابق */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between shadow-sm border border-slate-100 h-full overflow-hidden">
            
            {/* الهيدر العلوي كـ Spacer محاذي لشريط الخطوة الأولى في التسجيل */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 invisible">
              <span>100%</span>
              <span>تسجيل الدخول</span>
            </div>

            {/* محتوى الفورم واللوجو مع توحيد المسافات */}
            <div className="my-auto space-y-5 sm:space-y-6 text-center py-2">
              {/* العناوين */}
              <div className="space-y-1.5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
                  تسجيل الدخول :
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  مرحباً بك مجدداً! ادخل بياناتك للمتابعة إلى حسابك
                </p>
              </div>

              {/* الخطأ من السيرفر */}
              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-2.5 rounded-xl text-right">
                  {serverError}
                </div>
              )}

              {/* نموذج البيانات */}
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 pt-2 text-right" noValidate>
                
                {/* رقم الهاتف */}
                <InputWrapper icon={<Phone className="w-4 h-4" />} error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    dir="ltr"
                    autoComplete="tel"
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${inputClass(!!errors.phone)} text-right`}
                    maxLength={11}
                  />
                </InputWrapper>

                {/* كلمة المرور */}
                <InputWrapper
                  icon={<Lock className="w-4 h-4" />}
                  leftElement={
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-1 z-10"
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
                    autoComplete="current-password"
                    placeholder="كلمة المرور"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClass(!!errors.password)} pl-10`}
                  />
                </InputWrapper>

                {/* زر الدخول الموحد */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] border border-[var(--color-primary)] text-slate-950 font-black py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base transition-colors duration-200 shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-800" />
                        جاري تسجيل الدخول...
                      </>
                    ) : (
                      <>
                        تسجيل الدخول
                        <LogIn className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>

            {/* رابط إنشاء حساب جديد بالأسفل */}
            <div className="text-center pt-2 text-xs font-bold text-slate-500">
              ليس لديك حساب بعد؟{" "}
              <Link
                href="/register"
                className="text-amber-600 hover:underline transition-all"
              >
                انشئ حسابك الآن !
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}