import { useRef, useState } from "react";
import { Navigate, useBlocker, useNavigate } from "react-router-dom";

import { ConfirmDialog } from "../components/ConfirmDialog";
import { MobilePageShell } from "../components/MobilePageShell";
import { PlayerIdentityReveal } from "../components/PlayerIdentityReveal";
import { QuestionAnswer } from "../components/QuestionAnswer";
import { QuestionIntro } from "../components/QuestionIntro";
import { createPlayerProfileLookup } from "../components/result/playerProfiles";
import {
  clearGameSession,
  loadGameSession,
  saveGameSession,
  savePlayerAnswer,
  saveQuestionProgress,
  type GameSession,
  type QuestionProgress,
} from "../features/gameSession";
import { questions } from "../features/questions";
import { paths } from "../routes";

type QuestionScreen = QuestionProgress["screen"];

function getSelectedAnswerFromProgress(session: GameSession | null) {
  if (!session || session.questionProgress.screen !== "question") {
    return null;
  }

  const { currentPlayerOrderIndex, currentQuestionIndex } =
    session.questionProgress;
  const playerIndex = session.playerOrder[currentPlayerOrderIndex];
  const questionId = session.questionIds[currentQuestionIndex];

  return (
    session.answers.find((answer) => answer.playerIndex === playerIndex)
      ?.answers[questionId] ?? null
  );
}

export function QuestionFlow() {
  const navigate = useNavigate();
  const gameSession = loadGameSession();
  const initialProgress = gameSession?.questionProgress;
  const [screen, setScreen] = useState<QuestionScreen>(
    initialProgress?.screen ?? "intro",
  );
  const [currentPlayerOrderIndex, setCurrentPlayerOrderIndex] = useState(
    initialProgress?.currentPlayerOrderIndex ?? 0,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initialProgress?.currentQuestionIndex ?? 0,
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(() =>
    getSelectedAnswerFromProgress(gameSession),
  );
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const allowNavigationRef = useRef(false);
  const hasAnswerProgress =
    selectedAnswer !== null ||
    (gameSession?.answers.some((playerAnswer) =>
      Object.values(playerAnswer.answers).some((answer) => answer !== null),
    ) ??
      false);
  const navigationBlocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !allowNavigationRef.current &&
      hasAnswerProgress &&
      currentLocation.pathname === paths.questions &&
      nextLocation.pathname !== paths.result,
  );

  if (!gameSession) {
    return <Navigate to={paths.players} replace />;
  }

  if (screen === "complete") {
    return <Navigate to={paths.result} replace />;
  }

  const activeGameSession = gameSession;
  const currentPlayerIndex =
    activeGameSession.playerOrder[currentPlayerOrderIndex];
  const getPlayerProfile = createPlayerProfileLookup(
    activeGameSession.resultPlayerOrder,
  );
  const currentPlayerProfile = getPlayerProfile(currentPlayerIndex);
  const hasPreviousPlayer = currentPlayerOrderIndex > 0;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isLastPlayer =
    currentPlayerOrderIndex === activeGameSession.playerOrder.length - 1;
  function getSavedAnswer(questionIndex: number) {
    const playerAnswer = activeGameSession.answers.find(
      (answer) => answer.playerIndex === currentPlayerIndex,
    );

    return playerAnswer?.answers[questions[questionIndex].id] ?? null;
  }

  function leaveQuestionFlow() {
    allowNavigationRef.current = true;
    clearGameSession();
    navigate(paths.players);
  }

  function confirmLeavingQuestionFlow() {
    if (navigationBlocker.state === "blocked") {
      navigationBlocker.reset();
    }

    leaveQuestionFlow();
  }

  function cancelLeavingQuestionFlow() {
    if (navigationBlocker.state === "blocked") {
      navigationBlocker.reset();
    }

    setShowLeaveConfirmation(false);
  }

  function handleReturnToPlayerSelect() {
    if (hasAnswerProgress) {
      setShowLeaveConfirmation(true);
      return;
    }

    leaveQuestionFlow();
  }

  function handleNext() {
    if (!selectedAnswer) {
      return;
    }

    let nextSession = savePlayerAnswer(
      activeGameSession,
      currentPlayerIndex,
      currentQuestion.id,
      selectedAnswer,
    );

    if (isLastQuestion) {
      nextSession = saveQuestionProgress(nextSession, {
        screen: "identity",
        currentPlayerOrderIndex,
        currentQuestionIndex,
      });
      saveGameSession(nextSession);
      setSelectedAnswer(null);
      setScreen("identity");
      return;
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    nextSession = saveQuestionProgress(nextSession, {
      screen: "question",
      currentPlayerOrderIndex,
      currentQuestionIndex: nextQuestionIndex,
    });
    saveGameSession(nextSession);
    const nextPlayerAnswer = nextSession.answers.find(
      (answer) => answer.playerIndex === currentPlayerIndex,
    );

    setCurrentQuestionIndex(nextQuestionIndex);
    setSelectedAnswer(
      nextPlayerAnswer?.answers[questions[nextQuestionIndex].id] ?? null,
    );
  }

  function handleStartAnswering() {
    saveGameSession(
      saveQuestionProgress(activeGameSession, {
        screen: "question",
        currentPlayerOrderIndex,
        currentQuestionIndex,
      }),
    );
    setSelectedAnswer(getSavedAnswer(currentQuestionIndex));
    setScreen("question");
  }

  function handlePreviousQuestion() {
    if (currentQuestionIndex === 0) {
      return;
    }

    const previousQuestionIndex = currentQuestionIndex - 1;
    const sessionWithCurrentAnswer = selectedAnswer
      ? savePlayerAnswer(
          activeGameSession,
          currentPlayerIndex,
          currentQuestion.id,
          selectedAnswer,
        )
      : activeGameSession;
    saveGameSession(
      saveQuestionProgress(sessionWithCurrentAnswer, {
        screen: "question",
        currentPlayerOrderIndex,
        currentQuestionIndex: previousQuestionIndex,
      }),
    );
    setCurrentQuestionIndex(previousQuestionIndex);
    setSelectedAnswer(getSavedAnswer(previousQuestionIndex));
  }

  function handleReturnFromIdentity() {
    saveGameSession(
      saveQuestionProgress(activeGameSession, {
        screen: "question",
        currentPlayerOrderIndex,
        currentQuestionIndex,
      }),
    );
    setSelectedAnswer(getSavedAnswer(currentQuestionIndex));
    setScreen("question");
  }

  function handleIdentityNext() {
    if (isLastPlayer) {
      saveGameSession(
        saveQuestionProgress(activeGameSession, {
          screen: "complete",
          currentPlayerOrderIndex,
          currentQuestionIndex,
        }),
      );
      navigate(paths.result);
      return;
    }

    const nextPlayerOrderIndex = currentPlayerOrderIndex + 1;
    saveGameSession(
      saveQuestionProgress(activeGameSession, {
        screen: "intro",
        currentPlayerOrderIndex: nextPlayerOrderIndex,
        currentQuestionIndex: 0,
      }),
    );
    setCurrentPlayerOrderIndex(nextPlayerOrderIndex);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScreen("intro");
  }

  return (
    <MobilePageShell>
      {screen === "intro" ? (
        <QuestionIntro
          playerCount={activeGameSession.playerCount}
          currentPlayerNumber={currentPlayerOrderIndex + 1}
          hasPreviousPlayer={hasPreviousPlayer}
          onStart={handleStartAnswering}
          onReturnToPlayerSelect={handleReturnToPlayerSelect}
        />
      ) : screen === "identity" ? (
        <PlayerIdentityReveal
          profile={currentPlayerProfile}
          onBack={handleReturnFromIdentity}
          onNext={handleIdentityNext}
          onReturnToPlayerSelect={handleReturnToPlayerSelect}
        />
      ) : (
        <QuestionAnswer
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          questionCount={questions.length}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={setSelectedAnswer}
          onPrevious={handlePreviousQuestion}
          onNext={handleNext}
          onReturnToPlayerSelect={handleReturnToPlayerSelect}
        />
      )}

      <ConfirmDialog
        open={showLeaveConfirmation || navigationBlocker.state === "blocked"}
        title="人数選択に戻りますか？"
        description={
          <>
            <span className="block">これまでの回答はリセットされます。</span>
            <span className="mt-1 block">元に戻すことはできません。</span>
          </>
        }
        confirmLabel="人数選択に戻る"
        cancelLabel="回答を続ける"
        onConfirm={confirmLeavingQuestionFlow}
        onCancel={cancelLeavingQuestionFlow}
      />
    </MobilePageShell>
  );
}
