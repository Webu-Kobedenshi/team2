import React from "react";

type Props = {
  onBack: () => void;
};

export const SelectMembers: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-sky-100">
      <div className="flex flex-col items-center gap-6">
        <p>メンバー選択</p>
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg bg-slate-950 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800"
        >
          もどる
        </button>
      </div>
    </div>
  );
};

export default SelectMembers;
