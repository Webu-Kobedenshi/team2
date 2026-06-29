import React from "react";
import { StartCard } from "../components/StartCard";

type Props = {
  onStart: () => void;
};

export const Home: React.FC<Props> = ({ onStart }) => {
  return (
    <StartCard
      footer={
        <button
          type="button"
          onClick={onStart}
          className="w-full max-w-[240px] text-lg font-bold text-white bg-emerald-500 hover:bg-emerald-600 py-3.5 rounded-full shadow-sm transition-colors duration-200 active:scale-98 cursor-pointer"
        >
          はじめる
        </button>
      }
    >
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm w-full max-w-[320px] flex flex-col justify-center">
        <h2 className="text-lg font-bold text-sky-800 border-b border-slate-100 pb-2 mb-4 text-center">
          遊び方
        </h2>
        <ol className="text-slate-600 text-sm space-y-3.5 font-bold list-none pl-0">
          <li className="flex items-center gap-3">
           <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs">
              1
            </span>
            <span>「はじめる」ボタンを押す</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs">
              2
            </span>
            <span>一緒に遊ぶ人数を選ぶ</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs">
              3
            </span>
            <span>1人ずつ質問に答えていく</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs">
              4
            </span>
            <span>全員の回答が終わると…</span>
          </li>
          <li className="flex items-center justify-center text-emerald-800 font-black bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-200/50 mt-1 text-center">
            <span>みんなの共通点が見つかるよ！</span>
          </li>
        </ol>
      </div>
    </StartCard>
  );
};

export default Home;
