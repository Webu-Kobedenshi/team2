import type { Question } from "../features/questions";

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
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectAnswer(option.id)}
              className={[
                "min-h-16 rounded-2xl border px-4 py-4 text-center text-lg font-black transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-200",
                isSelected
                  ? "border-blue-400 bg-blue-500 text-white shadow-md shadow-blue-500/20"
                  : "border-slate-200 bg-white text-slate-900 hover:border-blue-200 hover:bg-blue-50",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
