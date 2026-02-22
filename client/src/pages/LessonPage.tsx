// Design: Clean Professional — two-column layout, Lora body text, lesson sidebar
import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import {
  ChevronLeft, ChevronRight, CheckCircle, Clock, BookOpen,
  Menu, X, Truck, List, Award
} from "lucide-react";
import { courseModules } from "@/data/courseData";
import { useCourse } from "@/contexts/CourseContext";

export default function LessonPage() {
  const params = useParams<{ moduleId: string; lessonId: string }>();
  const [, navigate] = useLocation();
  const { completeLesson, isLessonCompleted, isQuizCompleted } = useCourse();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const module = courseModules.find((m) => m.id === params.moduleId);
  const lesson = module?.lessons.find((l) => l.id === params.lessonId);

  useEffect(() => {
    window.scrollTo(0, 0);
    setScrolled(false);
  }, [params.lessonId]);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("lesson-scroll");
      if (!el) return;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
      if (pct > 0.85) setScrolled(true);
    };
    const el = document.getElementById("lesson-scroll");
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [params.lessonId]);

  if (!module || !lesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-[oklch(0.50_0.02_250)] mb-4">Lesson not found.</p>
          <button onClick={() => navigate("/course")} className="text-[oklch(0.38_0.12_250)] underline">Back to Course</button>
        </div>
      </div>
    );
  }

  const lessonIndex = module.lessons.findIndex((l) => l.id === params.lessonId);
  const prevLesson = module.lessons[lessonIndex - 1];
  const nextLesson = module.lessons[lessonIndex + 1];
  const isCompleted = isLessonCompleted(lesson.id);
  const quizDone = isQuizCompleted(module.id);

  const handleMarkComplete = () => {
    completeLesson(lesson.id);
    if (nextLesson) {
      navigate(`/course/module/${module.id}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/course/module/${module.id}/quiz`);
    }
  };

  const LessonSidebar = () => (
    <aside className="w-64 bg-[oklch(0.97_0.005_250)] border-r border-border flex flex-col h-full overflow-y-auto">
      {/* Back */}
      <div className="p-4 border-b border-border">
        <button
          onClick={() => navigate("/course")}
          className="flex items-center gap-1.5 text-xs text-[oklch(0.50_0.02_250)] hover:text-[oklch(0.38_0.12_250)] transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Back to Course
        </button>
      </div>

      {/* Module info */}
      <div className="p-4 border-b border-border">
        <div
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-2 py-1 rounded mb-2"
          style={{ backgroundColor: `${module.color}20`, color: module.color }}
        >
          Module {module.number}
        </div>
        <h2 className="font-bold text-[oklch(0.22_0.06_250)] text-sm leading-tight">{module.title}</h2>
      </div>

      {/* Lesson list */}
      <nav className="flex-1 p-3 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[oklch(0.60_0.02_250)] px-2 mb-2">Lessons</p>
        {module.lessons.map((l, i) => {
          const done = isLessonCompleted(l.id);
          const active = l.id === params.lessonId;
          return (
            <button
              key={l.id}
              onClick={() => { navigate(`/course/module/${module.id}/lesson/${l.id}`); setSidebarOpen(false); }}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-left transition-colors ${
                active
                  ? "bg-[oklch(0.28_0.10_250)] text-white"
                  : "hover:bg-[oklch(0.92_0.003_250)] text-[oklch(0.30_0.04_250)]"
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                done ? "bg-[oklch(0.55_0.14_155)] text-white" : active ? "bg-white/20 text-white" : "bg-[oklch(0.88_0.005_250)] text-[oklch(0.50_0.02_250)]"
              }`}>
                {done ? <CheckCircle className="w-3 h-3" /> : i + 1}
              </div>
              <span className="text-xs font-medium leading-tight">{l.title}</span>
            </button>
          );
        })}

        {/* Quiz */}
        <button
          onClick={() => { navigate(`/course/module/${module.id}/quiz`); setSidebarOpen(false); }}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-left hover:bg-[oklch(0.92_0.003_250)] transition-colors mt-2 border border-dashed border-[oklch(0.85_0.005_250)]"
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
            quizDone ? "bg-[oklch(0.55_0.14_155)]" : "bg-[oklch(0.72_0.17_65/0.2)]"
          }`}>
            {quizDone ? <CheckCircle className="w-3 h-3 text-white" /> : <Award className="w-3 h-3 text-[oklch(0.72_0.17_65)]" />}
          </div>
          <span className="text-xs font-medium text-[oklch(0.40_0.03_250)]">Module Quiz</span>
        </button>
      </nav>
    </aside>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 flex-shrink-0">
        <LessonSidebar />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 flex flex-col bg-[oklch(0.97_0.005_250)]">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-semibold text-sm">Lessons</span>
              <button onClick={() => setSidebarOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <LessonSidebar />
          </div>
        </div>
      )}

      {/* Main lesson area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 lg:px-6 py-3 border-b border-border bg-white sticky top-0 z-10">
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(true)}>
            <List className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2 text-xs text-[oklch(0.50_0.02_250)]">
            <button onClick={() => navigate("/course")} className="hover:text-[oklch(0.38_0.12_250)] transition-colors">Course</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[oklch(0.30_0.04_250)] font-medium truncate max-w-[200px]">{module.title}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[oklch(0.22_0.06_250)] font-semibold truncate max-w-[200px]">{lesson.title}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[oklch(0.60_0.02_250)]" />
            <span className="text-xs text-[oklch(0.60_0.02_250)]">{lesson.duration}</span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-medium text-[oklch(0.45_0.12_155)]">
                <CheckCircle className="w-3.5 h-3.5" /> Completed
              </span>
            )}
          </div>
        </div>

        {/* Scrollable lesson content */}
        <div id="lesson-scroll" className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-8">
            {/* Lesson header */}
            <div className="mb-8">
              <div
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded mb-3"
                style={{ backgroundColor: `${module.color}15`, color: module.color }}
              >
                <BookOpen className="w-3 h-3" />
                Module {module.number} · Lesson {lessonIndex + 1} of {module.lessons.length}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[oklch(0.22_0.06_250)] leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {lesson.title}
              </h1>
            </div>

            {/* Key points */}
            <div className="bg-[oklch(0.22_0.06_250)] text-white rounded-xl p-5 mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.72_0.17_65)] mb-3">Key Points in This Lesson</p>
              <ul className="space-y-2">
                {lesson.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/90">
                    <div className="w-5 h-5 rounded-full bg-[oklch(0.72_0.17_65/0.3)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-[oklch(0.72_0.17_65)]">{i + 1}</span>
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Lesson body */}
            <div
              className="lesson-content"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {prevLesson ? (
                <button
                  onClick={() => navigate(`/course/module/${module.id}/lesson/${prevLesson.id}`)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm text-[oklch(0.40_0.03_250)] hover:bg-[oklch(0.95_0.003_250)] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="truncate">{prevLesson.title}</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/course")}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm text-[oklch(0.40_0.03_250)] hover:bg-[oklch(0.95_0.003_250)] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Course
                </button>
              )}

              <div className="flex-1" />

              <button
                onClick={handleMarkComplete}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isCompleted
                    ? "bg-[oklch(0.55_0.14_155)] text-white hover:bg-[oklch(0.48_0.14_155)]"
                    : "bg-[oklch(0.28_0.10_250)] text-white hover:bg-[oklch(0.22_0.06_250)]"
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {nextLesson ? "Next Lesson" : "Go to Quiz"}
                  </>
                ) : (
                  <>
                    {nextLesson ? "Mark Complete & Next" : "Mark Complete & Take Quiz"}
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
