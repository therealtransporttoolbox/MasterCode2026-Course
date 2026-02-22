// Design: Clean Professional — quiz card layout, animated feedback, progress
import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Award, RotateCcw } from "lucide-react";
import { courseModules } from "@/data/courseData";
import { useCourse } from "@/contexts/CourseContext";

export default function QuizPage() {
  const params = useParams<{ moduleId: string }>();
  const [, navigate] = useLocation();
  const { completeQuiz, isQuizCompleted, progress } = useCourse();

  const module = courseModules.find((m) => m.id === params.moduleId);
  const moduleIndex = courseModules.findIndex((m) => m.id === params.moduleId);
  const nextModule = courseModules[moduleIndex + 1];

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (!module) {
    return (
      <div className="flex items-center justify-center h-screen">
        <button onClick={() => navigate("/course")} className="text-[oklch(0.38_0.12_250)] underline">Back to Course</button>
      </div>
    );
  }

  const questions = module.quiz;
  const question = questions[currentQ];
  const alreadyPassed = isQuizCompleted(module.id);
  const existingScore = progress.quizScores[module.id];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setAnswered(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = selected;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      // Calculate score
      const finalAnswers = [...answers];
      finalAnswers[currentQ] = selected;
      const correct = finalAnswers.filter((a, i) => a === questions[i].correctIndex).length;
      const score = Math.round((correct / questions.length) * 100);
      completeQuiz(module.id, score);
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults || alreadyPassed) {
    const score = alreadyPassed && !showResults ? existingScore : (() => {
      const finalAnswers = [...answers];
      finalAnswers[currentQ] = selected;
      const correct = finalAnswers.filter((a, i) => a === questions[i].correctIndex).length;
      return Math.round((correct / questions.length) * 100);
    })();
    const passed = score >= 70;

    return (
      <div className="min-h-screen bg-[oklch(0.97_0.005_250)] flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Back */}
          <button
            onClick={() => navigate("/course")}
            className="flex items-center gap-1.5 text-sm text-[oklch(0.50_0.02_250)] hover:text-[oklch(0.38_0.12_250)] mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Course
          </button>

          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* Result header */}
            <div className={`p-8 text-center ${passed ? "bg-[oklch(0.22_0.06_250)]" : "bg-[oklch(0.55_0.20_25)]"}`}>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                {passed ? (
                  <Award className="w-8 h-8 text-[oklch(0.72_0.17_65)]" />
                ) : (
                  <XCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {passed ? "Quiz Passed!" : "Not Quite"}
              </h2>
              <p className="text-white/70 text-sm">
                {passed ? "Well done — you have demonstrated understanding of this module." : "Review the lesson content and try again."}
              </p>
              <div className="mt-4 text-4xl font-bold text-[oklch(0.72_0.17_65)]">{score}%</div>
              <p className="text-white/60 text-sm mt-1">{passed ? "Pass" : "Minimum 70% required to pass"}</p>
            </div>

            <div className="p-6">
              <div className="flex gap-3">
                {!passed && (
                  <button
                    onClick={handleRetry}
                    className="flex-1 flex items-center justify-center gap-2 border border-border rounded-lg py-2.5 text-sm font-medium text-[oklch(0.40_0.03_250)] hover:bg-[oklch(0.95_0.003_250)] transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" /> Retry Quiz
                  </button>
                )}
                {passed && nextModule && (
                  <button
                    onClick={() => navigate(`/course/module/${nextModule.id}/lesson/${nextModule.lessons[0].id}`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[oklch(0.28_0.10_250)] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[oklch(0.22_0.06_250)] transition-colors"
                  >
                    Next Module <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                {passed && !nextModule && (
                  <button
                    onClick={() => navigate("/course/final-assessment")}
                    className="flex-1 flex items-center justify-center gap-2 bg-[oklch(0.72_0.17_65)] text-[oklch(0.15_0.04_250)] rounded-lg py-2.5 text-sm font-bold hover:bg-[oklch(0.65_0.17_65)] transition-colors"
                  >
                    <Award className="w-4 h-4" /> Take Final Assessment
                  </button>
                )}
                <button
                  onClick={() => navigate("/course")}
                  className="flex items-center justify-center gap-2 border border-border rounded-lg px-4 py-2.5 text-sm text-[oklch(0.40_0.03_250)] hover:bg-[oklch(0.95_0.003_250)] transition-colors"
                >
                  Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isCorrect = answered && selected === question.correctIndex;
  const isWrong = answered && selected !== question.correctIndex;

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.005_250)] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Back */}
        <button
          onClick={() => navigate(`/course/module/${module.id}/lesson/${module.lessons[module.lessons.length - 1].id}`)}
          className="flex items-center gap-1.5 text-sm text-[oklch(0.50_0.02_250)] hover:text-[oklch(0.38_0.12_250)] mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Lessons
        </button>

        {/* Module badge */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: module.color }}
          >
            {module.number}
          </div>
          <div>
            <p className="text-xs text-[oklch(0.50_0.02_250)]">Module {module.number} Quiz</p>
            <h1 className="font-bold text-[oklch(0.22_0.06_250)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {module.title}
            </h1>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 bg-[oklch(0.88_0.005_250)] rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%`, backgroundColor: module.color }}
            />
          </div>
          <span className="text-xs font-medium text-[oklch(0.50_0.02_250)] whitespace-nowrap">
            {currentQ + 1} / {questions.length}
          </span>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.50_0.02_250)] mb-3">
              Question {currentQ + 1}
            </p>
            <h2 className="text-lg font-semibold text-[oklch(0.22_0.06_250)] leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {question.text}
            </h2>
          </div>

          <div className="p-6 space-y-3">
            {question.options.map((opt, i) => {
              let cls = "border-border text-[oklch(0.30_0.04_250)] hover:border-[oklch(0.55_0.14_250)] hover:bg-[oklch(0.97_0.005_250)]";
              if (selected === i && !answered) cls = "border-[oklch(0.38_0.12_250)] bg-[oklch(0.95_0.02_250)] text-[oklch(0.22_0.06_250)]";
              if (answered && i === question.correctIndex) cls = "border-[oklch(0.55_0.14_155)] bg-[oklch(0.95_0.08_155)] text-[oklch(0.25_0.10_155)]";
              if (answered && selected === i && i !== question.correctIndex) cls = "border-[oklch(0.55_0.20_25)] bg-[oklch(0.97_0.03_25)] text-[oklch(0.35_0.10_25)]";

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={answered}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${cls} ${answered ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold transition-all ${
                    selected === i && !answered ? "border-[oklch(0.38_0.12_250)] bg-[oklch(0.38_0.12_250)] text-white" :
                    answered && i === question.correctIndex ? "border-[oklch(0.55_0.14_155)] bg-[oklch(0.55_0.14_155)] text-white" :
                    answered && selected === i ? "border-[oklch(0.55_0.20_25)] bg-[oklch(0.55_0.20_25)] text-white" :
                    "border-[oklch(0.80_0.005_250)]"
                  }`}>
                    {answered && i === question.correctIndex ? <CheckCircle className="w-3.5 h-3.5" /> :
                     answered && selected === i && i !== question.correctIndex ? <XCircle className="w-3.5 h-3.5" /> :
                     String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-sm leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {answered && (
            <div className={`mx-6 mb-4 p-4 rounded-xl border ${
              isCorrect
                ? "bg-[oklch(0.95_0.08_155)] border-[oklch(0.70_0.12_155)]"
                : "bg-[oklch(0.97_0.03_25)] border-[oklch(0.75_0.12_25)]"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-4 h-4 text-[oklch(0.45_0.14_155)]" />
                ) : (
                  <XCircle className="w-4 h-4 text-[oklch(0.50_0.18_25)]" />
                )}
                <span className={`text-sm font-bold ${isCorrect ? "text-[oklch(0.30_0.12_155)]" : "text-[oklch(0.40_0.15_25)]"}`}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </span>
              </div>
              <p className="text-sm text-[oklch(0.30_0.04_250)] leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {/* Actions */}
          <div className="px-6 pb-6 flex gap-3">
            {!answered ? (
              <button
                onClick={handleSubmit}
                disabled={selected === null}
                className="flex-1 bg-[oklch(0.28_0.10_250)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[oklch(0.22_0.06_250)] transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 bg-[oklch(0.28_0.10_250)] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[oklch(0.22_0.06_250)] transition-colors"
              >
                {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
