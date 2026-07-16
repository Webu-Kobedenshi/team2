import { Navigate } from "react-router-dom";

import { MobilePageShell } from "../components/MobilePageShell";
import { createPlayerProfileLookup } from "../components/result/playerProfiles";
import { PlayerSummary } from "../components/result/PlayerSummary";
import {
  isGameSessionComplete,
  loadGameSession,
} from "../features/gameSession";
import { questions } from "../features/questions";
import { analyzeResults } from "../features/resultAnalysis";
import { paths } from "../routes";

export function ResultSummary() {
  const gameSession = loadGameSession();

  if (!gameSession) {
    return <Navigate to={paths.players} replace />;
  }

  if (!isGameSessionComplete(gameSession)) {
    return <Navigate to={paths.questions} replace />;
  }

  const { players } = analyzeResults(gameSession.answers, questions);
  const resultPlayers = [...players].sort(
    (firstPlayer, secondPlayer) =>
      gameSession.resultPlayerOrder.indexOf(firstPlayer.playerIndex) -
      gameSession.resultPlayerOrder.indexOf(secondPlayer.playerIndex),
  );
  const getPlayerProfile = createPlayerProfileLookup(
    resultPlayers.map((player) => player.playerIndex),
  );

  return (
    <MobilePageShell>
      <PlayerSummary
        players={resultPlayers}
        getPlayerProfile={getPlayerProfile}
      />
    </MobilePageShell>
  );
}
