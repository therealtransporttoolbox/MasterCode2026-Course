// Design: Clean Professional — final assessment with certificate generation
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ChevronLeft, ChevronRight, CheckCircle, XCircle, Award,
  RotateCcw, Download, Truck, Shield
} from "lucide-react";
import { finalAssessmentQuestions } from "@/data/courseData";
import { useCourse } from "@/contexts/CourseContext";

export default function FinalAssessmentPage() {
  const [, navigate] = useLocation();
  const { completeFinalAssessment, progress } = useCourse();

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(finalAssessmentQuestions.length).fill(null));
  const [showResults, setShowResults] = useState(progress.finalAssessmentCompleted);
  const [candidateName, setCandidateName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  const questions = finalAssessmentQuestions;
  const question = questions[currentQ];

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
    const newAnswers = [...answers];
    newAnswers[currentQ] = selected;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const correct = newAnswers.filter((a, i) => a === questions[i].correctIndex).length;
      const score = Math.round((correct / questions.length) * 100);
      completeFinalAssessment(score);
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setAnswers(Array(questions.length).fill(null));
    setShowResults(false);
    setShowCertificate(false);
  };

  const finalScore = progress.finalAssessmentScore ?? (() => {
    const correct = answers.filter((a, i) => a === questions[i]?.correctIndex).length;
    return Math.round((correct / questions.length) * 100);
  })();

  const passed = finalScore >= 70;
  const today = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

  if (showCertificate) {
    return (
      <div className="min-h-screen bg-[oklch(0.97_0.005_250)] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <button
            onClick={() => setShowCertificate(false)}
            className="flex items-center gap-1.5 text-sm text-[oklch(0.50_0.02_250)] hover:text-[oklch(0.38_0.12_250)] mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Results
          </button>

          {/* Certificate */}
          <div
            id="certificate"
            className="bg-white rounded-2xl border-4 border-[oklch(0.28_0.10_250)] shadow-2xl overflow-hidden"
          >
            {/* Header band */}
            <div className="bg-[oklch(0.22_0.06_250)] px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="w-7 h-7 text-[oklch(0.72_0.17_65)]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.72_0.17_65)]">National Heavy Vehicle Regulator</p>
                  <p className="text-white font-bold text-sm">Training & Compliance</p>
                </div>
              </div>
              <Shield className="w-8 h-8 text-white/30" />
            </div>

            {/* Body */}
            <div className="px-10 py-10 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.50_0.02_250)] mb-2">Certificate of Completion</p>
              <h2 className="text-3xl font-bold text-[oklch(0.22_0.06_250)] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                2026 NHVR Master Code<br />of Practice
              </h2>

              <p className="text-[oklch(0.50_0.02_250)] text-sm mb-2">This is to certify that</p>
              <div className="border-b-2 border-[oklch(0.28_0.10_250)] inline-block min-w-[280px] mb-2">
                <p className="text-2xl font-bold text-[oklch(0.22_0.06_250)] pb-1" style={{ fontFamily: "'Lora', serif" }}>
                  {candidateName || "Course Participant"}
                </p>
              </div>
              <p className="text-[oklch(0.50_0.02_250)] text-sm mt-3 mb-6">
                has successfully completed the online course covering the<br />
                <strong className="text-[oklch(0.28_0.10_250)]">2026 NHVR Master Code of Practice</strong>
              </p>

              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[oklch(0.28_0.10_250)]">{finalScore}%</div>
                  <div className="text-xs text-[oklch(0.50_0.02_250)]">Final Assessment Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[oklch(0.28_0.10_250)]">10</div>
                  <div className="text-xs text-[oklch(0.50_0.02_250)]">Modules Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[oklch(0.28_0.10_250)]">Pass</div>
                  <div className="text-xs text-[oklch(0.50_0.02_250)]">Assessment Result</div>
                </div>
              </div>

              <p className="text-xs text-[oklch(0.60_0.02_250)]">Issued: {today}</p>
              <p className="text-xs text-[oklch(0.60_0.02_250)] mt-1">
                This course is based on the HVNL as at 1 December 2025.
              </p>
            </div>

            {/* Footer */}
            <div className="bg-[oklch(0.97_0.005_250)] px-8 py-4 border-t border-border text-center">
              <p className="text-xs text-[oklch(0.60_0.02_250)]">
                Completing this course constitutes an act of executive due diligence under s 26D of the Heavy Vehicle National Law.
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-2 bg-[oklch(0.28_0.10_250)] text-white font-semibold py-3 rounded-xl text-sm hover:bg-[oklch(0.22_0.06_250)] transition-colors"
            >
              <Download className="w-4 h-4" /> Print / Save Certificate
            </button>
            <button
              onClick={() => navigate("/course")}
              className="flex items-center justify-center gap-2 border border-border rounded-xl px-5 py-3 text-sm text-[oklch(0.40_0.03_250)] hover:bg-[oklch(0.95_0.003_250)] transition-colors"
            >
              Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-[oklch(0.97_0.005_250)] flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          <button
            onClick={() => navigate("/course")}
            className="flex items-center gap-1.5 text-sm text-[oklch(0.50_0.02_250)] hover:text-[oklch(0.38_0.12_250)] mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Course
          </button>

          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className={`p-8 text-center ${passed ? "bg-[oklch(0.22_0.06_250)]" : "bg-[oklch(0.55_0.20_25)]"}`}>
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                {passed ? (
                  <Award className="w-10 h-10 text-[oklch(0.72_0.17_65)]" />
                ) : (
                  <XCircle className="w-10 h-10 text-white" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {passed ? "Assessment Passed!" : "Assessment Not Passed"}
              </h2>
              <p className="text-white/70 text-sm mb-4">
                {passed
                  ? "Congratulations! You have demonstrated a thorough understanding of the 2026 NHVR Master Code of Practice."
                  : "You need 70% or higher to pass. Review the course content and try again."}
              </p>
              <div className="text-5xl font-bold text-[oklch(0.72_0.17_65)]">{finalScore}%</div>
              <p className="text-white/60 text-sm mt-1">
                {passed ? "Pass — Certificate Available" : "Minimum 70% required"}
              </p>
            </div>

            {passed && (
              <div className="p-6 border-b border-border">
                <label className="block text-sm font-semibold text-[oklch(0.22_0.06_250)] mb-2">
                  Enter your name for the certificate
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-[oklch(0.22_0.06_250)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.38_0.12_250)] focus:border-transparent"
                />
              </div>
            )}

            <div className="p-6 flex gap-3">
              {!passed && (
                <button
                  onClick={handleRetry}
                  className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-2.5 text-sm font-medium text-[oklch(0.40_0.03_250)] hover:bg-[oklch(0.95_0.003_250)] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Retry Assessment
                </button>
              )}
              {passed && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[oklch(0.72_0.17_65)] text-[oklch(0.15_0.04_250)] rounded-xl py-2.5 text-sm font-bold hover:bg-[oklch(0.65_0.17_65)] transition-colors"
                >
                  <Award className="w-4 h-4" /> View Certificate
                </button>
              )}
              <button
                onClick={() => navigate("/course")}
                className="flex items-center justify-center border border-border rounded-xl px-4 py-2.5 text-sm text-[oklch(0.40_0.03_250)] hover:bg-[oklch(0.95_0.003_250)] transition-colors"
              >
                Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isCorrect = answered && selected === question.correctIndex;

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.005_250)] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Back */}
        <button
          onClick={() => navigate("/course")}
          className="flex items-center gap-1.5 text-sm text-[oklch(0.50_0.02_250)] hover:text-[oklch(0.38_0.12_250)] mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Course
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[oklch(0.72_0.17_65)] flex items-center justify-center">
            <Award className="w-6 h-6 text-[oklch(0.15_0.04_250)]" />
          </div>
          <div>
            <p className="text-xs text-[oklch(0.50_0.02_250)]">Final Assessment</p>
            <h1 className="font-bold text-[oklch(0.22_0.06_250)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              2026 NHVR Master Code of Practice
            </h1>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 bg-[oklch(0.88_0.005_250)] rounded-full h-2">
            <div
              className="h-2 rounded-full bg-[oklch(0.72_0.17_65)] transition-all duration-300"
              style={{ width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-[oklch(0.50_0.02_250)] whitespace-nowrap">
            {currentQ + 1} / {questions.length}
          </span>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border bg-[oklch(0.22_0.06_250)]">
            <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.72_0.17_65)] mb-3">
              Question {currentQ + 1} of {questions.length}
            </p>
            <h2 className="text-lg font-semibold text-white leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
                {currentQ < questions.length - 1 ? "Next Question" : "See Final Results"}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
