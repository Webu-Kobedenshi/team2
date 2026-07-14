import { Navigate } from "react-router-dom";

import { ButtonLink, TextLink } from "../components/links";
import { MobilePageShell } from "../components/MobilePageShell";
import { PageHeader } from "../components/PageHeader";
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
        <PageHeader
          label="STEP 3"
          title="結果を見る"
          description="ここに共通点や、会話が盛り上がりそうな話題を表示します。"
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">仮の結果</p>
          <p className="mt-2 text-xl font-bold text-slate-900">
            {gameSession.playerCount}
            人分の回答をもとに、共通点を表示します。
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            参加人数: {gameSession.playerCount}人
          </p>
        </div>

        <div className="grid gap-3">
          <ButtonLink to={paths.players} onClick={clearGameSession}>
            もう一度遊ぶ
          </ButtonLink>
          <TextLink to={paths.home} onClick={clearGameSession}>
            ホームへ戻る
          </TextLink>
        </div>
      </div>
    </MobilePageShell>
  );
}
