type PageHeaderProps = {
  label: string;
  title: string;
  description: string;
};

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="grid gap-3">
      <p className="text-base font-black text-sky-500">{label}</p>
      <h1 className="text-3xl font-black tracking-tight text-slate-950">
        {title}
      </h1>
      <p className="leading-7 text-slate-600">{description}</p>
    </div>
  );
}
