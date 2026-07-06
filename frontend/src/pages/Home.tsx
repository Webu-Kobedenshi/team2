import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, UsersRound } from "lucide-react";

import { MobilePageShell } from "../components/MobilePageShell";
import { paths } from "../routes";

const howToSteps = [
  {
    title: "人数を選ぶ",
    desc: "2〜4人の中から、一緒に遊ぶ人数を選びます。",
  },
  {
    title: "一人ずつ質問に答える",
    desc: "1台のスマホを順番に回して回答します。",
  },
  {
    title: "結果を見て話す",
    desc: "みんなの共通点や、盛り上がる話題が表示されます。",
  },
];

export function Home() {
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
            簡単な質問から、みんなで盛り上がれる話題を見つけます。
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="flex items-center justify-center gap-2 text-lg font-bold text-slate-800">
          <BookOpen aria-hidden="true" className="h-5 w-5 text-sky-500" />
          遊び方
        </h2>
        <ol className="relative mt-5 grid gap-4">
          {howToSteps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3"
            >
              {index < howToSteps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute left-[30px] top-[24px] bottom-[-28px] z-10 w-0.5 border-l border-solid border-slate-200"
                />
              )}
              <span className="relative z-20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-sm font-black text-sky-700">
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
            <span>詳しい遊び方を画像で見る</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-3">
        <Link
          to={paths.players}
          className="w-full rounded-2xl bg-sky-400 px-6 py-4 text-center text-base font-black text-white shadow-md shadow-sky-400/10 transition-all duration-200 hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/20 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-200 active:translate-y-0.5 active:scale-[0.98]"
        >
          はじめる
        </Link>
      </div>
    </MobilePageShell>
  );
}
