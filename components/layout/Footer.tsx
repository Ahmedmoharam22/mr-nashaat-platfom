import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white pt-8 pb-6 border-t border-slate-100 text-slate-800 dir-rtl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* شبكة الأعمدة الأربعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
          
          {/* العمود الأول: اللوجو */}
          <div className="flex flex-col items-start space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/main-logo.png"
                alt="كلام مؤرخين - مستر نشأت"
                width={160}
                height={80}
                className="h-auto w-auto object-contain"
              />
            </Link>
          </div>

          {/* العمود الثاني: الصفحات */}
          <div className="space-y-2.5">
            <h3 className="text-amber-500 font-black text-base">الصفحات</h3>
            <ul className="space-y-2 font-semibold text-slate-700 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-600 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-amber-600 transition-colors">
                  المساعدة
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-amber-600 transition-colors">
                  انشاء حساب جديد
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-600 transition-colors">
                  تسجيل الدخول
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: السوشيال ميديا */}
          <div className="space-y-2.5">
            <h3 className="text-amber-500 font-black text-base">السوشيال ميديا</h3>
            <ul className="space-y-2 font-semibold text-slate-700 text-sm">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-amber-600 transition-colors"
                >
                  <span className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                    <FaFacebookF className="w-3.5 h-3.5 fill-current" />
                  </span>
                  <span>فيسبوك</span>
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-amber-600 transition-colors"
                >
                  <span className="w-6 h-6 rounded bg-slate-100 text-slate-900 flex items-center justify-center text-xs">
                    <FaTiktok className="w-3.5 h-3.5 fill-current" />
                  </span>
                  <span>تيك توك</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-amber-600 transition-colors"
                >
                  <span className="w-6 h-6 rounded bg-red-100 text-red-600 flex items-center justify-center text-xs">
                    <FaYoutube className="w-3.5 h-3.5 fill-current" />
                  </span>
                  <span>يوتيوب</span>
                </a>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: تواصل الدعم العلمي */}
          <div className="space-y-2.5">
            <h3 className="text-amber-500 font-black text-base">تواصل الدعم العلمي</h3>
            <ul className="space-y-2 font-semibold text-slate-700 text-sm">
              <li>
                <Link href="/support/online" className="hover:text-amber-600 transition-colors">
                  تواصل مع دعم الاونلاين
                </Link>
              </li>
              <li>
                <Link href="/support/centers" className="hover:text-amber-600 transition-colors">
                  تواصل مع دعم السناتر
                </Link>
              </li>
              <li>
                <Link href="/support/grade-3" className="hover:text-amber-600 transition-colors">
                  المادة العلمية - صف ثالث ثانوي
                </Link>
              </li>
              <li>
                <Link href="/support/grades-1-2" className="hover:text-amber-600 transition-colors">
                  المادة العلمية - صف ثاني و أول ثانوي
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* سكشن حقوق الملكية والتطوير في الأسفل بالمنتصف بره الجريد */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center space-y-1">
          <p className="text-sm font-bold text-slate-900">
            جميع الحقوق محفوظة © 2026
          </p>
          <p className="text-xs text-slate-500 font-mono tracking-tight dir-ltr">
            {`<Developed by="A7medMO" andPowered=true />`}
          </p>
        </div>

      </div>
    </footer>
  );
}