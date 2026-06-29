import { useState } from "react";

export function Home() {
  const [page, setPage] = useState(1);

  return (
    // 全局背景使用深苔绿 (#1E2923)，主文字使用高质感的羊脂玉白 (#F4F3EF)
    <main className="min-h-screen bg-[#1E2923] text-[#F4F3EF] flex items-center justify-center font-sans antialiased">
      
      {/* Page1 */}
      {page === 1 && (
        <div className="flex flex-col items-center gap-8">
          {/* START 按钮：边框使用复古香槟金 (#EAD2A8)，Hover 时全色块填满，文字反黑 */}
          <button
            onClick={() => setPage(2)}
            className="rounded-full border-2 border-[#EAD2A8] text-[#EAD2A8] px-16 py-4 text-2xl font-bold tracking-widest transition-all duration-300 hover:bg-[#EAD2A8] hover:text-[#1E2923] hover:scale-[1.03] active:scale-[0.98]"
          >
            START
          </button>

          {/* 说明框：背景使用稍亮的薄暮绿层叠，边框用香槟金的低透明度 */}
          <div className="rounded-2xl border border-[#EAD2A8]/20 bg-[#2A3A31]/60 backdrop-blur-md p-6 text-center text-sm text-[#F4F3EF]/80 max-w-sm shadow-xl">
            <h3 className="mb-3 font-bold uppercase tracking-wider text-[#EAD2A8]">遊び方説明</h3>
            <div className="space-y-1.5 tracking-wide">
              <p>①人数を選ぶ</p>
              <p>② 質問に答える</p>
              <p>③ みんなの共通点を探す</p>
              <p>④ 会話のきっかけを見つける</p>
            </div>
          </div>
        </div>
      )}

      {/* Page2 */}
      {page === 2 && (
        <div className="flex flex-col items-center">
          {/* 辅助标签：使用低饱和度的陶土红 (#C87A65) 作为打破绿色的神来之笔 */}
          <p className="mb-3 text-xs uppercase tracking-widest font-black text-[#C87A65]">
            Players
          </p>

          <h2 className="mb-10 text-2xl font-bold tracking-tight">
            参加人数を選んでください
          </h2>

          {/* 选人框：极致圆润 (rounded-full)。默认是薄暮绿卡片，Hover 时绽放出温暖的香槟金 */}
          <div className="flex gap-6">
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setPage(3)}
                className="h-20 w-20 rounded-full border-2 border-[#EAD2A8]/40 bg-[#2A3A31] text-2xl font-bold text-[#EAD2A8]/80 transition-all duration-300 hover:bg-[#EAD2A8] hover:border-[#EAD2A8] hover:text-[#1E2923] hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Page3 */}
      {page === 3 && (
        <div className="flex flex-col items-center">
          <p className="mb-3 text-xs uppercase tracking-widest font-black text-[#C87A65]">
            Question 1 / 5
          </p>

          <h2 className="mb-10 max-w-xl text-center text-2xl font-bold tracking-tight">
            日本で一番高い山はどれですか？
          </h2>

          {/* 答题卡选项：隐约的薄暮绿背景，Hover 时带有一层香槟金的微弱光晕 */}
          <div className="flex w-96 flex-col gap-3.5">
            <button className="rounded-xl border border-[#EAD2A8]/20 bg-[#2A3A31]/50 p-4 text-left font-medium transition-all duration-200 hover:bg-[#2A3A31] hover:border-[#EAD2A8] hover:shadow-[0_0_15px_rgba(234,210,168,0.15)]">
              A. 富士山
            </button>

            <button className="rounded-xl border border-[#EAD2A8]/20 bg-[#2A3A31]/50 p-4 text-left font-medium transition-all duration-200 hover:bg-[#2A3A31] hover:border-[#EAD2A8] hover:shadow-[0_0_15px_rgba(234,210,168,0.15)]">
              B. 槍ヶ岳
            </button>

            <button className="rounded-xl border border-[#EAD2A8]/20 bg-[#2A3A31]/50 p-4 text-left font-medium transition-all duration-200 hover:bg-[#2A3A31] hover:border-[#EAD2A8] hover:shadow-[0_0_15px_rgba(234,210,168,0.15)]">
              C. 北岳
            </button>

            <button className="rounded-xl border border-[#EAD2A8]/20 bg-[#2A3A31]/50 p-4 text-left font-medium transition-all duration-200 hover:bg-[#2A3A31] hover:border-[#EAD2A8] hover:shadow-[0_0_15px_rgba(234,210,168,0.15)]">
              D. 奥穂高岳
            </button>
          </div>
        </div>
      )}
    </main>
  );
}