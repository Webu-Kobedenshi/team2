type QuestionProps = {
  currentPlayer: number;
  totalPlayers: number;
  currentQuestion: number;
  totalQuestions: number;
  question: string;
  emoji: string;
  choices: string[];
  selectedAnswer: string;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function Questions({
  currentPlayer,
  totalPlayers,
  currentQuestion,
  totalQuestions,
  question,
  emoji,
  choices,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
}: QuestionProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-yellow-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-3xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl p-10">
        {/* Header */}

        <div className="text-center">
          <div className="text-6xl">🤝</div>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-800">
            Friendship Finder
          </h1>

          <p className="mt-2 text-sky-600 font-bold">
            PLAYER {currentPlayer} / {totalPlayers}
          </p>
        </div>

        {/* Progress */}

        <div className="mt-8">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>質問 {currentQuestion + 1}</span>

            <span>{totalQuestions} 問</span>
          </div>

          <div className="w-full h-4 rounded-full bg-slate-200">
            <div
              className="h-4 rounded-full bg-sky-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}

        <div className="mt-10 rounded-3xl bg-sky-50 p-8 text-center shadow">
          <div className="text-5xl mb-5">{emoji}</div>

          <h2 className="text-3xl font-bold text-slate-800">{question}</h2>
        </div>

        {/* Answers */}

        <div className="grid gap-4 mt-8">
          {choices.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => onSelectAnswer(choice)}
              className={`rounded-2xl p-5 text-lg font-semibold transition-all duration-300 shadow

                ${
                  selectedAnswer === choice
                    ? "bg-sky-500 text-white scale-105"
                    : "bg-white hover:bg-sky-100 hover:scale-105"
                }
              `}
            >
              {choice}
            </button>
          ))}
        </div>

        {/* Bottom */}

        <div className="flex justify-between mt-10">
          <button
            onClick={onPrevious}
            className="rounded-full border-2 border-sky-500 px-8 py-3 font-bold text-sky-600 hover:bg-sky-50 transition"
          >
            ← 戻る
          </button>

          <button
            onClick={onNext}
            disabled={!selectedAnswer}
            className={`rounded-full px-8 py-3 font-bold text-white transition

            ${
              selectedAnswer
                ? "bg-sky-500 hover:bg-sky-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            次へ →
          </button>
        </div>
      </div>
    </main>
  );
}
