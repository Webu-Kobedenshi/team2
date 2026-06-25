// 丸と三角で構成された人型ピクトグラムアイコン
function PersonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 inline-block"
      fill="currentColor"
      style={{ verticalAlign: 'middle' }}
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
    <main
      className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8 text-center"
      style={{ backgroundColor: '#FFF8F5', fontFamily: '"Noto Sans JP", sans-serif' }}
    >
      {/* Google Fonts のインポート */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Zen+Maru+Gothic:wght@500;700;900&display=swap');
      `}</style>

      <div className="grid gap-8">
        <section className="grid gap-6 justify-items-center">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              backgroundColor: '#FFF1F5',
              padding: '18px 24px',
              border: '1px solid #F4A7B9',
              width: '100%',
            }}
          >
            <h1
              style={{
                fontSize: '26px',
                fontWeight: '900',
                letterSpacing: '0.05em',
                color: '#D97A93',
                margin: 0,
                fontFamily: '"Zen Maru Gothic", sans-serif',
              }}
            >
              共通点ファインダー
            </h1>
          </div>
          <h2 className="text-3xl font-extrabold leading-tight" style={{ color: '#7A6A70' }}>
            話を盛り上げる<br />
            <span style={{ color: '#D97A93' }}>共通点</span>を探そう
          </h2>
        </section>

        {/* 3つのステップをまとめる親ブロック */}
        <div
          className="w-full rounded-3xl border p-6 shadow-sm grid gap-3"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(244, 167, 185, 0.4)' }}
        >
          {/* 左上のあそびかたラベル */}
          <div className="text-left pl-0.5 pb-0">
            <span className="text-sm font-black tracking-wider" style={{ color: '#D97A93' }}>あそびかた</span>
          </div>

          {/* ステップ1 */}
          <div
            className="rounded-xl border py-8 px-5 shadow-sm flex items-center justify-center gap-8"
            style={{ backgroundColor: '#FFF1F5', borderColor: '#F4A7B9' }}
          >
            <div>
              <span className="text-base font-bold" style={{ color: '#7A6A70' }}>
                {"  "}遊ぶ人数を選んで
              </span>
            </div>
            {/* 右側: 〜 と人型の縦列配置。人型自体は横列。 */}
            <div className="flex flex-col items-center gap-0.5" style={{ color: '#D97A93' }}>
              <div className="flex items-center gap-0.5">
                <PersonIcon />
                <PersonIcon />
              </div>
              <span className="text-sm font-bold leading-none" style={{ color: '#7A6A70' }}>〜</span>
              <div className="flex items-center gap-0.5">
                <PersonIcon />
                <PersonIcon />
                <PersonIcon />
                <PersonIcon />
              </div>
            </div>
          </div>

          {/* 導線矢印 1 -> 2 */}
          <div className="flex justify-center" style={{ color: '#D97A93' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {/* ステップ2 */}
          <div
            className="rounded-xl border py-8 px-5 shadow-sm flex items-center justify-center gap-8"
            style={{ backgroundColor: '#FFF1F5', borderColor: '#F4A7B9' }}
          >
            <div className="-ml-4">
              <span className="text-base font-bold" style={{ color: '#7A6A70' }}>
                質問に答えて{"  "}
              </span>
            </div>
            {/* 右側: 4つの空の横長長方形ミニブロックを中央寄りの縦列配置 */}
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-10 h-3 rounded-sm border"
                style={{ backgroundColor: '#FFF1F5', borderColor: '#F4A7B9' }}
              />
              <div
                className="w-10 h-3 rounded-sm border shadow-sm"
                style={{ backgroundColor: '#D97A93', borderColor: '#D97A93' }}
              />
              <div
                className="w-10 h-3 rounded-sm border"
                style={{ backgroundColor: '#FFF1F5', borderColor: '#F4A7B9' }}
              />
              <div
                className="w-10 h-3 rounded-sm border"
                style={{ backgroundColor: '#FFF1F5', borderColor: '#F4A7B9' }}
              />
            </div>
          </div>

          {/* 導線矢印 2 -> 3 */}
          <div className="flex justify-center" style={{ color: '#D97A93' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {/* ステップ3 */}
          <div
            className="rounded-xl border p-5 shadow-sm text-center"
            style={{ backgroundColor: '#FFF1F5', borderColor: '#F4A7B9' }}
          >
            <span className="text-base font-bold" style={{ color: '#7A6A70' }}>共通点を見つけよう！</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <button
            type="button"
            className="w-full rounded-xl px-6 py-4 text-base font-bold text-white transition focus-visible:outline-3 focus-visible:outline-offset-2"
            style={{ backgroundColor: '#D97A93' }}
          >
            人数を選んではじめる{" "}→
          </button>
        </div>
      </div>
    </main>
  );
}
