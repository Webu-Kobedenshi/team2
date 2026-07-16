import { Info } from "lucide-react";

import { Button } from "./buttons";
import { PageHeader } from "./PageHeader";

type QuestionIntroProps = {
  playerCount: number;
  currentPlayerNumber: number;
  hasPreviousPlayer: boolean;
  onStart: () => void;
  onReturnToPlayerSelect: () => void;
};

export function QuestionIntro({
  playerCount,
  currentPlayerNumber,
  hasPreviousPlayer,
  onStart,
  onReturnToPlayerSelect,
}: QuestionIntroProps) {
  return (
    <div className="grid gap-6">
      <PageHeader
        label="STEP 2"
        title={hasPreviousPlayer ? "次の人にまわそう" : "質問に答えよう"}
        description={
          hasPreviousPlayer
            ? "これから答える人と交代して、下のお願いを読んでから回答をはじめてね！"
            : "下のお願いを読んでから、回答をはじめてね！"
        }
      />

      <div className="grid gap-6">
        <div className="grid gap-2">
          <p className="justify-self-end pr-5 text-sm font-bold text-slate-500">
            全{playerCount}人中{" "}
            <span className="font-black text-slate-700">
              {currentPlayerNumber}人目
            </span>
          </p>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="relative mx-auto w-fit translate-x-1 text-center text-lg font-black text-slate-900">
              <Info
                aria-hidden="true"
                className="absolute top-1/2 right-full mr-1 h-5 w-5 -translate-y-1/2 text-sky-500"
              />
              お願い
            </p>
            <ul className="mt-3 grid gap-2 text-sm font-bold leading-6 text-slate-700">
              <li className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400"
                />
                <span>答えているあいだは、画面をほかの人に見せないでね</span>
              </li>
              <li className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400"
                />
                <span>自分にいちばん近い答えを、選択肢の中から選んでね</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-3">
          <Button onClick={onStart}>回答をはじめる</Button>

          <button
            type="button"
            onClick={onReturnToPlayerSelect}
            className="rounded-md text-center text-sm font-bold text-slate-500 transition hover:text-slate-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
          >
            人数選択へ戻る
          </button>
        </div>
      </div>
    </div>
  );
}
