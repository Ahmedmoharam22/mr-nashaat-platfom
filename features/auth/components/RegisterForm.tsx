"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

import { useRegisterForm } from "../hooks/useRegisterForm";
import { FormStepProgress } from "./FormStepProgress";
import { FormNavigationButtons } from "./FormNavigationButtons";
import { RegisterStep1 } from "./RegisterStep1";
import { RegisterStep2 } from "./RegisterStep2";
import { RegisterStep3 } from "./RegisterStep3";

export default function RegisterForm() {
  const {
    step,
    formData,
    errors,
    isLoading,
    submitSuccess,
    serverError,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
  } = useRegisterForm();

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

          {/* الجانب الأيسر: النموذج والخطوات */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between shadow-sm border border-slate-100 h-full overflow-hidden">
            
            {/* شريط التقدم */}
            <FormStepProgress currentStep={step} />

            {/* محتوى الفورم واللوجو */}
            <div className="my-auto space-y-5 sm:space-y-6 text-center py-2">
              {submitSuccess ? (
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
                    <CheckCircle className="w-9 h-9 text-amber-500" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    تم التسجيل بنجاح!
                  </h1>
                  <p className="text-sm text-slate-500 max-w-xs">
                    تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول والاستمتاع بالمنصة.
                  </p>
                  <Link
                    href="/login"
                    className="mt-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3 px-8 rounded-2xl text-sm transition-colors duration-200 shadow-md"
                  >
                    تسجيل الدخول الآن
                  </Link>
                </div>
              ) : (
                <>
                  {/* العناوين */}
                  <div className="space-y-1.5">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
                      {step === 1 && "أنشئ حسابك الآن :"}
                      {step === 2 && "أمّن حسابك :"}
                      {step === 3 && "بياناتك الدراسية :"}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">
                      {step === 1 && "أدخل بياناتك الشخصية للبدء في إنشاء حسابك"}
                      {step === 2 && "اختر كلمة مرور لحماية حسابك"}
                      {step === 3 && "حدد صفك الدراسي ومحافظتك للحصول على أفضل تجربة"}
                    </p>
                  </div>

                  {/* الخطأ من السيرفر */}
                  {serverError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-2.5 rounded-xl text-right">
                      {serverError}
                    </div>
                  )}

                  {/* النموذج */}
                  <form
                    onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}
                    className="space-y-4 sm:space-y-5 pt-2 text-right"
                    noValidate
                  >
                    {step === 1 && (
                      <RegisterStep1
                        formData={formData}
                        errors={errors}
                        onChange={handleChange}
                      />
                    )}
                    {step === 2 && (
                      <RegisterStep2
                        formData={formData}
                        errors={errors}
                        onChange={handleChange}
                      />
                    )}
                    {step === 3 && (
                      <RegisterStep3
                        formData={formData}
                        errors={errors}
                        onChange={handleChange}
                      />
                    )}

                    <FormNavigationButtons
                      step={step}
                      isLoading={isLoading}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  </form>
                </>
              )}
            </div>

            {/* رابط تسجيل الدخول بالأسفل */}
            <div className="text-center pt-2 text-xs font-bold text-slate-500">
              يوجد لديك حساب بالفعل؟{" "}
              <Link
                href="/login"
                className="text-amber-600 hover:underline transition-all"
              >
                ادخل إلى حسابك الآن !
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}