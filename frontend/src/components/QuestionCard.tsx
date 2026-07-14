import type { Question } from "../features/questions";
import { ChoiceButton } from "./buttons";

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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-500">
        質問 {questionNumber} / {questionCount}
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">{question.text}</h2>
      <div className="mt-5 grid gap-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;

          return (
            <ChoiceButton
              key={option.id}
              selected={isSelected}
              onClick={() => onSelectAnswer(option.id)}
            >
              {option.label}
            </ChoiceButton>
          );
        })}
      </div>
    </div>
  );
}
