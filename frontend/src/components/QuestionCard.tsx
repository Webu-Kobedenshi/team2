import type { Question } from "../features/questions";
import { QuestionPanel } from "./QuestionPanel";
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
    <QuestionPanel
      questionNumber={questionNumber}
      questionCount={questionCount}
      questionText={question.text}
      contentClassName="gap-2.5"
    >
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
    </QuestionPanel>
  );
}
