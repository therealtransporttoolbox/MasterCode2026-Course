// Design: Clean Professional — NHVR Navy/Blue/Amber palette, DM Sans UI, Lora body
// Hero: dark overlay on highway image — white text required
import { useLocation } from "wouter";
import { BookOpen, Award, Clock, Users, ChevronRight, CheckCircle, Shield, Truck } from "lucide-react";
import { courseModules } from "@/data/courseData";
import { useCourse } from "@/contexts/CourseContext";
import CommunityModal from "@/components/CommunityModal";

const HERO_URL =
  "https://private-us-east-1.manuscdn.com/sessionFile/hGzbcCWHHJkpSz9zf3yFuB/sandbox/7OhuWhyFobxzaJ9vYf1ugV-img-1_1771737829000_na1fn_bmh2ci1oZXJvLWJhbm5lcg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaEd6YmNDV0hISmtwU3o5emYzeUZ1Qi9zYW5kYm94LzdPaHVXaHlGb2J4emFKOXZZZjF1Z1YtaW1nLTFfMTc3MTczNzgyOTAwMF9uYTFmbl9ibWgyY2kxb1pYSnZMV0poYm01bGNnLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Dh9AtxLciiyGDwm0uYAlZrBkszNNiqR6MXgHmAzJ1Ib1Jti4Dvy46MHUF7k5pByJNK7B8gyB3oHxzcNOw1O7ZJcxaj3jD0iqX1jEwgHbjHmRHlnfn8qnQdXY7kGvg9RE8rWOL-uovq0xRMPa98ux7CpWLPlrsUtpsPsb8HAnSNHsXv~Xl8PsZL-kJLaSW52gzCHSNV7GrdlnEe-bP0t1jkUl3JH9uGalDR9u4vQ3Lun6kMgAeHjEVdBLS54jmrZLwAQ0KK~VWPYRwrtt0QDUQO26tHu5TMrEEGUsZNV-N4GbLozE4KVQ6sFBs9bT7NGnmzGkUhjU0RBCZ5j87fxAOg__";

const COR_URL =
  "https://private-us-east-1.manuscdn.com/sessionFile/hGzbcCWHHJkpSz9zf3yFuB/sandbox/7OhuWhyFobxzaJ9vYf1ugV-img-2_1771737837000_na1fn_bmh2ci1jb3ItZGlhZ3JhbQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaEd6YmNDV0hISmtwU3o5emYzeUZ1Qi9zYW5kYm94LzdPaHVXaHlGb2J4emFKOXZZZjF1Z1YtaW1nLTJfMTc3MTczNzgzNzAwMF9uYTFmbl9ibWgyY2kxamIzSXRaR2xoWjNKaGJRLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lCkQ~9XGKlwq9XaT7DF1aK2cpEKhjCTCeGQIyqoa3FX3iqdaZJ6k~vMXSpUyRABSqxJqgGnSNrSLKtaPiGJ253jMaDkwsrGZlBwxe19pwu-4yekXbWkRmD7FNJ6SZRybX3WGym0BVEvG5gDSctExpRrT0nNNEaur7ORhwYGeg49chILBFneo4YHLsRkhTAdpjnomjGBuQRYwZHziT1LW8oSrodtDcAhmemjroHEhJ45UVu4rM3fXjq75AF5ORfiJ3dPSqFIo72Abr-CKo~2cW9Z78GlguYFigG1TCf44698D2xg8XX27swBEecUaSbIvJ4piJQ13BVvT-QlG7rL9Og__";

export default function Home() {
  const [, navigate] = useLocation();
  const { progress } = useCourse();

  const totalLessons = courseModules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);
  const hasStarted = completedLessons > 0;

  return (
    <div className="min-h-screen bg-background">
      <CommunityModal />
      {/* Top nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[oklch(0.28_0.10_250)] flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-[oklch(0.22_0.06_250)] text-sm">NHVR Master Code 2026</span>
          </div>
          <button
            onClick={() => navigate("/course")}
            className="text-sm font-medium text-[oklch(0.38_0.12_250)] hover:text-[oklch(0.22_0.06_250)] transition-colors"
          >
            {hasStarted ? "Continue Course" : "Start Course"} →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative min-h-[580px] flex items-center"
        style={{
          backgroundImage: `url(${HERO_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.06_250/0.97)] via-[oklch(0.10_0.06_250/0.88)] to-[oklch(0.10_0.06_250/0.45)]" />
        <div className="relative container py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[oklch(0.72_0.17_65)] text-[oklch(0.15_0.04_250)] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded mb-6">
              <Shield className="w-3.5 h-3.5" />
              Official Training Course — 2026 Edition
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              NHVR Master Code<br />of Practice
            </h1>
            <p className="text-lg text-white/85 mb-8 leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
              A comprehensive online course covering the 2026 National Heavy Vehicle Regulator Master Code of Practice — Chain of Responsibility, risk management, and compliance obligations for all CoR parties and their executives.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: BookOpen, label: "10 Modules" },
                { icon: Clock, label: "~3 Hours" },
                { icon: Users, label: "All CoR Parties" },
                { icon: Award, label: "Certificate on Completion" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/90 text-sm">
                  <Icon className="w-4 h-4 text-[oklch(0.72_0.17_65)]" />
                  {label}
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/course")}
              className="inline-flex items-center gap-2 bg-[oklch(0.72_0.17_65)] hover:bg-[oklch(0.65_0.17_65)] text-[oklch(0.15_0.04_250)] font-bold px-7 py-3.5 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
            >
              {hasStarted ? `Continue — ${overallProgress}% Complete` : "Start Course Now"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Progress bar (if started) */}
      {hasStarted && (
        <div className="bg-[oklch(0.22_0.06_250)] text-white py-4">
          <div className="container flex items-center gap-4">
            <span className="text-sm font-medium text-white/80 whitespace-nowrap">Your Progress</span>
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div
                className="bg-[oklch(0.72_0.17_65)] h-2 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <span className="text-sm font-bold text-[oklch(0.72_0.17_65)] whitespace-nowrap">{overallProgress}%</span>
          </div>
        </div>
      )}

      {/* Course overview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[oklch(0.22_0.06_250)] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              What You Will Learn
            </h2>
            <p className="text-[oklch(0.40_0.03_250)] text-lg leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
              This course covers every aspect of the 2026 Master Code, from the legal framework and Chain of Responsibility to sector-specific controls and the final assessment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseModules.map((module) => {
              const moduleCompleted = progress.completedQuizzes.includes(module.id);
              return (
                <div
                  key={module.id}
                  onClick={() => navigate("/course")}
                  className="group border border-border rounded-xl p-5 hover:border-[oklch(0.55_0.14_250)] hover:shadow-md transition-all cursor-pointer bg-white"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: module.color }}
                    >
                      {module.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[oklch(0.22_0.06_250)] text-sm leading-tight group-hover:text-[oklch(0.38_0.12_250)] transition-colors">
                          {module.title}
                        </h3>
                        {moduleCompleted && (
                          <CheckCircle className="w-4 h-4 text-[oklch(0.55_0.14_155)] flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[oklch(0.50_0.02_250)] leading-relaxed">
                        {module.description.slice(0, 90)}…
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CoR diagram section */}
      <section className="py-16 bg-[oklch(0.97_0.005_250)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[oklch(0.38_0.12_250)] mb-4">
                <Shield className="w-4 h-4" />
                Chain of Responsibility
              </div>
              <h2 className="text-3xl font-bold text-[oklch(0.22_0.06_250)] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Who Is Responsible for Heavy Vehicle Safety?
              </h2>
              <p className="text-[oklch(0.35_0.03_250)] leading-relaxed mb-6" style={{ fontFamily: "'Lora', serif" }}>
                The Chain of Responsibility (CoR) framework places legal obligations on every party in the supply chain who has the ability to influence heavy vehicle safety — not just the driver. There are 10 defined roles, each with the same Primary Duty to ensure safety so far as is reasonably practicable.
              </p>
              <ul className="space-y-2">
                {["Operator & Scheduler", "Consignor & Consignee", "Packer & Loading Manager", "Loader & Unloader", "Employer & Prime Contractor"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[oklch(0.30_0.04_250)]">
                    <CheckCircle className="w-4 h-4 text-[oklch(0.55_0.14_155)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
              <img src={COR_URL} alt="Chain of Responsibility diagram" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Why this course */}
      <section className="py-16 bg-[oklch(0.22_0.06_250)] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Why Complete This Course?
            </h2>
            <p className="text-white/75 text-lg leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
              The 2026 Master Code has evidentiary status in court proceedings. Understanding it is itself an act of executive due diligence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Legal Protection",
                desc: "Courts may use the Master Code to assess what was 'reasonably practicable'. Following it provides a strong legal defence.",
              },
              {
                icon: Award,
                title: "Executive Due Diligence",
                desc: "Completing this course directly satisfies the HVNL requirement for executives to acquire and maintain knowledge of heavy vehicle safety matters.",
              },
              {
                icon: Users,
                title: "Whole-of-Chain Safety",
                desc: "Understand how your role in the supply chain connects to the safety of drivers, workers, and the public — and what you can do about it.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/10 rounded-xl p-6 border border-white/15">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.72_0.17_65)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[oklch(0.15_0.04_250)]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="container">
          <h2 className="text-3xl font-bold text-[oklch(0.22_0.06_250)] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Ready to Get Started?
          </h2>
          <p className="text-[oklch(0.40_0.03_250)] mb-8 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Lora', serif" }}>
            Complete all 10 modules and the final assessment to receive your certificate of completion.
          </p>
          <button
            onClick={() => navigate("/course")}
            className="inline-flex items-center gap-2 bg-[oklch(0.28_0.10_250)] hover:bg-[oklch(0.22_0.06_250)] text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
          >
            {hasStarted ? "Continue Your Course" : "Begin the Course"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[oklch(0.15_0.04_250)] text-white/60 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[oklch(0.72_0.17_65)]" />
            <span>2026 NHVR Master Code of Practice — Online Course</span>
          </div>
          <p className="text-white/60 text-right">Based on the HVNL as at December 2025 — Penalties indexed to CPI 1 July 2025.<br />Refer: <em>Heavy Vehicle (Mass, Dimension and Loading) National Amendment Regulation 2025</em>, NHVR Master Code 2026</p>
        </div>
      </footer>
    </div>
  );
}
