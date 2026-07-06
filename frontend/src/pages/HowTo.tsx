import { Link } from "react-router-dom";

import { MobilePageShell } from "../components/MobilePageShell";
import { paths } from "../routes";

export function HowTo() {
  return (
    <MobilePageShell>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <p className="text-sm font-bold text-blue-600">GUIDE</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            遊び方
          </h1>
          <p className="leading-7 text-slate-600">
            画像や詳しい説明を置くための仮ページです。ホームからの導線確認にも使います。
          </p>
        </div>

        <ol className="grid gap-3">
          <li className="rounded-2xl bg-white p-4 font-bold shadow-sm">
            1. 遊ぶ人数を選びます。
          </li>
          <li className="rounded-2xl bg-white p-4 font-bold shadow-sm">
            2. 一人ずつ質問に答えます。
          </li>
          <li className="rounded-2xl bg-white p-4 font-bold shadow-sm">
            3. 結果を見て会話します。
          </li>
        </ol>

        <div className="grid gap-3">
          <Link
            to={paths.players}
            className="rounded-2xl bg-slate-950 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-slate-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            人数を選んではじめる
          </Link>
          <Link
            to={paths.home}
            className="text-center text-sm font-bold text-slate-500 transition hover:text-slate-700"
          >
            ホームへ戻る
          </Link>
        </div>
      </div>
    </MobilePageShell>
  );
}
