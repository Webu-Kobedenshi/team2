import { Navigate, useSearchParams } from "react-router-dom";

import { ButtonLink, TextLink } from "../components/links";
import { MobilePageShell } from "../components/MobilePageShell";
import { PageHeader } from "../components/PageHeader";
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
        <PageHeader
          label="STEP 2"
          title="質問に答える"
          description="ここに質問文、回答選択肢、次の人へ渡す案内を実装します。"
        />

        <div className="rounded-3xl border border-sky-100 bg-sky-50 p-5">
          <p className="text-sm font-bold text-sky-600">
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
          <ButtonLink to={paths.result}>結果を見る</ButtonLink>
          <TextLink to={paths.players}>人数選択へ戻る</TextLink>
        </div>
      </div>
    </MobilePageShell>
  );
}
