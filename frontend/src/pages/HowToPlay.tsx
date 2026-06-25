type HowToPlayProps = {
  onBack: () => void;
};

export function HowToPlay({ onBack }: HowToPlayProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-4xl font-bold">
        遊び方
        </h1>

        <ol className="list-decimal space-y-3 pl-6">
          <li>スタートボタンを押します。</li>
          <li>質問に回答します。</li>
          <li>参加者同士の共通点を探します。</li>
          <li>見つけた共通点について会話を楽しみます。</li>
        </ol>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          ホームへ戻る
        </button>
      </div>
    </main>
  );
}