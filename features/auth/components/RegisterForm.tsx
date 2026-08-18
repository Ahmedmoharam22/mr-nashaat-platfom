"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Phone } from "lucide-react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
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

          {/* الجانب الأيسر: النموذج والخطوات */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between shadow-sm border border-slate-100 h-full overflow-hidden">
            
            {/* شريط التقدم بالاعلى */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1.5">
                <span>30%</span>
                <span>الخطوة الأولى</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[30%] h-full bg-slate-500 rounded-full" />
              </div>
            </div>

            {/* محتوى الفورم واللوجو */}
            <div className="my-auto space-y-5 sm:space-y-6 text-center py-2">
              
              {/* العناوين */}
              <div className="space-y-1.5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">
                  انشئ حسابك الآن :
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  ادخل بياناتك بشكل صحيح للحصول علي افضل تجربة داخل الموقع
                </p>
              </div>

              {/* نموذج البيانات */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 pt-2 text-right">
                
                {/* الاسم الأول والاسم الأخير في نفس السطر */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  
                  {/* الاسم الأخير */}
                  <div className="relative">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="الاسم الأخير"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-slate-300 focus:border-amber-500 pb-2 pl-8 pr-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors"
                    />
                  </div>

                  {/* الاسم الأول */}
                  <div className="relative">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="الاسم الأول"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-slate-300 focus:border-amber-500 pb-2 pl-8 pr-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors"
                    />
                  </div>

                </div>

                {/* رقم الهاتف */}
                <div className="relative pt-1">
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

                {/* زر التالي الأصفر المطابق للديزاين */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-primary)] text-slate-950 hover:text-[var(--color-primary-active)] font-black py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base transition-colors duration-200 shadow-md cursor-pointer"
                  >
                    التالي
                  </button>
                </div>

              </form>

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