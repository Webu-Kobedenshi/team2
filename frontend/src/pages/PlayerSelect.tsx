import { useState } from "react"; // useState を追加
import { Link, useNavigate } from "react-router-dom";

import { MobilePageShell } from "../components/MobilePageShell";
import { createGameSession, saveGameSession } from "../features/gameSession";
import { paths } from "../routes";

const playerCounts = [2, 3, 4];

export function PlayerSelect() {
  // 現在選択されている人数を管理する（初期値は未選択: null）
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const navigate = useNavigate();

  // 決定ボタンを押した時の処理
  const handleConfirm = () => {
    if (selectedCount === null) return;
    // 選択された人数でセッションを保存
    saveGameSession(createGameSession(selectedCount));
    // 次の画面（質問画面）へ遷移
    navigate(`${paths.questions}?players=${selectedCount}`);
  };

  return (
    <MobilePageShell>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <p className="text-sm font-bold text-sky-500">STEP 1</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            遊ぶ人数を選ぶ
          </h1>
          <p className="leading-7 text-slate-600">
            一緒に遊ぶ人数を選んで 決定 を押してください。
          </p>
        </div>

        {/* 人数選択ボタン */}
        <div className="grid gap-3">
          {playerCounts.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setSelectedCount(count)}
              className={`rounded-2xl border px-5 py-4 text-center text-lg font-bold transition-all ${
                selectedCount === count
                  ? "border-sky-400 bg-sky-400 text-white shadow-md scale-105"
                  : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50"
              }`}
            >
              {count}人
            </button>
          ))}
        </div>

        {/* 人数ボタンのすぐ下に配置される決定ボタン */}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={selectedCount === null}
          className={`w-full rounded-2xl py-4 text-center text-lg font-bold transition-all duration-200 ${
            selectedCount === null
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-sky-400 text-white shadow-md shadow-sky-400/10 hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/20 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-200 active:translate-y-0.5 active:scale-[0.98]"
          }`}
        >
          決定
        </button>

        <Link
          to={paths.home}
          className="text-center text-sm font-bold text-slate-500 transition hover:text-slate-700"
        >
          ホームへ戻る
        </Link>
      </div>
    </MobilePageShell>
  );
}
