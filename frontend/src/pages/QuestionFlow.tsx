import { Link, Navigate, useSearchParams } from "react-router-dom";

import { MobilePageShell } from "../components/MobilePageShell";
import { QuestionCard } from "../components/QuestionCard";
import { paths } from "../routes";

const validPlayerCounts = [2, 3, 4];

export function QuestionFlow() {
  const [searchParams] = useSearchParams();
  const playerCount = Number(searchParams.get("players"));

  if (!validPlayerCounts.includes(playerCount)) {
    return <Navigate to={paths.players} replace />;
  }

  return (
    <MobilePageShell>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <p className="text-sm font-bold text-blue-600">STEP 2</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            質問に答える
          </h1>
          <p className="leading-7 text-slate-600">
            ここに質問文、回答選択肢、次の人へ渡す案内を実装します。
          </p>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-bold text-blue-600">
            {playerCount}人で遊びます
          </p>
          <p className="mt-2 text-xl font-black text-slate-900">
            1人目に端末を渡してください
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            回答フローでは、この人数を使って参加者ごとに質問を回します。
          </p>
        </div>

        <QuestionCard question="休日にするならどれが好きですか？" />

        <div className="grid gap-3">
          <Link
            to={paths.result}
            className="rounded-2xl bg-slate-950 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-slate-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            結果を見る
          </Link>
          <Link
            to={paths.players}
            className="text-center text-sm font-bold text-slate-500 transition hover:text-slate-700"
          >
            人数選択へ戻る
          </Link>
        </div>
      </div>
    </MobilePageShell>
  );
}
