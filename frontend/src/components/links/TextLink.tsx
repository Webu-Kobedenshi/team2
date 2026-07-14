import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type TextLinkProps = LinkProps & {
  children: ReactNode;
};

export function TextLink({
  children,
  className = "",
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={`rounded-md text-center text-sm font-bold text-slate-500 transition hover:text-slate-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-200 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
