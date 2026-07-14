import { ButtonLink, TextLink } from "../components/links";
import { MobilePageShell } from "../components/MobilePageShell";
import { PageHeader } from "../components/PageHeader";
import { paths } from "../routes";

export function HowTo() {
  return (
    <MobilePageShell>
      <div className="grid gap-6">
        <PageHeader
          label="GUIDE"
          title="遊び方"
          description="画像や詳しい説明を置くための仮ページです。ホームからの導線確認にも使います。"
        />

        <ol className="grid gap-3">
          <li className="rounded-2xl bg-white p-4 font-bold shadow-sm">
            1. 遊ぶ人数を選びます。
          </li>
          <li className="rounded-2xl bg-white p-4 font-bold shadow-sm">
            2. 一人ずつ質問に答えます。
          </li>
          <li className="rounded-2xl bg-white p-4 font-bold shadow-sm">
            3. 結果を見て会話します。
          </li>
        </ol>

        <div className="grid gap-3">
          <ButtonLink to={paths.players}>人数を選んではじめる</ButtonLink>
          <TextLink to={paths.home}>ホームへ戻る</TextLink>
        </div>
      </div>
    </MobilePageShell>
  );
}
