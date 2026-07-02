type LoadingProps = {
  onShowResult: () => void;
};

export function Loading({ onShowResult }: LoadingProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-yellow-100 flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl p-10 text-center">
        {/* Emoji */}

        <div className="text-7xl animate-bounce">🤝✨</div>

        {/* Title */}

        <h1 className="mt-6 text-4xl font-extrabold text-slate-800">
          回答が集まりました！
        </h1>

        {/* Subtitle */}

        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          みんなの回答をまとめています。
          <br />
          共通点を探しています...
        </p>

        {/* Progress */}

        <div className="mt-10">
          <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-3/4 animate-pulse rounded-full bg-sky-500"></div>
          </div>
        </div>

        {/* Loading Dots */}

        <div className="mt-8 flex justify-center gap-3 text-3xl">
          <span className="animate-bounce">💙</span>
          <span className="animate-bounce delay-100">💛</span>
          <span className="animate-bounce delay-200">💚</span>
        </div>

        {/* Message */}

        <div className="mt-10 rounded-2xl bg-sky-50 p-5">
          <p className="text-slate-700">
            🌸
            <br />
            あと少しで結果が表示されます！
            <br />
            どんな共通点が見つかるでしょうか？
          </p>
        </div>

        {/* Button */}

        <button
          type="button"
          onClick={onShowResult}
          className="mt-10 rounded-full bg-sky-500 px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-sky-600 hover:scale-105 transition duration-300"
        >
          🎉 結果を見る
        </button>
      </div>
    </main>
  );
}
