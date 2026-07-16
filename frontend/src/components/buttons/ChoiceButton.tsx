import type { ButtonHTMLAttributes, ReactNode } from "react";

type ChoiceButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean;
  children: ReactNode;
};

export function ChoiceButton({
  children,
  className = "",
  selected,
  type = "button",
  ...props
}: ChoiceButtonProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={`min-h-14 rounded-2xl border px-4 py-3 text-center text-lg font-bold transition-all focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-200 ${
        selected
          ? "scale-105 border-sky-400 bg-sky-400 text-white shadow-md shadow-sky-400/20"
          : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
