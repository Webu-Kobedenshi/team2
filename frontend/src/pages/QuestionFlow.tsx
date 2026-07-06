import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { MobilePageShell } from "../components/MobilePageShell";
import {
  loadGameSession,
  saveGameSession,
  savePlayerAnswer,
} from "../features/gameSession";
import { questions } from "../features/questions";
import { paths } from "../routes";

const validPlayerCounts = [2, 3, 4];
const playerLabels = ["A", "B", "C", "D"];
type QuestionScreen = "intro" | "question";

export function QuestionFlow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const playerCount = Number(searchParams.get("players"));
  const gameSession = loadGameSession();
  const [screen, setScreen] = useState<QuestionScreen>("intro");
  const [currentPlayerOrderIndex, setCurrentPlayerOrderIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (!validPlayerCounts.includes(playerCount) || !gameSession) {
    return <Navigate to={paths.players} replace />;
  }

  const activeGameSession = gameSession;
  const currentPlayerIndex =
    activeGameSession.playerOrder[currentPlayerOrderIndex];
  const currentPlayerLabel = playerLabels[currentPlayerIndex];
  const previousPlayerIndex =
    activeGameSession.playerOrder[currentPlayerOrderIndex - 1];
  const previousPlayerLabel = playerLabels[previousPlayerIndex];
  const hasPreviousPlayer = currentPlayerOrderIndex > 0;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isLastPlayer =
    currentPlayerOrderIndex === activeGameSession.playerOrder.length - 1;

  function handleNext() {
    if (!selectedAnswer) {
      return;
    }

    const nextSession = savePlayerAnswer(
      activeGameSession,
      currentPlayerIndex,
      currentQuestion.id,
      selectedAnswer,
    );

    saveGameSession(nextSession);

    if (isLastQuestion && isLastPlayer) {
      navigate(paths.result);
      return;
    }

    if (isLastQuestion) {
      setCurrentPlayerOrderIndex((playerOrderIndex) => playerOrderIndex + 1);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setScreen("intro");
      return;
    }

    setCurrentQuestionIndex((questionIndex) => questionIndex + 1);
    setSelectedAnswer(null);
  }

  return (
    <MobilePageShell>
      {screen === "intro" ? (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <p className="text-sm font-bold text-blue-600">STEP 2</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950">
              回答者に渡す
            </h1>
            <p className="leading-7 text-slate-600">
              端末を渡してから回答を始めてください。
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-bold text-blue-600">
              {playerCount}人で遊びます
            </p>
            {hasPreviousPlayer && (
              <p className="mt-2 text-sm font-bold text-blue-700">
                {previousPlayerLabel}さんの回答は終了しました
              </p>
            )}
            <p className="mt-2 text-xl font-black text-slate-900">
              {currentPlayerLabel}さんに渡してください
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              あなたは{currentPlayerLabel}です。回答を始めてください。
            </p>
          </div>

          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => setScreen("question")}
              className="rounded-2xl bg-slate-950 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-slate-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              回答を始める
            </button>
            <Link
              to={paths.players}
              className="text-center text-sm font-bold text-slate-500 transition hover:text-slate-700"
            >
              人数選択へ戻る
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <p className="text-sm font-bold text-blue-600">STEP 2</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950">
              質問に答える
            </h1>
            <p className="leading-7 text-slate-600">
              選択肢を選んでから次へ進んでください。
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">
              質問 {currentQuestionIndex + 1} / {questions.length}
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {currentQuestion.text}
            </h2>
            <div className="mt-5 grid gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedAnswer(option.id)}
                    className={[
                      "min-h-16 rounded-2xl border px-4 py-4 text-center text-lg font-black transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-200",
                      isSelected
                        ? "border-blue-400 bg-blue-500 text-white shadow-md shadow-blue-500/20"
                        : "border-slate-200 bg-white text-slate-900 hover:border-blue-200 hover:bg-blue-50",
                    ].join(" ")}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3">
            <button
              type="button"
              disabled={!selectedAnswer}
              onClick={handleNext}
              className="rounded-2xl bg-slate-950 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-slate-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
            >
              {isLastQuestion && isLastPlayer
                ? "結果を見る"
                : isLastQuestion
                  ? "次の人に渡す"
                  : "次へ"}
            </button>
            <Link
              to={paths.players}
              className="text-center text-sm font-bold text-slate-500 transition hover:text-slate-700"
            >
              人数選択へ戻る
            </Link>
          </div>
        </div>
      )}
    </MobilePageShell>
  );
}
