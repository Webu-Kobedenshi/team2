import type { Question } from "../features/questions";
import { Button } from "./buttons";
import { PageHeader } from "./PageHeader";
import { QuestionCard } from "./QuestionCard";

type QuestionAnswerProps = {
  question: Question;
  questionIndex: number;
  questionCount: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onReturnToPlayerSelect: () => void;
};

export function QuestionAnswer({
  question,
  questionIndex,
  questionCount,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  onNext,
  onReturnToPlayerSelect,
}: QuestionAnswerProps) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader
        label="STEP 2"
        title="質問に答えよう"
        description="自分にいちばん近い答えを一つ選んでね！"
      />

      <div className="grid gap-4">
        <div className="min-h-[23.25rem]">
          <QuestionCard
            question={question}
            questionNumber={questionIndex + 1}
            questionCount={questionCount}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
          />
        </div>

        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              disabled={questionIndex === 0}
              onClick={onPrevious}
            >
              前へ
            </Button>
            <Button disabled={!selectedAnswer} onClick={onNext}>
              次へ
            </Button>
          </div>
          <button
            type="button"
            onClick={onReturnToPlayerSelect}
            className="rounded-md text-center text-sm font-bold text-slate-500 transition hover:text-slate-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
          >
            人数選択へ戻る
          </button>
        </div>
      </div>
    </div>
  );
}
