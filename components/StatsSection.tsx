"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

// مكون العداد باستخدام Framer Motion
function MotionCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    // أنيميشن سلاسة العداد خلال ثانيتين
    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [count, target]);

  return (
    <motion.span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}

export default function StatsSection() {
  const stats = [
    { value: 500, suffix: "k+", label: "طلابنا المؤرخين" },
    { value: 293, suffix: "k+", label: "عيلتنا على يوتيوب" },
    { value: 150, suffix: "k+", label: "عيلتنا على فيسبوك" },
    { value: 100, suffix: "%", label: "متابعة أولياء الأمور" },
  ];

  return (
    // البوكس الكبير مع أنيميشن ظهور ودخول من الأسفل
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 shadow-2xl shadow-amber-500/5"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-slate-800/80">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className={`${idx !== 0 ? "pt-4 sm:pt-0" : ""} space-y-1`}
          >
            <p className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-mono">
              <MotionCount target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-300">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}