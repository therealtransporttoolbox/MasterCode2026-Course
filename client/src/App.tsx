import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CourseProvider } from "./contexts/CourseContext";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";
import FinalAssessmentPage from "./pages/FinalAssessmentPage";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/course" component={CoursePage} />
      <Route path="/course/module/:moduleId/lesson/:lessonId" component={LessonPage} />
      <Route path="/course/module/:moduleId/quiz" component={QuizPage} />
      <Route path="/course/final-assessment" component={FinalAssessmentPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CourseProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CourseProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
