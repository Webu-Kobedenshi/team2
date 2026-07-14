import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, ChoiceButton } from "../components/buttons";
import { TextLink } from "../components/links";
import { MobilePageShell } from "../components/MobilePageShell";
import { PageHeader } from "../components/PageHeader";
import { createGameSession, saveGameSession } from "../features/gameSession";
import { paths } from "../routes";

const playerCounts = [2, 3, 4];

export function PlayerSelect() {
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (selectedCount === null) return;

    saveGameSession(createGameSession(selectedCount));
    navigate(paths.questions);
  };

  return (
    <MobilePageShell>
      <div className="flex flex-1 flex-col">
        <PageHeader
          label="STEP 1"
          title="遊ぶ人数を選ぶ"
          description="一緒に遊ぶ人数を選んで、決定を押してください。"
        />

        <div className="mt-6">
          <div className="grid gap-4">
            {playerCounts.map((count) => (
              <ChoiceButton
                key={count}
                selected={selectedCount === count}
                onClick={() => setSelectedCount(count)}
              >
                {count}人
              </ChoiceButton>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5">
          <Button
            onClick={handleConfirm}
            disabled={selectedCount === null}
            className="text-lg"
          >
            決定
          </Button>

          <TextLink to={paths.home}>ホームへ戻る</TextLink>
        </div>
      </div>
    </MobilePageShell>
  );
}
