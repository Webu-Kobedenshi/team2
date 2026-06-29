type CommonPoint = {
  question: string;
  answer: string;
};

type ResultProps = {
  commonPoints: CommonPoint[];
  onRestart: () => void;
};

export function Result({
  commonPoints,
  onRestart,
}: ResultProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-yellow-100 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-5xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl p-10">

        <div className="text-center">
          <div className="text-7xl animate-bounce">
            🎉🤝
          </div>

          <h1 className="mt-6 text-5xl font-extrabold text-slate-800">
            共通点が見つかりました！
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            みんなの回答から見つかった共通点はこちらです！
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">

          {commonPoints.length > 0 ? (
            commonPoints.map((item, index) => (

              <div
                key={index}
                className="rounded-3xl bg-sky-50 p-8 shadow"
              >

                <h2 className="text-2xl font-bold text-sky-700">
                  {item.question}
                </h2>

                <p className="mt-4 text-xl text-slate-700">
                  全員の答え：
                  <span className="font-bold text-sky-600">
                    {item.answer}
                  </span>
                </p>

              </div>

            ))
          ) : (

            <div className="col-span-2 rounded-3xl bg-yellow-50 p-8 text-center">

              <h2 className="text-2xl font-bold text-yellow-700">
                😢 共通点はありませんでした
              </h2>

              <p className="mt-3 text-slate-700">
                次は違う答えで挑戦してみましょう！
              </p>

            </div>

          )}

        </div>

        <div className="flex justify-center mt-12">

          <button
            onClick={onRestart}
            className="rounded-full bg-sky-500 px-12 py-4 text-lg font-bold text-white hover:bg-sky-600"
          >
            🔄 もう一度遊ぶ
          </button>

        </div>

      </div>

    </main>
  );
}