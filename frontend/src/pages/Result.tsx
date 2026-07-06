import { Link, Navigate } from "react-router-dom";

import { MobilePageShell } from "../components/MobilePageShell";
import { clearGameSession, loadGameSession } from "../features/gameSession";
import { paths } from "../routes";

export function Result() {
  const gameSession = loadGameSession();

  if (!gameSession) {
    return <Navigate to={paths.players} replace />;
  }

  return (
    <MobilePageShell>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <p className="text-sm font-bold text-blue-600">STEP 3</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            結果を見る
          </h1>
          <p className="leading-7 text-slate-600">
            ここに共通点や、会話が盛り上がりそうな話題を表示します。
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">仮の結果</p>
          <p className="mt-2 text-xl font-bold text-slate-900">
            {gameSession.playerCount}
            人分の回答をもとに、共通点を表示します。
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            現在保存されている回答数: {gameSession.answers.length}人分
          </p>
        </div>

        <div className="grid gap-3">
          <Link
            to={paths.players}
            onClick={clearGameSession}
            className="rounded-2xl bg-slate-950 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-slate-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            もう一度遊ぶ
          </Link>
          <Link
            to={paths.home}
            onClick={clearGameSession}
            className="text-center text-sm font-bold text-slate-500 transition hover:text-slate-700"
          >
            ホームへ戻る
          </Link>
        </div>
      </div>
    </MobilePageShell>
  );
}
