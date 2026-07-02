import { useState } from "react";

type PlayerSelectProps = {
  onNext: (players: number) => void;
  onBack: () => void;
};

export function PlayerSelect({ onNext, onBack }: PlayerSelectProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<number | null>(null);

  const playerOptions = [
    {
      count: 2,
      emoji: "👥",
      color: "bg-sky-50 border-sky-400",
    },
    {
      count: 3,
      emoji: "👥👤",
      color: "bg-green-50 border-green-400",
    },
    {
      count: 4,
      emoji: "👥👥",
      color: "bg-yellow-50 border-yellow-400",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-yellow-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl p-10">
        {/* Header */}

        <div className="text-center">
          <div className="text-7xl animate-bounce">👨‍👩‍👧‍👦</div>

          <h1 className="mt-5 text-5xl font-extrabold text-slate-800">
            参加人数を選びましょう
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            一緒に遊ぶ人数を選択してください。
          </p>
        </div>

        {/* Player Cards */}

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {playerOptions.map((option) => (
            <button
              key={option.count}
              type="button"
              onClick={() => setSelectedPlayers(option.count)}
              className={`
                rounded-3xl border-4 p-8 shadow-lg transition-all duration-300
                hover:scale-105 hover:shadow-2xl
                ${
                  selectedPlayers === option.count
                    ? "border-sky-500 bg-sky-100 scale-105"
                    : option.color
                }
              `}
            >
              <div className="text-6xl">{option.emoji}</div>

              <h2 className="mt-6 text-4xl font-bold text-slate-800">
                {option.count} 人
              </h2>

              <p className="mt-4 text-slate-600">
                {option.count}人で楽しく共通点を探そう！
              </p>
            </button>
          ))}
        </div>

        {/* Selected Message */}

        <div className="mt-10 text-center">
          {selectedPlayers ? (
            <div className="inline-block rounded-2xl bg-sky-100 px-8 py-5">
              <p className="text-2xl font-bold text-sky-700">
                🌸 {selectedPlayers}人でゲームを始めます！
              </p>
            </div>
          ) : (
            <p className="text-slate-500 text-lg">👆 人数を選択してください</p>
          )}
        </div>

        {/* Buttons */}

        <div className="flex flex-col md:flex-row justify-center gap-5 mt-12">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border-2 border-sky-500 px-10 py-4 text-lg font-bold text-sky-600 hover:bg-sky-50 transition"
          >
            🏠 ホームへ戻る
          </button>

          <button
            type="button"
            disabled={!selectedPlayers}
            onClick={() => {
              if (selectedPlayers) {
                onNext(selectedPlayers);
              }
            }}
            className={`
              rounded-full px-10 py-4 text-lg font-bold text-white shadow-lg transition duration-300
              ${
                selectedPlayers
                  ? "bg-sky-500 hover:bg-sky-600 hover:scale-105"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            🚀 次へ進む
          </button>
        </div>
      </div>
    </main>
  );
}
