import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type ButtonLinkVariant = "primary";

type ButtonLinkProps = LinkProps & {
  block?: boolean;
  children: ReactNode;
  variant?: ButtonLinkVariant;
};

const variantClassNames: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-sky-400 text-white shadow-md shadow-sky-400/10 hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/20 focus-visible:outline-sky-200",
};

export function ButtonLink({
  block = true,
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`rounded-2xl px-6 py-4 text-center text-base font-black transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 active:translate-y-0.5 active:scale-[0.98] ${
        block ? "w-full" : ""
      } ${variantClassNames[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
