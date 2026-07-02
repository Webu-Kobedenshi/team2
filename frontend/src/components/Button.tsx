import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  const baseStyle =
    "rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg";

  const styles = {
    primary: "bg-sky-500 text-white hover:bg-sky-600 hover:scale-105",

    secondary:
      "bg-white border-2 border-sky-500 text-sky-600 hover:bg-sky-50 hover:scale-105",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
          : styles[variant]
      }`}
    >
      {children}
    </button>
  );
}
