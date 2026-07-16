import type { PlayerProfile } from "./result/playerProfiles";
import { Button } from "./buttons";
import { PageHeader } from "./PageHeader";

type PlayerIdentityRevealProps = {
  profile: PlayerProfile;
  onBack: () => void;
  onNext: () => void;
  onReturnToPlayerSelect: () => void;
};

export function PlayerIdentityReveal({
  profile,
  onBack,
  onNext,
  onReturnToPlayerSelect,
}: PlayerIdentityRevealProps) {
  return (
    <div className="grid gap-6">
      <PageHeader
        label="STEP 2"
        title="あなたの表示名"
        description="結果を見るときに使うので、自分の表示名を覚えておいてね！"
      />

      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm font-bold text-slate-500">あなたは</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-5 w-5 shrink-0 rounded-full"
              style={{ backgroundColor: profile.avatarColor }}
            />
            <p className="text-4xl font-black tracking-tight text-slate-950">
              {profile.name}
            </p>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5 text-sm font-bold leading-6 text-slate-700">
            <p>
              <span className="block">結果画面ではみんなが匿名になって、</span>
              <span className="block">A〜Dさんとして表示されるよ。</span>
            </p>
            <p className="mt-2">
              <span className="block">自分が何さんかはまだ内緒にして、</span>
              <span className="block">
                誰がどれか結果を見ながら当ててみてね！
              </span>
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={onBack}>
              前へ
            </Button>
            <Button onClick={onNext}>次へ</Button>
          </div>
          <button
            type="button"
            onClick={onReturnToPlayerSelect}
            className="rounded-md text-center text-sm font-bold text-slate-500 transition hover:text-slate-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
          >
            人数選択へ戻る
          </button>
        </div>
      </div>
    </div>
  );
}
