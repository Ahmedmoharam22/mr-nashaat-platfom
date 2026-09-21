"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";

const pages = [
  { href: "/", label: "الرئيسية" },
  { href: "/help", label: "المساعدة" },
  { href: "/register", label: "انشاء حساب جديد" },
  { href: "/login", label: "تسجيل الدخول" },
];

const support = [
  { href: "/support/online", label: "تواصل مع دعم الاونلاين" },
  { href: "/support/centers", label: "تواصل مع دعم السناتر" },
  { href: "/support/grade-3", label: "المادة العلمية - صف ثالث ثانوي" },
  { href: "/support/grades-1-2", label: "المادة العلمية - صف ثاني و أول ثانوي" },
];

const socials = [
  {
    href: "https://www.facebook.com/nshat.alhsyny",
    label: "فيسبوك",
    Icon: FaFacebookF,
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    href: "https://tiktok.com",
    label: "تيك توك",
    Icon: FaTiktok,
    iconBg: "bg-slate-100 text-slate-900",
  },
  {
    href: "https://youtube.com/@nashaatmohamed-mx3rc?si=ULO05eNheZF-ZvpD",
    label: "يوتيوب",
    Icon: FaYoutube,
    iconBg: "bg-red-100 text-red-600",
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-elevated pt-12 pb-6 border-t border-border text-text-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 text-center sm:text-right"
        >
          <div className="flex flex-col items-center sm:items-start gap-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/main-logo.png"
                alt="كلام مؤرخين - مستر نشأت"
                width={160}
                height={80}
                className="h-auto w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[220px]">
              منصة كلام مؤرخين لتدريس الدراسات الاجتماعية والتاريخ بأسلوب مبسط وحديث.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-primary-active font-black text-base">الصفحات</h3>
            <ul className="space-y-2 font-semibold text-text-secondary text-sm">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="hover:text-primary-active transition-colors duration-200">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-primary-active font-black text-base">السوشيال ميديا</h3>
            <ul className="space-y-2.5 font-semibold text-text-secondary text-sm">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-primary-active transition-colors duration-200 group"
                  >
                    <span className={"w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-transform duration-200 group-hover:scale-110 " + social.iconBg}>
                      <social.Icon className="w-3.5 h-3.5" />
                    </span>
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-primary-active font-black text-base">تواصل الدعم العلمي</h3>
            <ul className="space-y-2 font-semibold text-text-secondary text-sm">
              {support.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary-active transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-10 pt-5 border-t border-border text-center space-y-1.5">
          <p className="text-sm font-bold text-text-primary">جميع الحقوق محفوظة © 2026</p>
          <p dir="ltr" className="text-xs text-text-secondary font-mono tracking-tight">
            {`<Developed by="A7medMO" andPowered={true} />`}
          </p>
        </div>
      </div>
    </footer>
  );
}