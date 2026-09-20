"use client";

import { motion, useMotionValue, useTransform, animate, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

// مكون العداد السلس مع دعم التمرير
function MotionCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [count, target, isInView]);

  return (
    <span ref={ref} className="inline-flex items-center justify-center dir-ltr tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span className="text-[var(--color-primary)] font-extrabold mr-0.5">{suffix}</span>
    </span>
  );
}

// تعريف الأنيميشن مع تحديد الـ Variants Type لمنع أخطاء TypeScript في Vercel Build
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function StatsSection() {
  const stats = [
    { value: 1500, suffix: "+", label: "طلابنا المؤرخين" },
    { value: 335, suffix: "+", label: "عيلتنا على يوتيوب" },
    { value: 5400, suffix: "+", label: "عيلتنا على فيسبوك" },
    { value: 100, suffix: "%", label: "متابعة أولياء الأمور" },
  ];

  return (
    <section className="w-full relative z-20 -mt-10 sm:-mt-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-950/70 backdrop-blur-md border border-amber-500/20 shadow-2xl shadow-amber-500/5 relative overflow-hidden"
      >
        {/* GlowEffect في الخلفية */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center relative z-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col items-center justify-center space-y-1.5 p-2 rounded-xl transition-colors duration-200 hover:bg-white/[0.02]"
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 tracking-tight leading-none">
                <MotionCount target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-300 tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}