import { Navigate } from "react-router-dom";

import { ButtonLink } from "../components/links";
import { MobilePageShell } from "../components/MobilePageShell";
import { PageHeader } from "../components/PageHeader";
import {
  isGameSessionComplete,
  loadGameSession,
} from "../features/gameSession";
import { paths } from "../routes";

export function Result() {
  const gameSession = loadGameSession();

  if (!gameSession) {
    return <Navigate to={paths.players} replace />;
  }

  if (!isGameSessionComplete(gameSession)) {
    return <Navigate to={paths.questions} replace />;
  }

  return (
    <MobilePageShell>
      <div className="grid gap-6">
        <PageHeader
          label="STEP 3"
          title="回答が集まりました"
          description={
            <>
              <span className="block">
                みんなの回答をもとに結果を表示します
              </span>
              <span className="block">準備ができたら結果を見てみよう！</span>
            </>
          }
        />

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-center text-lg font-bold text-slate-800">
            結果で見られること
          </h2>
          <ul className="mt-4 grid gap-3 text-sm font-bold text-slate-700">
            <li className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-sky-400"
              />
              質問ごとのみんなの回答
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-sky-400"
              />
              会話のきっかけ
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-sky-400"
              />
              みんなの共通点まとめ
            </li>
          </ul>
        </div>

        <ButtonLink to={paths.questionResults}>結果を見る</ButtonLink>
      </div>
    </MobilePageShell>
  );
}
