import { Link, Navigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import { MobilePageShell } from "../components/MobilePageShell";
import { clearGameSession, loadGameSession } from "../features/gameSession";
import { paths } from "../routes";

// ==================== 型定義 ====================
interface CommonPoint {
  withPlayerId: string; // 相手のプレイヤーID
  count: number;        // 共通点の個数
  items: string[];      // 共通点の内容
}

interface ProcessedPlayer {
  id: string;
  name: string;
  avatarColor: string;
  commonPoints: CommonPoint[];
}
export function Result() {
  const gameSession = loadGameSession();
  
  // showResult = false: 中間画面 (2秒間表示)
  // showResult = true: 結果画面 (2秒後に自動切り替え)
  const [showResult, setShowResult] = useState(false);

  // 2秒のタイマー演出
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ==================== 質問と回答データの自動比較ロジック ====================
  const { processedPlayers, analysisMap } = useMemo(() => {
    if (!gameSession?.answers) {
  return {
    processedPlayers: [],
    analysisMap: new Map()
  };
}

    // プレイヤーカラー（最大4人想定）
    const colors = [
  "#38bdf8", "#f43f5e","#10b981",  "#f59e0b"
];
const answers = gameSession.answers;
    // 1. 各プレイヤーの情報を整理 (any型を型定義に修正)
   const players: ProcessedPlayer[] =
answers.map((_ans, index) => {
      return {
        id: `p_${index}`,
        name: `プレイヤー ${index + 1}`,
        avatarColor: colors[index % colors.length],
        commonPoints: []
      };
    });

    // 2. 総当たりでプレイヤー同士の回答を比較
    players.forEach((currentPlayer, currentIndex) => {
      const currentRawAnswer =
answers[currentIndex].answers;
      players.forEach((otherPlayer, otherIndex) => {
        if (currentIndex === otherIndex) return; // 自分自身とは比較しない

        const otherRawAnswer =
answers[otherIndex].answers;
        const commonItems: string[] = [];

        Object.keys(currentRawAnswer).forEach((key) => {
          if (currentRawAnswer[key] && currentRawAnswer[key] === otherRawAnswer[key]) {
            commonItems.push(currentRawAnswer[key]);
          }
        });

        currentPlayer.commonPoints.push({
          withPlayerId: otherPlayer.id,
          count: commonItems.length,
          items: commonItems
        });
      });
    });

    // 3. 各プレイヤーの「総共通点数」と「相性抜群の相手」を計算
  const summaryMap = new Map<
  string,
  {
    totalConnections: number;
    mostConnectedName: string;
  }
>();
    players.forEach((player) => {
      const totalConnections = player.commonPoints.reduce((sum, cp) => sum + cp.count, 0);
      
      let maxCount = -1;
      let mostConnectedId = "";
      
      player.commonPoints.forEach((cp) => {
        if (cp.count > maxCount) {
          maxCount = cp.count;
          mostConnectedId = cp.withPlayerId;
        }
      });

      const bestPartner = players.find((p) => p.id === mostConnectedId);

      summaryMap.set(player.id, {
        totalConnections,
        mostConnectedName: bestPartner && maxCount > 0 ? bestPartner.name : "なし",
      });
    });

    return { processedPlayers: players, analysisMap: summaryMap };
  }, [gameSession]);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");

  if (!gameSession) {
    return <Navigate to={paths.players} replace />;
  }

  const selectedPlayer =
  processedPlayers.find((p) => p.id === selectedPlayerId)
  || processedPlayers[0];
  return (
    <MobilePageShell>
      <div className="grid gap-6">
        
        {/* 【1. 中間画面】 */}
        {!showResult && (
          <div className="grid gap-8 py-12 text-center">
            <div className="text-left">
              <p className="text-xs font-bold tracking-wider text-sky-500">FINAL STEP 2</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                回答が集まりました！
              </h1>
              <p className="mt-2 text-base text-slate-600">
                結果を表示します。
              </p>
            </div>

            <div className="flex flex-col items-center justify-center my-6">
              <div className="relative flex h-44 w-44 animate-pulse items-center justify-center rounded-full border-4 border-dashed border-sky-200 bg-sky-50">
                <span className="text-xl font-black tracking-widest text-sky-500">CONFIRM</span>
              </div>
              <p className="mt-4 text-xs tracking-wider text-slate-400">
               {gameSession.answers?.length ?? 0}人分の回答データを分析中...
              </p>
            </div>
          </div>
        )}

        {/* 【2. 結果表示画面】 */}
        {showResult && (
          <div className="grid gap-6">
            <div className="text-left">
              <p className="text-xs font-bold tracking-wider text-sky-500">MATCHING RESULT</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                分析結果
              </h1>
            </div>

            {/* プレイヤー一覧 */}
            <div className="grid gap-3">
              <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                プレイヤーを選択して詳細を表示
              </p>
              {processedPlayers.map((player) => {
                const analysis = analysisMap.get(player.id);
               const isSelected =
  player.id === selectedPlayerId ||
  (!selectedPlayerId &&
    player.id === processedPlayers[0]?.id);
                return (
                  <button
                    key={player.id}
                    onClick={() => setSelectedPlayerId(player.id)}
                    className={`flex items-center justify-between p-4 text-left border rounded-2xl transition shadow-sm ${
                      isSelected
                        ? "bg-white border-sky-500 ring-2 ring-sky-100"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: player.avatarColor }}
                      />
                      <div>
                        <p className="font-bold text-slate-900">{player.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          相性抜群: <span className="font-medium text-slate-700">{analysis?.mostConnectedName}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">総共通点</span>
                      <span className="text-lg font-black text-sky-500">{analysis?.totalConnections} 個</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <hr className="my-2 border-slate-200" />

            {/* 選択中のプレイヤーのつながり詳細 */}
            {selectedPlayer && (
              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm grid gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-1.5 rounded-full" style={{ backgroundColor: selectedPlayer.avatarColor }} />
                  <h3 className="font-bold text-slate-900">{selectedPlayer.name} のつながり詳細</h3>
                </div>

                <div className="grid gap-3">
                  {selectedPlayer.commonPoints.map((cp) => {
                    const partner = processedPlayers.find((p) => p.id === cp.withPlayerId);
                    const analysis = analysisMap.get(selectedPlayer.id);
                    const isBestPartner = partner?.name === analysis?.mostConnectedName && cp.count > 0;

                    return (
                      <div key={cp.withPlayerId} className="rounded-2xl border border-slate-50 bg-slate-50 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-700">vs {partner?.name}</span>
                            {isBestPartner && (
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                BEST!
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-black text-sky-500">共通点: {cp.count}個</span>
                        </div>
                        
                        {/* 共通点のハッシュタグ風チップス */}
                        <div className="flex flex-wrap gap-1.5">
                          {cp.count > 0 ? (
                            cp.items.map((item, idx) => (
                              <span
                                key={idx}
                                className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600"
                              >
                                #{item}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 italic">共通点はまだありません</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ナビゲーションボタン */}
            <div className="grid gap-3 mt-4">
              <Link
                to={paths.players}
                onClick={clearGameSession}
                className="rounded-2xl bg-sky-500 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-sky-600 shadow-md"
              >
                もう一度遊ぶ
              </Link>
              <Link
                to={paths.home}
                onClick={clearGameSession}
                className="text-center text-sm font-bold text-slate-500 transition hover:text-slate-700"
              >
                ホームへ戻る
              </Link>
            </div>
          </div>
        )}

      </div>
    </MobilePageShell>
  );
}