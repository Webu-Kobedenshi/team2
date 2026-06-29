export function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6">
      <h1 className="mb-4 text-5xl font-bold">FriendLink</h1>

      <p className="mb-8 text-xl text-slate-600">
        あなたと共通点の多い人を見つけます。
      </p>

      <p className="mb-8 text-center text-slate-600">
        いくつかの質問に答えるだけで、
        <br />
        あなたと共通点の多い人を見つけます。
      </p>
      {/* TODO: 具体的な所要時間については後々計測し、適切な時間を記載する */}
      <div className="mb-8 text-sm text-slate-500">⏱ 所要時間：約3分</div>

      <button
        type="button"
        className="rounded-xl bg-slate-900 px-8 py-4 font-bold text-white transition hover:scale-105"
      >
        はじめる
      </button>
      <button
        type="button"
        className="mt-4 text-sm text-slate-600 underline hover:text-slate-900"
      >
        遊び方を見る
      </button>
    </main>
  );
}
