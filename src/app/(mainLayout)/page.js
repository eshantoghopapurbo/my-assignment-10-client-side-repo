import CTASection from "@/components/CTASection";
import FreelancersSection from "@/components/FreelancersSection";
import HeroSection from "@/components/HeroSection";
import WorksSection from "@/components/WorksSection";

export const metadata = {
  title: "SkillSwap — Freelance Micro-Task Platform",
  description: "Post tasks, hire skilled freelancers, and get work done fast on SkillSwap.",
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <WorksSection />
      <FreelancersSection />
      <CTASection />
    </div>
  );
}
