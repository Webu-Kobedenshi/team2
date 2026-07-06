type QuestionCardProps = {
  label?: string;
  question: string;
};

export function QuestionCard({
  label = "仮の質問",
  question,
}: QuestionCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-slate-900">{question}</p>
    </div>
  );
}
