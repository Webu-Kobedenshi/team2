type HomeProps = {
  onShowHowToPlay: () => void;
};

export function Home({ onShowHowToPlay }: HomeProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12 sm:px-8">
      <div className="grid gap-8">
        <section className="grid gap-4">
          <p className="text-sm font-bold text-blue-600">
            共通点ファインダー
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-6xl">
            みんなで共通点を見つけよう！
          </h1>

          <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
            質問に答えながら参加者同士の共通点を探すゲームです。
            新しい話題や意外な発見を楽しみましょう。
          </p>
        </section>

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">遊び方</h2>

          <ol className="list-decimal pl-5 space-y-2 text-slate-700">
            <li>スタートボタンを押します。</li>
            <li>質問に答えます。</li>
            <li>他の参加者との共通点を確認します。</li>
            <li>見つけた共通点について話してみましょう。</li>
          </ol>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="rounded-lg bg-slate-950 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800"
          >
            スタート
          </button>

          <button
  type="button"
  onClick={onShowHowToPlay}
  className="rounded-lg bg-slate-950 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800"
>
  遊び方を見る
</button>

          <p className="text-sm text-slate-500">
            ボタンを押してゲームを開始します。
          </p>
        </div>
      </div>
    </main>
  );
}