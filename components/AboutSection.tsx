"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Compass, BookOpen, BrainCircuit, UserCheck } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";

const features = [
  {
    icon: BrainCircuit,
    title: "الربط المبتكر بين 3 مواد",
    description:
      "فهم عميق يربط بين أحداث التاريخ، طبيعة الجغرافيا، وطبقات الجيولوجيا بدلاً من الحفظ الجاف.",
  },
  {
    icon: Compass,
    title: "خرائط ونواتج تعلم حديثة",
    description:
      "تحليل كامل للخرائط الذهنية واستخراج نواتج التعلم لنظام الامتحانات الجديد بثقة.",
  },
  {
    icon: BookOpen,
    title: "بنك أسئلة وتدريب مستمر",
    description:
      "آلاف الأسئلة المتدرجة في الصعوبة مع حلول تفصيلية واختبارات دورية تقيس مستواك الحقيقي.",
  },
  {
    icon: UserCheck,
    title: "متابعة دقيقة لولي الأمر",
    description:
      "لوحة تحكم خاصة وتنبيهات فورية لولي الأمر بمستوى الحضور والدرجات أولاً بأول.",
  },
];

// حاوية الكروت: بتتحكم في توقيت ظهور كل كارت بعد التاني (stagger حقيقي)
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-bg text-text-primary overflow-hidden w-full">
      {/* عناصر ديكورية خلفية - تدي عمق من غير ما تشتت */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-light/40 rounded-full blur-3xl -z-0 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-light/30 rounded-full blur-3xl -z-0 -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          <SectionTitle title="ليه تختار منصة مستر نشأت؟" align="center" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* الصورة */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-1 lg:col-span-5 w-full relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-border">
              <Image
                src="/images/about-mr-nashatt.jpg"
                alt="مستر نشأت"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
            </div>

            {/* بادچ عائم بره حدود الصورة - إحساس أرقى من الكارت الداخلي */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
              className="absolute -bottom-6 -right-4 sm:-right-8 bg-bg-elevated rounded-2xl shadow-xl border border-border px-5 py-4 sm:px-6 sm:py-5 max-w-[240px]"
            >
              <p className="text-3xl sm:text-4xl font-black text-primary-active leading-none">
                +8
              </p>
              <p className="text-xs sm:text-sm font-bold text-text-primary mt-1">
                سنوات خبرة في التدريس
              </p>
              <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                آلاف الطلاب حققوا الدرجات النهائية بفضل الشرح المبسط
              </p>
            </motion.div>
          </motion.div>

          {/* الكروت */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  className="p-5 sm:p-6 rounded-2xl bg-bg-elevated border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-active group-hover:text-text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}