import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Button } from "../components/buttons";
import { TextLink } from "../components/links";
import { MobilePageShell } from "../components/MobilePageShell";
import { PageHeader } from "../components/PageHeader";
import { QuestionCard } from "../components/QuestionCard";
import {
  loadGameSession,
  saveGameSession,
  savePlayerAnswer,
} from "../features/gameSession";
import { questions } from "../features/questions";
import { paths } from "../routes";

type QuestionScreen = "intro" | "question";

export function QuestionFlow() {
  const navigate = useNavigate();
  const gameSession = loadGameSession();
  const [screen, setScreen] = useState<QuestionScreen>("intro");
  const [currentPlayerOrderIndex, setCurrentPlayerOrderIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (!gameSession) {
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
          <PageHeader
            label="STEP 2"
            title={hasPreviousPlayer ? "次の人にまわそう" : "質問に答えよう"}
            description={
              hasPreviousPlayer
                ? "スマホはこの画面のまま、次の人に渡してね！"
                : "準備ができたら、回答をはじめよう！"
            }
          />

          <div className="flex justify-end">
            <p className="min-w-20 rounded-full bg-sky-100 px-5 py-2 text-center text-lg font-black text-sky-700">
              {currentPlayerOrderIndex + 1}/{activeGameSession.playerCount}
            </p>
          </div>

          <div className="grid gap-8">
            <div className="rounded-3xl border border-sky-100 bg-sky-50 p-5">
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

            <Button onClick={() => setScreen("question")}>回答する</Button>
          </div>

          <TextLink to={paths.players}>人数選択へ戻る</TextLink>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-6">
          <PageHeader
            label="STEP 2"
            title="質問に答えよう"
            description="思い当たる答えを一つだけ選んでね！"
          />

          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            questionCount={questions.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />

          <div className="mt-auto grid gap-3">
            <Button disabled={!selectedAnswer} onClick={handleNext}>
              {isLastQuestion && isLastPlayer
                ? "結果を見る"
                : isLastQuestion
                  ? "次の人へ"
                  : "次へ"}
            </Button>
            <TextLink to={paths.players}>人数選択へ戻る</TextLink>
          </div>
        </div>
      )}
    </MobilePageShell>
  );
}
