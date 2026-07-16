import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type BackLinkProps = LinkProps & {
  children: ReactNode;
};

export function BackLink({
  children,
  className = "",
  ...props
}: BackLinkProps) {
  return (
    <Link
      className={`flex w-fit items-center gap-1 rounded-md py-1 pr-2 text-sm font-bold text-slate-500 transition hover:text-slate-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-200 ${className}`}
      {...props}
    >
      <ChevronLeft aria-hidden="true" className="h-4 w-4" />
      {children}
    </Link>
  );
}
