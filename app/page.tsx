// app/page.tsx
import AboutSection from '@/components/AboutSection';
import CoursesSection from '@/components/CoursesSection';
import CtaSection from '@/components/CtaSection';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <CtaSection />
    </main>
  );
}