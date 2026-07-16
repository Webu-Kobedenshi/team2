import { ChevronDown } from "lucide-react";

import type { ResultPlayer } from "../../features/resultAnalysis";
import type { PlayerProfile } from "./playerProfiles";

type PlayerResultAccordionProps = {
  player: ResultPlayer;
  isOpen: boolean;
  onToggle: () => void;
  getPlayerProfile: (playerIndex: number) => PlayerProfile;
};

export function PlayerResultAccordion({
  player,
  isOpen,
  onToggle,
  getPlayerProfile,
}: PlayerResultAccordionProps) {
  const profile = getPlayerProfile(player.playerIndex);
  const contentId = `player-result-${player.playerIndex}`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
        isOpen
          ? "border-sky-500 ring-2 ring-sky-100"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className="h-4 w-4 shrink-0 rounded-full"
            style={{ backgroundColor: profile.avatarColor }}
          />
          <p className="font-bold text-slate-900">{profile.name}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">
              総共通点
            </span>
            <span className="text-lg font-black text-sky-500">
              {player.totalCommonPointCount} 個
            </span>
          </div>
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          id={contentId}
          role="region"
          aria-label={`${profile.name}の共通点`}
          className="grid gap-3 border-t border-slate-100 p-4"
        >
          {player.commonPoints.map((commonPoint) => {
            const partnerProfile = getPlayerProfile(
              commonPoint.withPlayerIndex,
            );

            return (
              <div
                key={commonPoint.withPlayerIndex}
                className="rounded-2xl border border-slate-50 bg-slate-50 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-slate-700">
                    {partnerProfile.name}との共通点
                  </span>
                  <span className="shrink-0 text-xs font-black text-sky-500">
                    共通点: {commonPoint.items.length}個
                  </span>
                </div>

                <div className="grid gap-2">
                  {commonPoint.items.length > 0 ? (
                    commonPoint.items.map((item) => (
                      <div
                        key={item.questionId}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                      >
                        <p className="text-xs font-bold leading-5 text-slate-500">
                          {item.questionText}
                        </p>
                        <p className="mt-0.5 text-sm font-bold text-slate-800">
                          {item.answerLabel}
                        </p>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      共通点はまだありません
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
