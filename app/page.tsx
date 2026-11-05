import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from '@/components/landing/HowItWorks';
import Preview from '@/components/landing/Preview';
import CTA from '@/components/landing/CTA';

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-sky-50 via-white to-indigo-50/40 text-slate-900">
      <Hero />
      <Features />
      <HowItWorks />
      <Preview />
      <CTA />
    </main>
  );
}
