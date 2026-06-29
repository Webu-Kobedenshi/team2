type PassDeviceProps = {
  currentPlayer: number;
  totalPlayers: number;
  onNext: () => void;
};

export function PassDevice({
  currentPlayer,
  totalPlayers,
  onNext,
}: PassDeviceProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-yellow-100 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-2xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl p-10 text-center">

        {/* Emoji */}

        <div className="text-7xl animate-bounce">
          📱✨
        </div>

        {/* Progress */}

        <p className="mt-6 text-sky-600 font-bold tracking-widest">
          PLAYER {currentPlayer} / {totalPlayers}
        </p>

        {/* Title */}

        <h1 className="mt-4 text-4xl font-extrabold text-slate-800">
          次のプレイヤーへ
        </h1>

        {/* Message */}

        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
          端末を
        </p>

        <div className="mt-5 inline-block rounded-full bg-sky-100 px-10 py-5">

          <p className="text-4xl font-extrabold text-sky-700">
            {currentPlayer} 人目
          </p>

        </div>

        <p className="mt-6 text-lg text-slate-600">
          の参加者へ渡してください。
        </p>

        {/* Reminder */}

        <div className="mt-10 rounded-2xl bg-yellow-50 p-6">

          <div className="text-4xl mb-3">
            🔒
          </div>

          <h2 className="text-xl font-bold text-yellow-700 mb-2">
            お願い
          </h2>

          <p className="text-slate-700 leading-relaxed">
            他の人の回答は見ないようにしましょう。
            <br />
            自分の思ったことを素直に答えてください！
          </p>

        </div>

        {/* Friendship Message */}

        <div className="mt-8 rounded-2xl bg-pink-50 p-5">

          <p className="text-slate-700">
            🌸
            <br />
            一人ひとりの答えが、
            <br />
            みんなの素敵な共通点になります。
          </p>

        </div>

        {/* Button */}

        <button
          type="button"
          onClick={onNext}
          className="mt-10 rounded-full bg-sky-500 px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-sky-600 hover:scale-105 transition duration-300"
        >
          🚀 回答を始める
        </button>

      </div>

    </main>
  );
}