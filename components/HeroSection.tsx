// import Link from "next/link";
// import Image from "next/image";
// import StatsSection from "./StatsSection";

// export default function HeroSection() {
//   return (
//     <section className="relative w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[85vh] flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 overflow-x-hidden bg-[#8c6b1b] text-white dir-rtl">
      
//       {/* 1. صورة الخلفية الممزوجة */}
//       <div className="absolute inset-0 z-0 w-full h-full">
//         <Image
//           src="/images/hero-bg-history.jpg"
//           alt="مستر نشأت مع الشخصيات التاريخية"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover object-[left_center] sm:object-[20%_center] lg:object-center opacity-90 transition-all duration-300"
//         />
//         {/* تدرج لوني دافئ وداكن لدمج النصوص وإبراز المعلم على أجهزة الموبايل والدسكتوب */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#6e5211]/90 via-[#8c6b1b]/40 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//       </div>

//       {/* 2. المحتوى الرئيسي بالمنتصف */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-4 sm:space-y-6 my-auto pt-4 sm:pt-6">
        
//         {/* Badge الهوية */}
//         <div className="inline-block">
//           <span className="text-amber-200 text-sm sm:text-xl lg:text-2xl font-black tracking-wide">
//             مستر نشأت الحسيني - خليك مؤرخ على حق
//           </span>
//         </div>

//         {/* العنوان الرئيسي */}
//         <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-snug text-white drop-shadow-md">
//           ادرس التاريخ بطريقة سهلة، شيقة، <br className="hidden sm:inline" />
//           ومليانة أمثلة تربط بين الماضي والحاضر
//         </h1>

//         {/* زر الانضمام الرئيسي */}
//         <div className="pt-2">
//           <Link
//             href="/register"
//             className="inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)] text-slate-950 hover:text-amber-200 font-black text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl shadow-lg transition-colors duration-200"
//           >
//             انضم لعيلتنا
//           </Link>
//         </div>

//         {/* شعار السوشيال والنصوص الفرعية */}
//         <div className="space-y-1.5 sm:space-y-2 pt-2 sm:pt-4">
//           <p className="text-amber-200 text-xs sm:text-base font-bold">
//             #كلام_مؤرخين .. #ثانوية_عامة
//           </p>
//           <p className="text-xs sm:text-sm font-semibold text-slate-100 max-w-xl mx-auto px-2">
//             تبدأ من هنا... عشان التاريخ هو المفتاح لكل حاجة!
//           </p>
//           <p className="text-xs sm:text-sm font-semibold text-slate-200 px-2">
//             متفوتش فرصة متابعة نجلك من خلال داشبورد ولي الأمر!
//           </p>
//         </div>

//       </div>

//       {/* 3. شريط الإحصائيات بالأسفل */}
//       <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-8 sm:pt-12">
//         <StatsSection />
//       </div>

//     </section>
//   );
// }



"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import StatsSection from "./StatsSection";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[85vh] flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 overflow-x-hidden text-white">
      {/* صورة الخلفية */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/hero-bg-history.jpg"
          alt="مستر نشأت مع الشخصيات التاريخية"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[left_center] sm:object-[20%_center] lg:object-center"
        />
        {/* جرادينت واحد بيغطي كل الحالات */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-primary/30" />
      </div>

      {/* المحتوى */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-4 sm:space-y-6 my-auto pt-4 sm:pt-6"
      >
        <span className="inline-block text-accent-light text-sm sm:text-base lg:text-lg font-bold tracking-wide">
          مستر نشأت الحسيني - خليك مؤرخ على حق
        </span>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-snug drop-shadow-md">
          ادرس التاريخ بطريقة سهلة، شيقة، <br className="hidden sm:inline" />
          ومليانة أمثلة تربط بين الماضي والحاضر
        </h1>

        <motion.div
          whileTap={{ scale: 0.97 }}
          className="pt-2 inline-block"
        >
          <Link
            href="/register"
            className="inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)] text-slate-950 hover:text-amber-200 font-black text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl shadow-lg transition-colors duration-200"
          >
            انضم لعيلتنا
          </Link>
        </motion.div>

        <div className="space-y-1.5 sm:space-y-2 pt-2 sm:pt-4">
          <p className="text-accent-light text-xs sm:text-base font-bold">
            #كلام_مؤرخين .. #ثانوية_عامة
          </p>
          <p className="text-xs sm:text-sm font-semibold text-white/90 max-w-xl mx-auto px-2">
            تبدأ من هنا... عشان التاريخ هو المفتاح لكل حاجة!
          </p>
          <p className="text-xs sm:text-sm font-semibold text-white/80 px-2">
            متفوتش فرصة متابعة نجلك من خلال داشبورد ولي الأمر!
          </p>
        </div>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-8 sm:pt-12">
        <StatsSection />
      </div>
    </section>
  );
}