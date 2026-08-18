"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Lock } from "lucide-react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

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

              {/* نموذج البيانات */}
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 pt-2 text-right">
                
                {/* رقم الهاتف */}
                <div className="relative">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-slate-300 focus:border-amber-500 pb-2 pl-8 pr-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors text-right"
                  />
                </div>

                {/* كلمة المرور */}
                <div className="relative">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="كلمة المرور"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-slate-300 focus:border-amber-500 pb-2 pl-8 pr-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

                {/* زر الدخول بنفس أبعاد زر التالي */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-primary)] text-slate-950 hover:text-[var(--color-primary-active)] font-black py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base transition-colors duration-200 shadow-md cursor-pointer"
                  >
                    تسجيل الدخول
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