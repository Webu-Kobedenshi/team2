const howToSteps = [
  {
    title: "人数を選ぶ",
    desc: "2〜4人の中から、一緒に遊ぶ人数を選びます。",
  },
  {
    title: "一人ずつ質問に答える",
    desc: "1台のスマホを順番に回して回答します。",
  },
  {
    title: "結果を見て話す",
    desc: "みんなの共通点や、盛り上がる話題が表示されます。",
  },
];

const backgroundCircles = [
  "-right-10 -top-10 h-28 w-28 bg-sky-50",
  "-bottom-12 -left-10 h-32 w-32 bg-emerald-50",
  "-right-14 top-[52%] h-36 w-36 bg-violet-50",
  "left-8 bottom-28 h-28 w-28 bg-sky-50",
];

export function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-5 py-8 text-slate-900 sm:px-8">
      {backgroundCircles.map((circle) => (
        <div
          key={circle}
          aria-hidden="true"
          className={`absolute rounded-full ${circle}`}
        />
      ))}
      <section
        aria-labelledby="home-title"
        className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-md flex-col justify-center gap-8 sm:max-w-lg"
      >
        <div className="grid gap-4">
          <p className="w-fit flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
            <span>👥</span> 2〜4人・1台で遊べる
          </p>
          <div className="grid gap-3">
            <h1
              id="home-title"
              className="text-4xl font-black leading-tight tracking-tight sm:text-5xl"
            >
              共通点
              <br />
              ファインダー
            </h1>
            <p className="text-base leading-8 text-slate-700">
              簡単な質問から、みんなで盛り上がれる話題を見つけます。
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-center text-lg font-bold text-slate-800">
            📖 遊び方
          </h2>
          <ol className="relative mt-5 grid gap-4">
            {howToSteps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3"
              >
                {index < howToSteps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[30px] top-[24px] bottom-[-28px] z-10 w-0.5 border-l border-solid border-slate-200"
                  />
                )}
                <span className="relative z-20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 border border-sky-200 text-sm font-black text-sky-700">
                  {index + 1}
                </span>
                <div className="relative z-20 flex flex-col">
                  <span className="font-bold text-slate-800 leading-normal">
                    {step.title}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {step.desc}
                  </span>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-5 pt-3 border-t border-slate-100 flex justify-center">
            <button
              type="button"
              className="text-sm font-bold text-sky-500 hover:text-sky-600 flex items-center gap-1 transition active:scale-[0.98]"
            >
              <span>詳しい遊び方を画像で見る</span>
              <span>➔</span>
            </button>
          </div>
        </div>

        <div className="grid gap-3">
          <button
            type="button"
            className="w-full rounded-2xl bg-sky-400 px-6 py-4 text-base font-black text-white shadow-md shadow-sky-400/10 hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/20 active:scale-[0.98] active:translate-y-0.5 transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
          >
            はじめる
          </button>
        </div>
      </section>
    </main>
  );
}
