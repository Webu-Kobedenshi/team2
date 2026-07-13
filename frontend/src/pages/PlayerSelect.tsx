import { Link } from "react-router-dom";

import { MobilePageShell } from "../components/MobilePageShell";
import { createGameSession, saveGameSession } from "../features/gameSession";
import { paths } from "../routes";

const playerCounts = [2, 3, 4];

export function PlayerSelect() {
  return (
    <MobilePageShell>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <p className="text-sm font-bold text-blue-600">STEP 1</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            遊ぶ人数を選ぶ
          </h1>
          <p className="leading-7 text-slate-600">
            一緒に遊ぶ人数を選んでください。実装担当者はこの画面内を中心に調整できます。
          </p>
        </div>

        <div className="grid gap-3">
          {playerCounts.map((count) => (
            <Link
              key={count}
              to={paths.questions}
              onClick={() => saveGameSession(createGameSession(count))}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center text-lg font-bold shadow-sm transition hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
            >
              {count}人で遊ぶ
            </Link>
          ))}
        </div>

        <Link
          to={paths.home}
          className="text-center text-sm font-bold text-slate-500 transition hover:text-slate-700"
        >
          ホームへ戻る
        </Link>
      </div>
    </MobilePageShell>
  );
}
