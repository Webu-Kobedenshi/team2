type HowToPlayProps = {
  onBack: () => void;
  onStart: () => void;
};

export function HowToPlay({ onBack, onStart }: HowToPlayProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-yellow-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl p-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-6xl">📖✨</div>

          <h1 className="text-5xl font-extrabold text-slate-800">遊び方</h1>

          <p className="text-lg text-slate-600">
            みんなで協力して、共通点を見つけましょう！
          </p>
        </div>

        {/* Steps */}

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="rounded-2xl bg-sky-50 p-6 shadow hover:scale-105 transition">
            <div className="text-5xl mb-4">👥</div>

            <h2 className="font-bold text-2xl mb-3 text-sky-700">STEP 1</h2>

            <p className="font-semibold mb-2">参加人数を選びます</p>

            <p className="text-slate-600">
              ゲームに参加する人数（2〜4人）を選択します。
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-6 shadow hover:scale-105 transition">
            <div className="text-5xl mb-4">📱</div>

            <h2 className="font-bold text-2xl mb-3 text-green-700">STEP 2</h2>

            <p className="font-semibold mb-2">順番に質問へ答えます</p>

            <p className="text-slate-600">
              一人ずつ端末を回しながら、 自分だけが質問に答えます。
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-6 shadow hover:scale-105 transition">
            <div className="text-5xl mb-4">💡</div>

            <h2 className="font-bold text-2xl mb-3 text-yellow-700">STEP 3</h2>

            <p className="font-semibold mb-2">共通点を探します</p>

            <p className="text-slate-600">
              全員の回答が集まったら、 共通点を見つけます。
            </p>
          </div>

          <div className="rounded-2xl bg-pink-50 p-6 shadow hover:scale-105 transition">
            <div className="text-5xl mb-4">🎉</div>

            <h2 className="font-bold text-2xl mb-3 text-pink-700">STEP 4</h2>

            <p className="font-semibold mb-2">会話を楽しもう！</p>

            <p className="text-slate-600">
              結果を見ながら、 新しい共通点について話してみましょう！
            </p>
          </div>
        </div>

        {/* Tips */}

        <div className="mt-10 rounded-2xl bg-sky-100 p-6">
          <h3 className="text-xl font-bold text-sky-700 mb-3">
            🌟 ワンポイント
          </h3>

          <p className="text-slate-700 leading-relaxed">
            正解・不正解はありません。 思ったことを素直に答えることで、
            意外な共通点が見つかるかもしれません！
          </p>
        </div>

        {/* Buttons */}

        <div className="flex flex-col md:flex-row justify-center gap-5 mt-10">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border-2 border-sky-500 px-8 py-4 font-bold text-sky-600 hover:bg-sky-50 transition"
          >
            🏠 ホームへ戻る
          </button>

          <button
            type="button"
            onClick={onStart}
            className="rounded-full bg-sky-500 px-8 py-4 font-bold text-white shadow-lg hover:bg-sky-600 hover:scale-105 transition"
          >
            🎮 ゲームを始める
          </button>
        </div>
      </div>
    </main>
  );
}
