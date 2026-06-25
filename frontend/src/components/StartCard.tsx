import React from "react";

type Props = {
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const StartCard: React.FC<Props> = ({ children, footer }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-sky-100">
      <div className="w-full max-w-sm min-h-[580px] sm:min-h-[620px] bg-emerald-50/90 rounded-[32px] shadow-md border border-white flex flex-col items-center justify-between py-10 px-4 sm:px-6 overflow-hidden select-none">
        <div className="bg-white border border-slate-100 py-3.5 px-6 sm:px-8 rounded-2xl shadow-sm w-full max-w-[300px]">
          <h1 className="text-xl sm:text-2xl font-bold text-sky-900 text-center tracking-wider whitespace-nowrap">
            共通点ファインダー
          </h1>
        </div>

        <div className="flex-1 my-6 w-full flex flex-col items-center justify-center">
          {children}
        </div>

        {footer}
      </div>
    </div>
  );
};

export default StartCard;
