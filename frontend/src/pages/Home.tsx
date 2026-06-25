export function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12 sm:px-8">
      <div className="grid gap-8">
        <section className="grid gap-4">
          <p className="text-sm font-bold text-blue-600">共通点ファインダー</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-6xl">
            みんなで話せる共通点を見つけよう
          </h1>
          <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
            いくつかの質問に答えて、同じ回答や話しやすそうな話題を見つけます。
          </p>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="rounded-lg bg-slate-950 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            はじめる
          </button>
          <p className="text-sm text-slate-500">
            次の画面で参加人数を選択します。
          </p>
        </div>
      </div>
    </main>
  );
}
