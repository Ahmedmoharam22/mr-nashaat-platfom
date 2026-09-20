// app/page.tsx
import AboutSection from '@/components/AboutSection';
import CoursesSection from '@/components/CoursesSection';
import CtaSection from '@/components/CtaSection';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <CoursesSection />
      <CtaSection />
    </main>
  );
}