import { useState } from "react";
import { Navigate } from "react-router-dom";

import { ButtonLink } from "../components/links";
import { MobilePageShell } from "../components/MobilePageShell";
import { PageHeader } from "../components/PageHeader";
import { createPlayerProfileLookup } from "../components/result/playerProfiles";
import { QuestionResultCarousel } from "../components/result/QuestionResultCarousel";
import {
  isGameSessionComplete,
  loadGameSession,
} from "../features/gameSession";
import { questions } from "../features/questions";
import { analyzeResults } from "../features/resultAnalysis";
import {
  loadResultQuestionIndex,
  saveResultQuestionIndex,
} from "../features/resultViewSession";
import { paths } from "../routes";

export function QuestionResults() {
  const gameSession = loadGameSession();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(() =>
    loadResultQuestionIndex(questions.length),
  );

  if (!gameSession) {
    return <Navigate to={paths.players} replace />;
  }

  if (!isGameSessionComplete(gameSession)) {
    return <Navigate to={paths.questions} replace />;
  }

  const { players, questionResults } = analyzeResults(
    gameSession.answers,
    questions,
  );
  const orderedPlayerIndexes = [...players]
    .sort(
      (firstPlayer, secondPlayer) =>
        gameSession.resultPlayerOrder.indexOf(firstPlayer.playerIndex) -
        gameSession.resultPlayerOrder.indexOf(secondPlayer.playerIndex),
    )
    .map((player) => player.playerIndex);
  const getPlayerProfile = createPlayerProfileLookup(orderedPlayerIndexes);

  function handleActiveQuestionChange(questionIndex: number) {
    setActiveQuestionIndex(questionIndex);
    saveResultQuestionIndex(questionIndex);
  }

  return (
    <MobilePageShell>
      <div className="grid gap-6">
        <PageHeader
          label="RESULT"
          title="みんなの回答結果"
          description="左右にスワイプして、質問ごとの回答と会話のきっかけを見てみよう！"
        />

        <QuestionResultCarousel
          questionResults={questionResults}
          playerDisplayOrder={orderedPlayerIndexes}
          getPlayerProfile={getPlayerProfile}
          activeSlideIndex={activeQuestionIndex}
          onActiveSlideChange={handleActiveQuestionChange}
        />

        <ButtonLink to={paths.resultSummary}>まとめを見る</ButtonLink>
      </div>
    </MobilePageShell>
  );
}
