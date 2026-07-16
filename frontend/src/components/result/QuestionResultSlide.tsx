import { MessageCircle } from "lucide-react";

import type { QuestionResult } from "../../features/resultAnalysis";
import { QuestionPanel } from "../QuestionPanel";
import type { PlayerProfile } from "./playerProfiles";

type QuestionResultSlideProps = {
  questionResult: QuestionResult;
  questionNumber: number;
  questionCount: number;
  playerDisplayOrder: number[];
  getPlayerProfile: (playerIndex: number) => PlayerProfile;
};

export function QuestionResultSlide({
  questionResult,
  questionNumber,
  questionCount,
  playerDisplayOrder,
  getPlayerProfile,
}: QuestionResultSlideProps) {
  const displayOrderByPlayerIndex = new Map(
    playerDisplayOrder.map((playerIndex, displayOrder) => [
      playerIndex,
      displayOrder,
    ]),
  );

  return (
    <QuestionPanel
      questionNumber={questionNumber}
      questionCount={questionCount}
      questionText={questionResult.questionText}
    >
      {questionResult.optionResults.map((optionResult) => {
        const hasPlayers = optionResult.playerIndexes.length > 0;

        return (
          <div
            key={optionResult.optionId}
            className={`min-h-16 rounded-2xl border px-4 py-3 ${
              hasPlayers
                ? "border-sky-200 bg-sky-50"
                : "border-slate-100 bg-slate-50"
            }`}
          >
            <p
              className={`text-base font-black ${
                hasPlayers ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {optionResult.optionLabel}
            </p>

            {hasPlayers ? (
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {[...optionResult.playerIndexes]
                  .sort(
                    (firstPlayerIndex, secondPlayerIndex) =>
                      (displayOrderByPlayerIndex.get(firstPlayerIndex) ?? 0) -
                      (displayOrderByPlayerIndex.get(secondPlayerIndex) ?? 0),
                  )
                  .map((playerIndex) => {
                    const profile = getPlayerProfile(playerIndex);

                    return (
                      <li
                        key={playerIndex}
                        className="flex items-center gap-1.5 text-sm font-bold text-slate-700"
                      >
                        <span
                          aria-hidden="true"
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: profile.avatarColor }}
                        />
                        {profile.name}
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <p className="mt-1 text-xs font-bold text-slate-400">
                選んだ人はいません
              </p>
            )}
          </div>
        );
      })}

      <div className="mt-2 border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2 text-violet-600">
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
          <p className="text-xs font-black tracking-wider uppercase">
            みんなで話してみよう
          </p>
        </div>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
          {questionResult.conversationPrompt}
        </p>
      </div>
    </QuestionPanel>
  );
}
