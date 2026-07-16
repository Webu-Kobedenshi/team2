import type { ReactNode } from "react";

type QuestionPanelProps = {
  questionNumber: number;
  questionCount: number;
  questionText: string;
  children: ReactNode;
  contentClassName?: string;
};

export function QuestionPanel({
  questionNumber,
  questionCount,
  questionText,
  children,
  contentClassName = "gap-3",
}: QuestionPanelProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-500">
        質問 {questionNumber} / {questionCount}
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">{questionText}</h2>
      <div className={`mt-5 grid ${contentClassName}`}>{children}</div>
    </div>
  );
}
