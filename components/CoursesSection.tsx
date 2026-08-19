"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";

// استيراد استايلات Swiper الأساسية
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Course {
  id: string;
  title: string;
  gradeLabel: string;
  price: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
}

export default function CoursesSection() {
  const courses: Course[] = [
    {
      id: "1",
      title: "كورس الشهر الأول - الصف الأول بكالوريا 💔",
      gradeLabel: "الصف الأول الثانوي",
      price: "100 جنيه",
      startDate: "الأحد، 9 أغسطس 2026",
      endDate: "الأحد، 9 أغسطس 2026",
      description: "كورس الشهر الأول - الصف الأول بكالوريا 💔 ...عرض باقي التفاصيل",
      image: "/images/course1.png",
    },
    {
      id: "2",
      title: "كورس الشهر الأول - الصف الثالث الثانوي 💔",
      gradeLabel: "الصف الأول الثانوي",
      price: "100 جنيه",
      startDate: "الأحد، 9 أغسطس 2026",
      endDate: "الأحد، 9 أغسطس 2026",
      description: "كورس الشهر الأول - الصف الأول بكالوريا 💔 ...عرض باقي التفاصيل",
      image: "/images/course2.png",
    },
    {
      id: "3",
      title: "كورس الشهر الأول - الصف الثاني بكالوريا 💔",
      gradeLabel: "الصف الأول الثانوي",
      price: "100 جنيه",
      startDate: "الأحد، 9 أغسطس 2026",
      endDate: "الأحد، 9 أغسطس 2026",
      description: "كورس الشهر الأول - الصف الأول بكالوريا 💔 ...عرض باقي التفاصيل",
      image: "/images/course3.png",
    },
    {
      id: "4",
      title: "كورس التاريخ والجغرافيا - الصف الثالث الثانوي 💎",
      gradeLabel: "الصف الثالث الثانوي",
      price: "200 جنيه",
      startDate: "الأحد، 9 أغسطس 2026",
      endDate: "الأحد، 9 أغسطس 2026",
      description: "مراجعة شامالة ونواتج التعلم لنظام الامتحانات الحديث ...عرض باقي التفاصيل",
      image: "/images/course2.png",
    },
  ];

  return (
    <section className="py-16 bg-[var(--color-bg)] text-[var(--color-text-primary)] overflow-hidden dir-rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* العمود الأيمن: العنوان والوصف وزر عرض الكل */}
          <div className="lg:col-span-5 text-center lg:text-right space-y-6">
  {/* التطبيق المطابق للصورة تماماً */}
  <h2 className="font-amin text-[40px] sm:text-[60px] font-bold text-[#111827] leading-[1.05] tracking-tight">
    كورساتنا لكل <br className="hidden sm:inline" />
    <span>الصفوف الدراسية</span>
  </h2>

  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
    لو بتدور على الطريقة الأسهل والأضمن عشان تطور مستواك في المواد الأدبية والجيولوجيا وتوصل للتفوق، فأنت في المكان الصح!
  </p>

  <div>
    <Link
      href="/courses"
      className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-primary)] text-slate-950 hover:text-amber-600 font-black text-lg px-9 py-3.5 rounded-2xl shadow-md transition-colors duration-200"
    >
      عرض الكل
    </Link>
  </div>
</div>

          {/* العمود الأيسر: السلايدر باستخدام Swiper JS */}
          <div className="lg:col-span-7 relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
              }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="pb-14 pt-2 px-2"
            >
              {courses.map((course) => (
                <SwiperSlide key={course.id}>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                    
                    {/* صورة الكورس */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* محتوى الكارت */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-right space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-amber-600 font-extrabold text-xl">
                          {course.price}
                        </p>
                      </div>

                      {/* المواعيد */}
                      <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-200/60 pt-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{course.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{course.endDate}</span>
                        </div>
                      </div>

                      {/* الوصف القصير */}
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {course.description}
                      </p>

                      {/* الأزرار بالأسفل */}
                      <div className="space-y-2 pt-2">
                        <Link
                          href={`/courses/${course.id}`}
                          className="w-full inline-block text-center bg-transparent hover:bg-amber-400/10 text-amber-500 hover:text-amber-600 font-bold py-2.5 rounded-xl border-2 border-amber-400/80 text-sm transition-colors duration-200"
                        >
                          الدخول للكورس
                        </Link>
                        
                        <Link
                          href={`/checkout/${course.id}`}
                          className="w-full inline-block text-center bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-primary)] text-slate-950 hover:text-amber-600 font-black py-2.5 rounded-xl text-sm transition-colors duration-200 shadow-sm"
                        >
                          الإشتراك في الكورس !
                        </Link>
                      </div>

                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* أدوات التحكم بالأسفل (الأسهم والـ Pagination) المطابقة للصورة */}
            <div className="flex items-center justify-between mt-4 px-2">
              {/* زر السابق */}
              <button className="custom-prev w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-800/10 border border-slate-800 text-white hover:text-slate-800 flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-md">
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* نقاط التنقل (Dots) */}
              <div className="custom-pagination !w-auto flex items-center gap-1" />

              {/* زر التالي */}
              <button className="custom-next w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-800/10 border border-slate-800 text-white hover:text-slate-800 flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-md">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}