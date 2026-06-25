import React from "react";
import { StartCard } from "../components/StartCard";

type Props = {
  onBack: () => void;
};

export const SelectMembers: React.FC<Props> = ({ onBack }) => {
  return (
    <StartCard
      footer={
        <button
          type="button"
          onClick={onBack}
          className="w-full max-w-[240px] text-lg font-bold text-sky-700 bg-sky-100 hover:bg-sky-200 py-3.5 rounded-full shadow-sm transition-colors duration-200 active:scale-98 cursor-pointer text-center"
        >
          もどる
        </button>
      }
    >
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm w-full max-w-[320px] flex flex-col items-center justify-center text-center">
        <h2 className="text-lg font-bold text-sky-800 mb-3">メンバー選択</h2>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed px-2">
          ここから参加人数を選びます。
        </p>
      </div>
    </StartCard>
  );
};

export default SelectMembers;
