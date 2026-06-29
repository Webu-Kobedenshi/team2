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
        <ol className="steps-list text-slate-600 text-sm space-y-3.5 font-bold list-none pl-0">
          <li>
            <span>「はじめる」ボタンを押す</span>
          </li>
          <li>
            <span>一緒に遊ぶ人数を選ぶ</span>
          </li>
          <li>
            <span>1人ずつ質問に答えていく</span>
          </li>
          <li>
            <span>全員の回答が終わると…</span>
          </li>
        </ol>
        <p className="flex items-center justify-center text-emerald-800 font-black bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-200/50 mt-3 text-center text-sm">
          みんなの共通点が見つかるよ！
        </p>
      </div>
    </StartCard>
  );
};

export default Home;
