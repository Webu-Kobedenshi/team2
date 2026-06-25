export function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6">
      <h1 className="mb-4 text-5xl font-bold">FriendLink</h1>

      <p className="mb-8 text-xl text-slate-600">
        あなたと誰かをつなぐ
      </p>

      <p className="mb-8 text-center text-slate-600">
        いくつかの質問に答えるだけで、
        <br />
        あなたと共通点の多い人を見つけます。
      </p>

      <div className="mb-8 text-sm text-slate-500">
        ⏱ 所要時間：約3分
      </div>

      <button
        type="button"
        className="rounded-xl bg-slate-900 px-8 py-4 font-bold text-white transition hover:scale-105"
      >
        はじめる
      </button>
    </main>
  );
}