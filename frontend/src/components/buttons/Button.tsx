import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  block?: boolean;
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "bg-sky-400 text-white shadow-md shadow-sky-400/10 hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/20 focus-visible:outline-sky-200",
};

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
      } ${variantClassNames[variant]} ${
        disabled
          ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none hover:bg-slate-200 hover:shadow-none active:translate-y-0 active:scale-100"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
