// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function HeroSection() {
//   return (
//     <section className="relative w-full min-h-screen flex flex-col justify-center items-center pt-20 pb-10 overflow-hidden text-white">
//       {/* خلفية الصور المتجاوبة */}
//       <div className="absolute inset-0 z-0 w-full h-full">
        
//         {/* 📱 1. صورة الموبايل (تظهر في الشاشات الصغيره فقط < 640px) */}
//         <div className="block sm:hidden relative w-full h-full">
//           <Image
//             src="/images/hero-image-mobile.png"
//             alt="مستر نشأت مع الشخصيات التاريخية - موبايل"
//             fill
//             priority
//             sizes="100vw"
//             className="object-cover object-center"
//           />
//           {/* جرادينت داكن مخصص للموبايل لضمان وضوح النص والكتابة */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-slate-950/90" />
//         </div>

//         {/* 💻 2. صورة الديسك توب (تظهر من شاشات sm فما فوق >= 640px) */}
//         <div className="hidden sm:block relative w-full h-full">
//           <Image
//             src="/images/hero-bg-history.jpg"
//             alt="مستر نشأت مع الشخصيات التاريخية"
//             fill
//             priority
//             sizes="100vw"
//             className="object-cover object-[20%_center] lg:object-center"
//           />
//           {/* جرادينت متوازن للديسك توب */}
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/50 to-primary/20" />
//         </div>

//       </div>

//       {/* محتوى الهيرو الرئيسي */}
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-5 sm:space-y-6 my-auto"
//       >
//         <span className="inline-block text-accent-light text-sm sm:text-base lg:text-lg font-bold tracking-wide">
//           مستر نشأت الحسيني - خليك مؤرخ على حق
//         </span>

//         <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-snug drop-shadow-md">
//           ادرس التاريخ بطريقة سهلة، شيقة، <br className="hidden sm:inline" />
//           ومليانة أمثلة تربط بين الماضي والحاضر
//         </h1>

//         <motion.div
//           whileTap={{ scale: 0.97 }}
//           className="pt-2 inline-block"
//         >
//           <Link
//             href="/register"
//             className="inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)] text-slate-950 hover:text-amber-200 font-black text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl shadow-lg transition-colors duration-200"
//           >
//             انضم لعيلتنا
//           </Link>
//         </motion.div>

//         <div className="space-y-1.5 sm:space-y-2 pt-2 sm:pt-4">
//           <p className="text-accent-light text-xs sm:text-base font-bold">
//             #كلام_مؤرخين .. #ثانوية_عامة
//           </p>
//           <p className="text-xs sm:text-sm font-semibold text-white/90 max-w-xl mx-auto px-2">
//             تبدأ من هنا... عشان التاريخ هو المفتاح لكل حاجة!
//           </p>
//           <p className="text-xs sm:text-sm font-semibold text-white/80 px-2">
//             متفوتش فرصة متابعة نجلك من خلال داشبورد ولي الأمر!
//           </p>
//         </div>
//       </motion.div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end sm:justify-center items-center pt-28 pb-12 sm:pt-20 sm:pb-10 overflow-hidden text-white">
      {/* خلفية الصور المتجاوبة */}
      <div className="absolute inset-0 z-0 w-full h-full">
        
        {/* 📱 1. صورة الموبايل */}
        <div className="block sm:hidden relative w-full h-full">
          <Image
            src="/images/hero-image-mobile.png"
            alt="مستر نشأت مع الشخصيات التاريخية - موبايل"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top" // object-top عشان نضمن إن وش المستر والشخصيات يبانوا فوق
          />
          {/* جرادينت متدرج: شفاف فوق عشان الصورة تبان، وداكن جداً تحت عشان الكتابة تقرأ بوضوح */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-slate-950/95" />
        </div>

        {/* 💻 2. صورة الديسك توب */}
        <div className="hidden sm:block relative w-full h-full">
          <Image
            src="/images/hero-bg-history.jpg"
            alt="مستر نشأت مع الشخصيات التاريخية"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[20%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/50 to-primary/20" />
        </div>

      </div>

      {/* محتوى الهيرو الرئيسي */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-4 sm:space-y-6 mt-auto sm:my-auto"
      >
        {/* Glass Container للموبايل فقط ليمنح خلفية شبه شفافة خلف الكلام */}
        <div className="p-4 sm:p-0 rounded-2xl bg-black/40 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none border border-white/10 sm:border-none space-y-4 sm:space-y-6">
          <span className="inline-block text-accent-light text-xs sm:text-base lg:text-lg font-bold tracking-wide">
            مستر نشأت الحسيني - خليك مؤرخ على حق
          </span>

          <h1 className="text-xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-snug drop-shadow-lg">
            ادرس التاريخ بطريقة سهلة، شيقة، <br className="hidden sm:inline" />
            ومليانة أمثلة تربط بين الماضي والحاضر
          </h1>

          <motion.div
            whileTap={{ scale: 0.97 }}
            className="pt-1 sm:pt-2 inline-block"
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)] text-slate-950 hover:text-amber-200 font-black text-sm sm:text-lg px-7 sm:px-10 py-2.5 sm:py-3.5 rounded-xl shadow-lg transition-colors duration-200"
            >
              انضم لعيلتنا
            </Link>
          </motion.div>

          <div className="space-y-1 sm:space-y-2 pt-1 sm:pt-4">
            <p className="text-accent-light text-xs sm:text-base font-bold">
              #كلام_مؤرخين .. #ثانوية_عامة
            </p>
            <p className="text-[11px] sm:text-sm font-semibold text-white/90 max-w-xl mx-auto px-2">
              تبدأ من هنا... عشان التاريخ هو المفتاح لكل حاجة!
            </p>
            <p className="text-[11px] sm:text-sm font-semibold text-white/80 px-2">
              متفوتش فرصة متابعة نجلك من خلال داشبورد ولي الأمر!
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}