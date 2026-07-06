import type { ReactNode } from "react";

type MobilePageShellProps = {
  children: ReactNode;
  className?: string;
};

const backgroundCircles = [
  "-right-10 -top-10 h-28 w-28 bg-sky-50",
  "-bottom-12 -left-10 h-32 w-32 bg-emerald-50",
  "-right-14 top-[52%] h-36 w-36 bg-violet-50",
  "left-8 bottom-28 h-28 w-28 bg-sky-50",
];

export function MobilePageShell({ children, className }: MobilePageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-5 py-8 text-slate-900 sm:px-8">
      {backgroundCircles.map((circle) => (
        <div
          key={circle}
          aria-hidden="true"
          className={`absolute rounded-full ${circle}`}
        />
      ))}
      <section
        className={[
          "relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-md flex-col justify-center gap-8 sm:max-w-lg",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </section>
    </main>
  );
}
