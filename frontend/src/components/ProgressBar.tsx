type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  let message: string;

  if (percentage < 30) {
    message = "🌱 ゲームを始めましょう！";
  } else if (percentage < 70) {
    message = "🌸 順調に進んでいます！";
  } else if (percentage < 100) {
    message = "✨ あと少しです！";
  } else {
    message = "🎉 お疲れさまでした！";
  }

  return (
    <div className="w-full">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-sky-700">
          🤝 共通点ファインダー
        </h3>

        <span className="text-sm text-slate-500">
          {current} / {total}
        </span>
      </div>

      {/* Progress Bar */}

      <div className="mt-3 h-5 overflow-hidden rounded-full bg-slate-200 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 transition-all duration-700 ease-in-out"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {/* Percentage */}

      <div className="mt-3 flex justify-between text-sm">
        <span className="font-semibold text-sky-700">
          質問 {current} / {total}
        </span>

        <span className="text-slate-500">{Math.round(percentage)}%</span>
      </div>

      {/* Message */}

      <p className="mt-4 text-center text-slate-600 font-medium">{message}</p>
    </div>
  );
}
