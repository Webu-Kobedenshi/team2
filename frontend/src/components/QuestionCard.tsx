import type { Question } from "../features/questions";
import { QuestionPanel } from "./QuestionPanel";

type QuestionCardProps = {
  question: Question;
  questionNumber: number;
  questionCount: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
};

export function QuestionCard({
  question,
  questionNumber,
  questionCount,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <QuestionPanel
      questionNumber={questionNumber}
      questionCount={questionCount}
      questionText={question.text}
      contentClassName="gap-2.5"
    >
      {question.options.map((option) => {
        const isSelected = selectedAnswer === option.id;

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelectAnswer(option.id)}
            className={[
              "min-h-14 rounded-2xl border px-4 py-3 text-center text-lg font-bold transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-200",
              isSelected
                ? "border-sky-400 bg-sky-400 text-white shadow-md shadow-sky-400/20"
                : "border-slate-200 bg-white text-slate-900 hover:border-sky-200 hover:bg-sky-50",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </QuestionPanel>
  );
}
