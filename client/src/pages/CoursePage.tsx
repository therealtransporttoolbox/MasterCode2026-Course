// Design: Clean Professional — persistent left sidebar, module tree, progress rings
import { useState } from "react";
import { useLocation } from "wouter";
import {
  BookOpen, Award, CheckCircle, Lock, ChevronRight, Menu, X,
  BookOpenCheck, Truck, Home, BarChart3
} from "lucide-react";
import { courseModules } from "@/data/courseData";
import { useCourse } from "@/contexts/CourseContext";

function ProgressRing({ pct, size = 36, stroke = 3, color = "oklch(0.55_0.14_250)" }: {
  pct: number; size?: number; stroke?: number; color?: string;
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="oklch(0.88_0.005_250)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
    </svg>
  );
}

export default function CoursePage() {
  const [, navigate] = useLocation();
  const { progress, isLessonCompleted, isQuizCompleted, getModuleProgress } = useCourse();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalLessons = courseModules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;
  const overallPct = Math.round((completedLessons / totalLessons) * 100);
  const completedModules = progress.completedQuizzes.length;

  // Determine which module is "next" to work on
  const nextModule = courseModules.find((m) => !isQuizCompleted(m.id));
  const allModulesComplete = courseModules.every((m) => isQuizCompleted(m.id));

  const Sidebar = () => (
    <aside className="w-72 bg-sidebar flex flex-col h-full overflow-y-auto">
      {/* Brand */}
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-1">
          <Truck className="w-5 h-5 text-sidebar-primary" />
          <span className="font-bold text-sidebar-foreground text-sm">NHVR Master Code</span>
        </div>
        <p className="text-xs text-sidebar-foreground/50">2026 Edition</p>
      </div>

      {/* Overall progress */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-sidebar-foreground/70">Overall Progress</span>
          <span className="text-xs font-bold text-sidebar-primary">{overallPct}%</span>
        </div>
        <div className="bg-sidebar-border rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-sidebar-primary transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <p className="text-xs text-sidebar-foreground/50 mt-1.5">
          {completedLessons}/{totalLessons} lessons · {completedModules}/{courseModules.length} modules
        </p>
      </div>

      {/* Nav links */}
      <div className="p-3 border-b border-sidebar-border">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm transition-colors"
        >
          <Home className="w-4 h-4" /> Course Home
        </button>
      </div>

      {/* Module list */}
      <nav className="flex-1 p-3 space-y-1">
        {courseModules.map((module) => {
          const pct = getModuleProgress(module.id, module.lessons.length);
          const quizDone = isQuizCompleted(module.id);
          const isAccessible = true; // all modules accessible

          return (
            <div key={module.id}>
              <button
                onClick={() => {
                  if (isAccessible) {
                    navigate(`/course/module/${module.id}/lesson/${module.lessons[0].id}`);
                    setSidebarOpen(false);
                  }
                }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-sidebar-accent group transition-colors text-left"
              >
                <div className="relative flex-shrink-0">
                  <ProgressRing pct={pct} size={32} stroke={2.5} color={quizDone ? "oklch(0.55_0.14_155)" : "oklch(0.72_0.17_65)"} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {quizDone ? (
                      <CheckCircle className="w-3.5 h-3.5 text-[oklch(0.55_0.14_155)]" />
                    ) : (
                      <span className="text-[10px] font-bold text-sidebar-foreground/70">{module.number}</span>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-sidebar-foreground/90 group-hover:text-sidebar-accent-foreground leading-tight truncate">
                    {module.title}
                  </p>
                  <p className="text-[10px] text-sidebar-foreground/50 mt-0.5">
                    {module.lessons.length} lessons
                  </p>
                </div>
              </button>
            </div>
          );
        })}

        {/* Final assessment */}
        <button
          onClick={() => {
            if (allModulesComplete) {
              navigate("/course/final-assessment");
              setSidebarOpen(false);
            }
          }}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors text-left mt-2 border ${
            allModulesComplete
              ? "border-[oklch(0.72_0.17_65/0.4)] hover:bg-sidebar-accent"
              : "border-sidebar-border opacity-50 cursor-not-allowed"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-[oklch(0.72_0.17_65/0.2)] flex items-center justify-center flex-shrink-0">
            {progress.finalAssessmentCompleted ? (
              <CheckCircle className="w-4 h-4 text-[oklch(0.55_0.14_155)]" />
            ) : allModulesComplete ? (
              <Award className="w-4 h-4 text-[oklch(0.72_0.17_65)]" />
            ) : (
              <Lock className="w-4 h-4 text-sidebar-foreground/40" />
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground/90 leading-tight">Final Assessment</p>
            <p className="text-[10px] text-sidebar-foreground/50">
              {allModulesComplete ? "10 questions · 70% to pass" : "Complete all modules first"}
            </p>
          </div>
        </button>
      </nav>
    </aside>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-72 flex-shrink-0 border-r border-border">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 flex flex-col">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-white">
          <button onClick={() => setSidebarOpen(true)} className="p-1">
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <span className="font-semibold text-sm text-foreground">NHVR Master Code 2026</span>
        </div>

        <main className="flex-1 overflow-y-auto">
          {/* Dashboard header */}
          <div className="bg-[oklch(0.22_0.06_250)] text-white px-8 py-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                <BarChart3 className="w-4 h-4" />
                Course Dashboard
              </div>
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                2026 NHVR Master Code of Practice
              </h1>
              <p className="text-white/70 text-base max-w-2xl" style={{ fontFamily: "'Lora', serif" }}>
                A comprehensive course for all parties in the Chain of Responsibility and their executives. Complete all modules and the final assessment to receive your certificate.
              </p>
              <div className="flex flex-wrap gap-6 mt-6">
                <div>
                  <div className="text-2xl font-bold text-[oklch(0.72_0.17_65)]">{overallPct}%</div>
                  <div className="text-xs text-white/60">Overall Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[oklch(0.72_0.17_65)]">{completedModules}/{courseModules.length}</div>
                  <div className="text-xs text-white/60">Modules Complete</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[oklch(0.72_0.17_65)]">{completedLessons}/{totalLessons}</div>
                  <div className="text-xs text-white/60">Lessons Complete</div>
                </div>
                {progress.finalAssessmentScore !== null && (
                  <div>
                    <div className="text-2xl font-bold text-[oklch(0.72_0.17_65)]">{progress.finalAssessmentScore}%</div>
                    <div className="text-xs text-white/60">Final Assessment</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Continue button */}
          {nextModule && !allModulesComplete && (
            <div className="px-8 py-4 bg-[oklch(0.95_0.02_250)] border-b border-border">
              <div className="max-w-4xl flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[oklch(0.38_0.12_250)] uppercase tracking-wide">Continue Where You Left Off</p>
                  <p className="font-semibold text-[oklch(0.22_0.06_250)]">Module {nextModule.number}: {nextModule.title}</p>
                </div>
                <button
                  onClick={() => navigate(`/course/module/${nextModule.id}/lesson/${nextModule.lessons[0].id}`)}
                  className="flex items-center gap-2 bg-[oklch(0.28_0.10_250)] hover:bg-[oklch(0.22_0.06_250)] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Module grid */}
          <div className="px-8 py-8 max-w-5xl">
            <h2 className="text-xl font-bold text-[oklch(0.22_0.06_250)] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Course Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseModules.map((module) => {
                const pct = getModuleProgress(module.id, module.lessons.length);
                const quizDone = isQuizCompleted(module.id);

                return (
                  <div
                    key={module.id}
                    onClick={() => navigate(`/course/module/${module.id}/lesson/${module.lessons[0].id}`)}
                    className="group bg-white border border-border rounded-xl p-5 hover:border-[oklch(0.55_0.14_250)] hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                        style={{ backgroundColor: module.color }}
                      >
                        {quizDone ? <CheckCircle className="w-6 h-6" /> : module.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[oklch(0.22_0.06_250)] group-hover:text-[oklch(0.38_0.12_250)] transition-colors mb-1">
                          {module.title}
                        </h3>
                        <p className="text-xs text-[oklch(0.50_0.02_250)] leading-relaxed mb-3">
                          {module.description.slice(0, 100)}…
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-[oklch(0.92_0.003_250)] rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full transition-all duration-500"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: quizDone ? "oklch(0.55_0.14_155)" : module.color
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium text-[oklch(0.50_0.02_250)] whitespace-nowrap">
                            {pct}%
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-[oklch(0.55_0.02_250)]">
                            {module.lessons.length} lessons
                          </span>
                          {quizDone && (
                            <span className="text-xs font-medium text-[oklch(0.45_0.12_155)] flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Quiz passed
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[oklch(0.70_0.02_250)] group-hover:text-[oklch(0.38_0.12_250)] flex-shrink-0 mt-1 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Final assessment card */}
            <div className="mt-4">
              <div
                onClick={() => allModulesComplete && navigate("/course/final-assessment")}
                className={`group bg-white border-2 rounded-xl p-5 transition-all ${
                  allModulesComplete
                    ? "border-[oklch(0.72_0.17_65)] hover:shadow-md cursor-pointer"
                    : "border-dashed border-border opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.72_0.17_65/0.15)] flex items-center justify-center flex-shrink-0">
                    {progress.finalAssessmentCompleted ? (
                      <CheckCircle className="w-6 h-6 text-[oklch(0.55_0.14_155)]" />
                    ) : allModulesComplete ? (
                      <Award className="w-6 h-6 text-[oklch(0.72_0.17_65)]" />
                    ) : (
                      <Lock className="w-6 h-6 text-[oklch(0.60_0.02_250)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[oklch(0.22_0.06_250)] mb-1">Final Assessment</h3>
                    <p className="text-xs text-[oklch(0.50_0.02_250)]">
                      {allModulesComplete
                        ? "10 questions covering all modules. Score 70% or higher to receive your certificate."
                        : "Complete all 10 modules to unlock the final assessment."}
                    </p>
                    {progress.finalAssessmentCompleted && (
                      <p className="text-xs font-bold text-[oklch(0.45_0.12_155)] mt-1">
                        Score: {progress.finalAssessmentScore}% — Certificate Earned
                      </p>
                    )}
                  </div>
                  {allModulesComplete && (
                    <ChevronRight className="w-4 h-4 text-[oklch(0.70_0.02_250)] group-hover:text-[oklch(0.38_0.12_250)] flex-shrink-0 transition-colors" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
