// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";

// export default function CtaSection() {
//   return (
//     <section className="relative py-10 bg-white overflow-hidden dir-rtl">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
//         {/* البوكس الرئيسي بالانحناءات والألوان المطابقة للصورة */}
//         <div className="relative rounded-[2.5rem] overflow-hidden bg-[#D99A00] p-8 sm:p-12 text-center text-white shadow-lg border border-amber-400/20">
          
//           {/* الموجات والأشكال المنحنية في الخلفية (Organic Curved Overlay) */}
//           <div className="absolute inset-0 pointer-events-none overflow-hidden">
//             {/* منحنى غامق على اليمين */}
//             <div className="absolute -top-12 -right-12 w-96 h-96 bg-[#B57E00] rounded-full blur-2xl opacity-60 mix-blend-multiply" />
            
//             {/* منحنى فتحات مموجة سفلي وعلوي */}
//             <svg
//               className="absolute inset-0 w-full h-full opacity-30"
//               viewBox="0 0 1000 400"
//               preserveAspectRatio="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M 0,100 C 300,300 700,0 1000,200 L 1000,400 L 0,400 Z"
//                 fill="#8C6100"
//               />
//               <path
//                 d="M 0,0 C 400,200 600,0 1000,100 L 1000,0 Z"
//                 fill="#F0B400"
//               />
//             </svg>
//           </div>

//           {/* الرسم المتجهي للأهرامات وأبو الهول بالأسفل (Vector Backdrop) */}
//           <div className="absolute bottom-0 left-0 right-0 h-32 opacity-25 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent pointer-events-none flex justify-center items-end">
//             {/* رسمة توضيحية خفيفة كخلفية تاريخية */}
//             <svg
//               className="w-full max-w-2xl h-24 text-amber-900 fill-current opacity-40"
//               viewBox="0 0 500 150"
//               preserveAspectRatio="none"
//             >
//               <polygon points="150,150 220,50 290,150" />
//               <polygon points="230,150 310,30 390,150" />
//               <polygon points="80,150 140,80 200,150" />
//             </svg>
//           </div>

//           {/* المحتوى والنصوص بالمنتصف */}
//           <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
//             {/* العنوان "تاريخك هنا" بخط عريض وبارز */}
//             <motion.h2
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4 }}
//               className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md"
//             >
//               تاريخك هنا
//             </motion.h2>

//             {/* النص التوضيحي المكتوب باسم مستر نشأت */}
//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//               className="text-base sm:text-xl font-bold text-amber-50 leading-relaxed max-w-2xl mx-auto drop-shadow-sm"
//             >
//               كلام مؤرخين !! مستر نشأت مبيعولش غير كده و جابلك طريقة خفيفة ولذيذة عشان تتعلم التاريخ، عشان التاريخ ما يبقاش كابوس! وده كله عشان تدمن المادة، وتتعلم من غير ما تحس بالملل!
//             </motion.p>

//             {/* زر "اشترك دلوقتي" باللون الرمادي الداكن المطابق للصورة */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.2 }}
//               className="pt-3 flex justify-center"
//             >
//               <Link
//                 href="/register"
//                 className="bg-[#5A5B5E] hover:bg-[#48494B] text-white font-black px-12 py-3.5 rounded-2xl shadow-md transition-all duration-300 hover:scale-105 text-lg"
//               >
//                 اشترك دلوقتي
//               </Link>
//             </motion.div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section className="relative py-10 bg-white overflow-hidden dir-rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* البوكس الرئيسي باللون الذهبي العنبري المطابق للصورة */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-[#D99A00] p-8 sm:p-12 text-center text-white shadow-lg border border-amber-400/20">
          
          {/* الموجات والأشكال المنحنية الجانبية (Organic Curved Overlay) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* بقاع مموجة بدرجات غامقة وفاتحة */}
            <div className="absolute -top-16 -right-16 w-96 h-96 bg-[#9E6E00] rounded-full blur-3xl opacity-50 mix-blend-multiply" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#F5B819] rounded-full blur-2xl opacity-40 mix-blend-screen" />
            
            {/* تدرج بالأسفل لمنح الصورة اندماج ناعم مع الخلفية */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#D99A00] via-transparent to-black/20 z-10" />
          </div>

          {/* استخدام صورتنا التاريخية في الخلفية بدلاً من الـ SVG */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/cta-history-bg.jpg"
              alt="حضارة وشخصيات مصر التاريخية"
              fill
              priority
              className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
            />
          </div>

          {/* المحتوى والنصوص بالمنتصف */}
          <div className="relative z-20 max-w-3xl mx-auto space-y-6">
            
            {/* العنوان "تاريخك هنا" */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md"
            >
              تاريخك هنا
            </motion.h2>

            {/* النص التوضيحي باسم مستر نشأت */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-xl font-bold text-amber-50 leading-relaxed max-w-2xl mx-auto drop-shadow-sm"
            >
              كلام مؤرخين !! مستر نشأت مبيعولش غير كده و جابلك طريقة خفيفة ولذيذة عشان تتعلم التاريخ، عشان التاريخ ما يبقاش كابوس! وده كله عشان تدمن المادة، وتتعلم من غير ما تحس بالملل!
            </motion.p>

            {/* زر "اشترك دلوقتي" باللون الرمادي المطابق للديزاين */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="pt-3 flex justify-center"
            >
              <Link
                href="/register"
                className="bg-[#5A5B5E] hover:bg-[#5A5B5E]/20 border-2 border-[#5A5B5E] text-white hover:text-amber-300 font-black px-12 py-3.5 rounded-2xl shadow-md transition-colors duration-200 text-lg"
              >
                اشترك دلوقتي
              </Link>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}