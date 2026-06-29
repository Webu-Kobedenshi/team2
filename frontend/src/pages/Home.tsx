// 丸と三角で構成された人型ピクトグラムアイコン
function PersonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="inline-block h-5 w-5 align-middle"
      fill="currentColor"
    >
      {/* 頭 (丸) 巨大化: r=3.5 -> 5, 位置調整 */}
      <circle cx="12" cy="5.5" r="5" />
      {/* 体 (三角形) 位置調整 */}
      <polygon points="12,13 5,22 19,22" />
    </svg>
  );
}

export function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center bg-[#FFF8F5] px-4 py-8 text-center font-['Noto_Sans_JP',sans-serif]">
      <div className="grid gap-8">
        <section className="grid gap-6 justify-items-center">
          <div className="flex w-full items-center justify-center rounded-xl border border-[#F4A7B9] bg-[#FFF1F5] px-6 py-[18px]">
            <h1 className="m-0 font-['Zen_Maru_Gothic',sans-serif] text-[26px] font-black tracking-[0.05em] text-[#D97A93]">
              共通点ファインダー
            </h1>
          </div>
          <h2 className="text-3xl font-extrabold leading-tight text-[#7A6A70]">
            会話が続く
            <br />
            <span className="text-[#D97A93]">きっかけ</span>を見つけよう
          </h2>
        </section>

        {/* 3つのステップをまとめる親ブロック */}
        <div className="grid w-full gap-3 rounded-3xl border border-[rgba(244,167,185,0.4)] bg-[rgba(255,255,255,0.5)] p-6 shadow-sm">
          {/* 左上のあそびかたラベル */}
          <div className="text-left pl-0.5 pb-0">
            <span className="text-sm font-black tracking-wider text-[#D97A93]">
              あそびかた
            </span>
          </div>

          {/* ステップ1 */}
          <div className="flex items-center justify-center gap-8 rounded-xl border border-[#F4A7B9] bg-[#FFF1F5] px-5 py-8 shadow-sm">
            <div>
              <span className="text-base font-bold text-[#7A6A70]">
                {"  "}遊ぶ人数を選んで
              </span>
            </div>
            {/* 右側: 〜 と人型の縦列配置。人型自体は横列。 */}
            <div className="flex flex-col items-center gap-0.5 text-[#D97A93]">
              <div className="flex items-center gap-0.5">
                <PersonIcon />
                <PersonIcon />
              </div>
              <span className="text-sm font-bold leading-none text-[#7A6A70]">
                〜
              </span>
              <div className="flex items-center gap-0.5">
                <PersonIcon />
                <PersonIcon />
                <PersonIcon />
                <PersonIcon />
              </div>
            </div>
          </div>

          {/* 導線矢印 1 -> 2 */}
          <div className="flex justify-center text-[#D97A93]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          {/* ステップ2 */}
          <div className="flex items-center justify-center gap-8 rounded-xl border border-[#F4A7B9] bg-[#FFF1F5] px-5 py-8 shadow-sm">
            <div className="-ml-4">
              <span className="text-base font-bold text-[#7A6A70]">
                質問に答えて{"  "}
              </span>
            </div>
            {/* 右側: 4つの空の横長長方形ミニブロックを中央寄りの縦列配置 */}
            <div className="flex flex-col items-center gap-1">
              <div className="h-3 w-10 rounded-sm border border-[#F4A7B9] bg-[#FFF1F5]" />
              <div className="h-3 w-10 rounded-sm border border-[#D97A93] bg-[#D97A93] shadow-sm" />
              <div className="h-3 w-10 rounded-sm border border-[#F4A7B9] bg-[#FFF1F5]" />
              <div className="h-3 w-10 rounded-sm border border-[#F4A7B9] bg-[#FFF1F5]" />
            </div>
          </div>

          {/* 導線矢印 2 -> 3 */}
          <div className="flex justify-center text-[#D97A93]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          {/* ステップ3 */}
          <div className="rounded-xl border border-[#F4A7B9] bg-[#FFF1F5] p-5 text-center shadow-sm">
            <span className="text-base font-bold text-[#7A6A70]">
              話しやすい話題を見つけよう
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <button
            type="button"
            className="w-full rounded-xl bg-[#D97A93] px-6 py-4 text-base font-bold text-white transition focus-visible:outline-3 focus-visible:outline-offset-2"
          >
            人数を選んではじめる →
          </button>
        </div>
      </div>
    </main>
  );
}
