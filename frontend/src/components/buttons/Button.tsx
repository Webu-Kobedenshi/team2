import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "destructive";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  block?: boolean;
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "bg-sky-400 text-white shadow-md shadow-sky-400/10 hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/20 focus-visible:outline-sky-200",
  secondary:
    "border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-600 focus-visible:outline-sky-200",
  destructive:
    "border border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300 hover:bg-rose-100 focus-visible:outline-rose-200",
};

const disabledClassName =
  "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none active:translate-y-0 active:scale-100";

export function Button({
  block = true,
  children,
  className = "",
  disabled = false,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`rounded-2xl px-6 py-4 text-center text-base font-black transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 active:translate-y-0.5 active:scale-[0.98] ${
        block ? "w-full" : ""
      } ${disabled ? disabledClassName : variantClassNames[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
