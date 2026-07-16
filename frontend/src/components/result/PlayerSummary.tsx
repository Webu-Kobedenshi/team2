import { useState } from "react";

import { clearGameSession } from "../../features/gameSession";
import type { ResultPlayer } from "../../features/resultAnalysis";
import { paths } from "../../routes";
import { BackLink, ButtonLink, TextLink } from "../links";
import { PageHeader } from "../PageHeader";
import { PlayerResultAccordion } from "./PlayerResultAccordion";
import type { PlayerProfile } from "./playerProfiles";

type PlayerSummaryProps = {
  players: ResultPlayer[];
  getPlayerProfile: (playerIndex: number) => PlayerProfile;
};

export function PlayerSummary({
  players,
  getPlayerProfile,
}: PlayerSummaryProps) {
  const [expandedPlayerIndex, setExpandedPlayerIndex] = useState<number | null>(
    null,
  );

  return (
    <div className="grid gap-6">
      <PageHeader
        label="SUMMARY"
        title="みんなの共通点まとめ"
        description="プレイヤーをタップして、相手ごとの共通点を見てみよう！"
      />

      <div className="grid gap-3">
        {players.map((player) => (
          <PlayerResultAccordion
            key={player.playerIndex}
            player={player}
            profile={getPlayerProfile(player.playerIndex)}
            isOpen={player.playerIndex === expandedPlayerIndex}
            onToggle={() =>
              setExpandedPlayerIndex((currentPlayerIndex) =>
                currentPlayerIndex === player.playerIndex
                  ? null
                  : player.playerIndex,
              )
            }
            getPlayerProfile={getPlayerProfile}
          />
        ))}
      </div>

      <div className="mt-4 grid gap-5">
        <BackLink to={paths.questionResults}>質問ごとの回答に戻る</BackLink>
        <div className="grid gap-3">
          <ButtonLink to={paths.players} onClick={clearGameSession}>
            もう一度遊ぶ
          </ButtonLink>
          <TextLink to={paths.home} onClick={clearGameSession}>
            ホームへ戻る
          </TextLink>
        </div>
      </div>
    </div>
  );
}
