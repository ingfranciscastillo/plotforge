"use client";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features";
import CallToAction from "@/components/call-to-action";
import ContactSection from "@/components/contact";
import FooterSection from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-background relative">
      {/* Bottom Fade Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
        }}
      />
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <CallToAction />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  );
}
