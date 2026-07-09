import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { MobilePageShell } from "../components/MobilePageShell";
import { QuestionCard } from "../components/QuestionCard";
import {
  loadGameSession,
  saveGameSession,
  savePlayerAnswer,
} from "../features/gameSession";
import { questions } from "../features/questions";
import { paths } from "../routes";

const validPlayerCounts = [2, 3, 4];
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
              {hasPreviousPlayer ? "次の人にまわそう" : "質問に答えよう"}
            </h1>
            <p className="leading-7 text-slate-600">
              {hasPreviousPlayer
                ? "スマホはこの画面のまま、次の人に渡してね！"
                : "準備ができたら、回答をはじめよう！"}
            </p>
          </div>

          <div className="flex justify-end">
            <p className="min-w-20 rounded-full bg-blue-100 px-5 py-2 text-center text-lg font-black text-blue-700">
              {currentPlayerOrderIndex + 1}/{playerCount}
            </p>
          </div>

          <div className="grid gap-8">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-xl font-black text-slate-900">
                {hasPreviousPlayer
                  ? "次の人にスマホを渡そう"
                  : "最初の人からスタート"}
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                {hasPreviousPlayer
                  ? "受け取った人が、このボタンを押してね！"
                  : "自分に近い答えを選ぼう"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setScreen("question")}
              className="rounded-2xl bg-slate-950 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-slate-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              回答する
            </button>
          </div>

          <div className="grid gap-3">
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
              質問に答えよう
            </h1>
            <p className="leading-7 text-slate-600">
              思い当たる答えを一つだけ選んでね！
            </p>
          </div>

          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            questionCount={questions.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />

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
                  ? "次の人へ"
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
