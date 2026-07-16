import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, UsersRound } from "lucide-react";

import { ButtonLink } from "../components/links";
import { MobilePageShell } from "../components/MobilePageShell";
import { createResultDebugSession } from "../features/debugGameSessions";
import { saveGameSession, type GameSession } from "../features/gameSession";
import { clearResultViewSession } from "../features/resultViewSession";
import { paths } from "../routes";

const howToSteps = [
  {
    title: "人数を選ぶ",
    desc: "2〜4人の中から、一緒に遊ぶ人数を選ぼう",
  },
  {
    title: "質問に答える",
    desc: "みんなで順番に質問に答えよう",
  },
  {
    title: "結果を見て話す",
    desc: "みんなの共通点や、盛り上がる話題が表示されるよ",
  },
];

export function Home() {
  const navigate = useNavigate();

  function openResultDebug(session: GameSession) {
    clearResultViewSession();
    saveGameSession(session);
    navigate(paths.result);
  }

  return (
    <MobilePageShell>
      <div className="grid gap-4">
        <p className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
          <UsersRound aria-hidden="true" className="h-4 w-4" />
          2〜4人・1台で遊べる
        </p>
        <div className="grid gap-3">
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            共通点
            <br />
            ファインダー
          </h1>
          <p className="text-base leading-8 text-slate-700">
            簡単な質問から、みんなで盛り上がれる話題を見つけます！
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="relative mx-auto w-fit translate-x-1 text-center text-lg font-bold text-slate-800">
          <BookOpen
            aria-hidden="true"
            className="absolute top-1/2 right-full mr-1 h-5 w-5 -translate-y-1/2 text-sky-500"
          />
          遊び方
        </h2>
        <ol className="relative mt-5 grid gap-4">
          {howToSteps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex min-h-24 items-center gap-3 rounded-2xl bg-white px-3.5 py-3"
            >
              <span className="relative z-20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-base font-black text-sky-700">
                {index + 1}
              </span>
              <div className="relative z-20 flex flex-col">
                <span className="font-bold leading-normal text-slate-800">
                  {step.title}
                </span>
                <span className="mt-0.5 text-xs leading-relaxed text-slate-500">
                  {step.desc}
                </span>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex justify-center border-t border-slate-100 pt-3">
          <Link
            to={paths.howTo}
            className="flex items-center gap-1 text-sm font-bold text-sky-500 transition hover:text-sky-600 active:scale-[0.98]"
          >
            <span>詳しい遊び方を見る</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-3">
        <ButtonLink to={paths.players}>はじめる</ButtonLink>

        {import.meta.env.DEV && (
          <div className="grid gap-3 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-4">
            <div>
              <p className="text-xs font-black tracking-wider text-amber-700">
                開発用ショートカット
              </p>
              <p className="mt-1 text-xs leading-5 text-amber-800">
                4人分の回答済みデータで各表示パターンを確認できます。
              </p>
            </div>

            <button
              type="button"
              onClick={() => openResultDebug(createResultDebugSession())}
              className="rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm font-bold text-amber-900 transition hover:bg-amber-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
            >
              結果を確認
            </button>
          </div>
        )}
      </div>
    </MobilePageShell>
  );
}
