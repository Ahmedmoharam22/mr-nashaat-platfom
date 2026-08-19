"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, BookOpen, BrainCircuit, UserCheck, Sparkles } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";

export default function AboutSection() {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-[var(--color-primary-active)]" />,
      title: "الربط المبتكر بين 3 مواد",
      description: "فهم عميق يربط بين أحداث التاريخ، طبيعة الجغرافيا، وطبقات الجيولوجيا بدلاً من الحفظ الجاف.",
    },
    {
      icon: <Compass className="w-6 h-6 text-[var(--color-primary-active)]" />,
      title: "خرائط ونواتج تعلم حديثة",
      description: "تحليل كامل للخرائط الذهنية واستخراج نواتج التعلم لنظام الامتحانات الجديد بثقة.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-[var(--color-primary-active)]" />,
      title: "بنك أسئلة وتدريب مستمر",
      description: "آلاف الأسئلة المتدرجة في الصعوبة مع حلول تفصيلية وااختبارات دورية تقيس مستواك الحقيقي.",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-[var(--color-primary-active)]" />,
      title: "متابعة دقيقة لولي الأمر",
      description: "لوحة تحكم خاصة وتنبيهات فورية لولي الأمر بمستوى الحضور والدرجات أولاً بأول.",
    },
  ];

  return (
    <section className="relative py-8 sm:py-16 lg:py-20 bg-bg text-text-primary overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header القسم */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
        >
          <SectionTitle
            title="ليه تختار منصة مستر نشأت؟"
            align="center"
          />
        </motion.div>

        {/* شبكة العرض */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* الصورة */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-1 lg:col-span-6 w-full"
          >
            <div className="relative w-full min-h-[260px] sm:min-h-[350px] lg:min-h-[420px] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-xl group">
              <Image
                src="/images/about-mr-nashatt.jpg"
                alt="عن مستر نشأت"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center sm:object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 right-3 left-3 sm:bottom-4 sm:right-4 sm:left-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border border-[var(--color-border)] shadow-lg">
                <p className="text-[var(--color-text-primary)] font-bold text-xs sm:text-base">
                  خبرة أكثر من 8 سنوات في تدريس المواد الأدبية والجيولوجيا
                </p>
                <p className="text-[var(--color-text-secondary)] text-[11px] sm:text-xs mt-0.5 sm:mt-1">
                  آلاف الطلاب حققوا الدرجات النهائية بفضل الله ثم الشرح المبسط.
                </p>
              </div>
            </div>
          </motion.div>

          {/* الكروت الأربعة */}
          <div className="col-span-1 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-4 sm:p-5 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-200 group shadow-sm"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center mb-3 sm:mb-4 transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] mb-1.5 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}