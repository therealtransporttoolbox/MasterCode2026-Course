import React, { createContext, useContext, useState, useEffect } from "react";

interface CourseProgress {
  completedLessons: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;
  finalAssessmentScore: number | null;
  finalAssessmentCompleted: boolean;
}

interface CourseContextType {
  progress: CourseProgress;
  completeLesson: (lessonId: string) => void;
  completeQuiz: (moduleId: string, score: number) => void;
  completeFinalAssessment: (score: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isQuizCompleted: (moduleId: string) => boolean;
  getModuleProgress: (moduleId: string, totalLessons: number) => number;
  resetProgress: () => void;
}

const defaultProgress: CourseProgress = {
  completedLessons: [],
  completedQuizzes: [],
  quizScores: {},
  finalAssessmentScore: null,
  finalAssessmentCompleted: false,
};

const CourseContext = createContext<CourseContextType | null>(null);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<CourseProgress>(() => {
    try {
      const stored = localStorage.getItem("nhvr-course-progress");
      return stored ? JSON.parse(stored) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem("nhvr-course-progress", JSON.stringify(progress));
  }, [progress]);

  const completeLesson = (lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId],
    }));
  };

  const completeQuiz = (moduleId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      completedQuizzes: prev.completedQuizzes.includes(moduleId)
        ? prev.completedQuizzes
        : [...prev.completedQuizzes, moduleId],
      quizScores: { ...prev.quizScores, [moduleId]: score },
    }));
  };

  const completeFinalAssessment = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      finalAssessmentScore: score,
      finalAssessmentCompleted: true,
    }));
  };

  const isLessonCompleted = (lessonId: string) =>
    progress.completedLessons.includes(lessonId);

  const isQuizCompleted = (moduleId: string) =>
    progress.completedQuizzes.includes(moduleId);

  const getModuleProgress = (moduleId: string, totalLessons: number) => {
    const modulePrefix = moduleId.replace("module-", "m");
    const completed = progress.completedLessons.filter((id) =>
      id.startsWith(modulePrefix)
    ).length;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
  };

  return (
    <CourseContext.Provider
      value={{
        progress,
        completeLesson,
        completeQuiz,
        completeFinalAssessment,
        isLessonCompleted,
        isQuizCompleted,
        getModuleProgress,
        resetProgress,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within CourseProvider");
  return ctx;
}
