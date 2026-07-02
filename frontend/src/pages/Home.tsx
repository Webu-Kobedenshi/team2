import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

// --- 类型定义 ---
interface Option {
  id: string;
  label: string;
}

interface Question {
  id: number;
  title: string;
  options: Option[];
}

interface LinePath {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

// --- 题目数据 ---
const SLIDE_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "日本で一番高い山はどれですか？",
    options: [
      { id: "1A", label: "A. 富士山" },
      { id: "1B", label: "B. 槍ヶ岳" },
      { id: "1C", label: "C. 北岳" },
      { id: "1D", label: "D. 奥穂高岳" },
    ],
  },
  {
    id: 2,
    title: "選択してください：初期陣営はどれですか？",
    options: [
      { id: "2A", label: "A. 秩序聖殿" },
      { id: "2B", label: "B. 混乱廃土" },
      { id: "2C", label: "C. 機械公社" },
      { id: "2D", label: "D. 星河遊民" },
    ],
  },
  {
    id: 3,
    title: "あなたの覚醒コアの傾向は？",
    options: [
      { id: "3A", label: "A. 炭素基派生" },
      { id: "3B", label: "B. 量子湮滅" },
      { id: "3C", label: "C. 幽能構築" },
    ],
  },
];

const TOTAL = SLIDE_QUESTIONS.length;

export function Home(): React.ReactElement {
  const [page, setPage] = useState<number>(1);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [lines, setLines] = useState<Record<number, LinePath>>({});
  const [finished, setFinished] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // --- 选项点击 ---
  const handleSelectOption = (
    questionId: number,
    optionId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    const isLast = activeSlide >= TOTAL - 1;

    if (isLast) {
      // 最後の問題に答えたら完了画面へ
      setTimeout(() => setFinished(true), 400);
      return;
    }

    // 連線座標を記録
    const rect = event.currentTarget.getBoundingClientRect();
    const fromX = rect.left + rect.width / 2;
    const fromY = rect.top + rect.height / 2;
    const toX = window.innerWidth / 2;
    const toY = window.innerHeight / 2 - 140;

    setLines((prev) => ({
      ...prev,
      [questionId]: { fromX, fromY, toX, toY },
    }));

    setTimeout(() => {
      setActiveSlide((prev) => prev + 1);
    }, 250);
  };

  // --- スワイプ ---
  const handleDragEnd = (
  _event: MouseEvent | TouchEvent | PointerEvent,
  info: { offset: { x: number; y: number } }
): void => {
    const threshold = 50;
    if (info.offset.x < -threshold && activeSlide < TOTAL - 1) {
      setActiveSlide((prev) => prev + 1);
    } else if (info.offset.x > threshold && activeSlide > 0) {
      setActiveSlide((prev) => prev - 1);
    }
  };

  return (
    <main className="relative min-h-screen w-screen bg-[#1E2923] text-[#F4F3EF] flex items-center justify-center font-sans antialiased overflow-hidden select-none">

      {/* SVG 連線層 */}
      {page === 3 && !finished && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {Object.entries(lines).map(([qId, path]) => {
            const qNum = parseInt(qId);
            const lineOpacity =
              qNum === SLIDE_QUESTIONS[activeSlide].id ? 0.8 : 0.2;
            const dPath = `M ${path.fromX} ${path.fromY}
              C ${path.fromX} ${path.fromY + 120},
                ${path.toX} ${path.toY - 120},
                ${path.toX} ${path.toY}`;
            return (
              <motion.path
                key={qId}
                d={dPath}
                stroke="#EAD2A8"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: lineOpacity }}
                transition={{
                  pathLength: { duration: 0.8, ease: [0.7, 0, 0.3, 1] },
                  opacity: { duration: 0.3 },
                }}
              />
            );
          })}
        </svg>
      )}

      {/* Page1：スタート */}
      {page === 1 && (
        <div className="flex flex-col items-center gap-8 z-20">
          <button
            onClick={() => setPage(2)}
            className="rounded-full border-2 border-[#EAD2A8] text-[#EAD2A8] px-16 py-4 text-2xl font-bold tracking-widest transition-all duration-300 hover:bg-[#EAD2A8] hover:text-[#1E2923] hover:scale-[1.03] active:scale-[0.98]"
          >
            START
          </button>
          <div className="rounded-2xl border border-[#EAD2A8]/20 bg-[#2A3A31]/60 backdrop-blur-md p-6 text-center text-sm text-[#F4F3EF]/80 max-w-sm shadow-xl">
            <h3 className="mb-3 font-bold uppercase tracking-wider text-[#EAD2A8]">
              遊び方説明
            </h3>
            <div className="space-y-1.5 tracking-wide">
              <p>① 人数を選ぶ</p>
              <p>② 質問に答える</p>
              <p>③ みんなの共通点を探す</p>
              <p>④ 会話のきっかけを見つける</p>
            </div>
          </div>
        </div>
      )}

      {/* Page2：人数選択 */}
      {page === 2 && (
        <div className="flex flex-col items-center z-20">
          <p className="mb-3 text-xs uppercase tracking-widest font-black text-[#C87A65]">
            Players
          </p>
          <h2 className="mb-10 text-2xl font-bold tracking-tight">
            参加人数を選んでください
          </h2>
          <div className="flex gap-6">
            {([2, 3, 4] as number[]).map((num: number) => (
              <button
                key={num}
                onClick={() => {
                  setPage(3);
                  setActiveSlide(0);
                  setAnswers({});
                  setLines({});
                  setFinished(false);
                }}
                className="h-20 w-20 rounded-full border-2 border-[#EAD2A8]/40 bg-[#2A3A31] text-2xl font-bold text-[#EAD2A8]/80 transition-all duration-300 hover:bg-[#EAD2A8] hover:border-[#EAD2A8] hover:text-[#1E2923] hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Page3：答題流 */}
      {page === 3 && !finished && (
        <div className="flex flex-col items-center w-full">

          {/* 進捗ドット */}
          <div className="mb-8 flex gap-4 z-20">
            {SLIDE_QUESTIONS.map((q, idx) => {
              const isCurrent = idx === activeSlide;
              const isDone = answers[q.id] !== undefined;
              return (
                <div
                  key={q.id}
                  onClick={() => setActiveSlide(idx)}
                  className="w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: isCurrent
                      ? "#EAD2A8"
                      : isDone
                      ? "rgba(234,210,168,0.5)"
                      : "rgba(254,243,239,0.15)",
                    transform: isCurrent ? "scale(1.3)" : "scale(1)",
                  }}
                />
              );
            })}
          </div>

          {/* カードステージ */}
          <div
            ref={containerRef}
            className="w-full max-w-md h-[440px] overflow-visible relative px-4"
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{
                x: `calc(-${activeSlide * 100}% - ${activeSlide * 32}px)`,
              }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              className="flex gap-8 w-full h-full"
            >
              {SLIDE_QUESTIONS.map((q, idx) => {
                const isCurrent = idx === activeSlide;
                const isDone = answers[q.id] !== undefined;
                const cardOpacity = isCurrent ? 1 : isDone ? 0.35 : 0.12;

                return (
                  <div
                    key={q.id}
                    onClick={() => !isCurrent && setActiveSlide(idx)}
                    className="w-full h-full flex-shrink-0 bg-[#2A3A31]/50 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-center border transition-all duration-500"
                    style={{
                      opacity: cardOpacity,
                      borderColor: isCurrent
                        ? "rgba(234,210,168,0.2)"
                        : "rgba(234,210,168,0.03)",
                      boxShadow: isCurrent
                        ? "0 20px 40px rgba(0,0,0,0.3)"
                        : "none",
                    }}
                  >
                    {/* 修正: TOTAL を使って正確な分母を表示 */}
                    <p className="mb-2 text-xs uppercase tracking-widest font-black text-[#C87A65]">
                      Question {idx + 1} / {TOTAL}
                    </p>

                    <h2 className="mb-8 text-xl font-bold tracking-tight">
                      {q.title}
                    </h2>

                    <div
                      className="flex flex-col gap-3.5 w-full"
                      style={{ pointerEvents: isCurrent ? "auto" : "none" }}
                    >
                      {q.options.map((option) => {
                        const isSelected = answers[q.id] === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={(e) =>
                              handleSelectOption(q.id, option.id, e)
                            }
                            className="rounded-xl border p-4 text-left font-medium text-sm transition-all duration-200"
                            style={{
                              backgroundColor: isSelected
                                ? "#EAD2A8"
                                : "rgba(42,58,49,0.4)",
                              color: isSelected ? "#1E2923" : "#F4F3EF",
                              borderColor: isSelected
                                ? "#EAD2A8"
                                : "rgba(234,210,168,0.15)",
                              boxShadow: isSelected
                                ? "0 0 15px rgba(234,210,168,0.2)"
                                : "none",
                            }}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <p className="mt-8 text-xs text-[#F4F3EF]/30 tracking-widest">
            ← 左右滑动卡片可随时重答上一题 →
          </p>
        </div>
      )}

      {/* 完了画面 */}
      {page === 3 && finished && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 z-20 text-center px-8"
        >
          <div className="text-5xl">✦</div>
          <h2 className="text-3xl font-bold tracking-tight">
            回答完了！
          </h2>
          <p className="text-[#F4F3EF]/50 text-sm tracking-wide">
            全 {TOTAL} 問に答えました
          </p>
          <button
            onClick={() => {
              setPage(1);
              setActiveSlide(0);
              setAnswers({});
              setLines({});
              setFinished(false);
            }}
            className="mt-4 rounded-full border-2 border-[#EAD2A8]/50 text-[#EAD2A8]/80 px-12 py-3 text-sm tracking-widest transition-all hover:bg-[#EAD2A8] hover:text-[#1E2923] hover:border-[#EAD2A8]"
          >
            もう一度
          </button>
        </motion.div>
      )}

    </main>
  );
}