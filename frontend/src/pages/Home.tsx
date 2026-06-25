import React, { useState } from 'react';

export const Home: React.FC = () => {
  const [screen, setScreen] = useState<'home' | 'next'>('home');

  if (screen === 'next') {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-sky-100">
        <div className="w-full max-w-sm min-h-[580px] sm:min-h-[620px] bg-emerald-50/90 rounded-[32px] shadow-md border border-white flex flex-col items-center justify-between py-10 px-4 sm:px-6 overflow-hidden select-none">
          
          <div className="bg-white border border-slate-100 py-3.5 px-6 sm:px-8 rounded-2xl shadow-sm w-full max-w-[300px]">
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 text-center tracking-wider whitespace-nowrap">
              共通点ファインダー
            </h1>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm w-full max-w-[320px] flex-1 my-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-bold text-sky-800 mb-3">
              設定画面（未定）
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed px-2">
              ここからゲーム設定やプレイ人数選択など、次の画面へ繋がります。
            </p>
            <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mt-6">
              <span className="font-bold text-xs uppercase tracking-widest text-sky-700">Next</span>
            </div>
          </div>

          <button 
            onClick={() => setScreen('home')}
            className="w-full max-w-[240px] text-lg font-bold text-sky-700 bg-sky-100 hover:bg-sky-200 py-3.5 rounded-full shadow-sm transition-colors duration-200 active:scale-98 cursor-pointer text-center"
          >
            もどる
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-sky-100">
      
      <div className="w-full max-w-sm min-h-[580px] sm:min-h-[620px] bg-emerald-50/90 rounded-[32px] shadow-md border border-white flex flex-col items-center justify-between py-10 px-4 sm:px-6 overflow-hidden select-none">
        
        <div className="bg-white border border-slate-100 py-3.5 px-6 sm:px-8 rounded-2xl shadow-sm w-full max-w-[300px]">
          <h1 className="text-xl sm:text-2xl font-bold text-sky-900 text-center tracking-wider whitespace-nowrap">
            共通点ファインダー
          </h1>
        </div>

        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm w-full max-w-[320px] flex-1 my-6 flex flex-col justify-center">
          <h2 className="text-lg font-bold text-sky-800 border-b border-slate-100 pb-2 mb-4 text-center">
            あそびかた
          </h2>
          <ul className="text-slate-600 text-sm space-y-3.5 font-bold list-none pl-0">
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs">1</span>
              <span>「はじめる」ボタンを押す</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs">2</span>
              <span>いっしょに遊ぶ人数を選ぶ</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs">3</span>
              <span>1人ずつ質問に答えていく</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs">4</span>
              <span>全員の回答が終わると…</span>
            </li>
            <li className="flex items-center justify-center text-emerald-800 font-black bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-200/50 mt-1 text-center">
              <span>みんなの共通点が見つかるよ！</span>
            </li>
          </ul>
        </div>

        <button 
          onClick={() => setScreen('next')}
          className="w-full max-w-[240px] text-lg font-bold text-white bg-emerald-500 hover:bg-emerald-600 py-3.5 rounded-full shadow-sm transition-colors duration-200 active:scale-98 cursor-pointer"
        >
          はじめる
        </button>
      </div>
    </div>
  );
};

export default Home;