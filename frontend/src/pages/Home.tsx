type HomeProps = {
  onStart: () => void;
  onShowHowToPlay: () => void;
};

export function Home({ onStart, onShowHowToPlay }: HomeProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-yellow-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl p-10">
        {/* Header */}
        <div className="text-center space-y-5">
          <div className="text-7xl">🤝✨</div>

          <p className="text-sky-600 font-bold tracking-widest">
            FRIENDSHIP FINDER
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800">
            共通点ファインダー
          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            質問に答えながら、
            <span className="font-bold text-sky-600">「みんなの共通点」</span>
            を見つけるゲームです。
            <br />
            新しい発見や楽しい会話を通して、 もっと仲良くなりましょう！
          </p>
        </div>

        {/* Features */}

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          <div className="rounded-2xl bg-sky-50 p-6 shadow hover:scale-105 transition">
            <div className="text-4xl mb-3">💬</div>

            <h2 className="font-bold text-xl mb-2">楽しく話そう</h2>

            <p className="text-slate-600">
              お互いのことをもっと知るきっかけになります。
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-6 shadow hover:scale-105 transition">
            <div className="text-4xl mb-3">🌸</div>

            <h2 className="font-bold text-xl mb-2">共通点を発見</h2>

            <p className="text-slate-600">
              意外な共通点が見つかるかもしれません。
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-6 shadow hover:scale-105 transition">
            <div className="text-4xl mb-3">🤗</div>

            <h2 className="font-bold text-xl mb-2">仲良くなる</h2>

            <p className="text-slate-600">
              みんなで楽しい時間を過ごしましょう！
            </p>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex flex-col md:flex-row justify-center gap-5 mt-14">
          <button
            type="button"
            onClick={onStart}
            className="rounded-full bg-sky-500 px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-sky-600 hover:scale-105 transition duration-300"
          >
            🎮 ゲームを始める
          </button>

          <button
            type="button"
            onClick={onShowHowToPlay}
            className="rounded-full bg-white border-2 border-sky-500 px-10 py-4 text-lg font-bold text-sky-600 hover:bg-sky-50 hover:scale-105 transition duration-300"
          >
            📖 遊び方を見る
          </button>
        </div>

        {/* Footer */}

        <div className="mt-14 text-center">
          <p className="text-slate-500">
            💙 Let's discover what makes your friendship special. 💙
          </p>
        </div>
      </div>
    </main>
  );
}
