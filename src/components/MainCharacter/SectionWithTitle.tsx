import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionWithTitle({
  title,
  children,
  className: propClassName,
}: Props) {
  const className = "bg-stone-100 rounded-lg py-2 px-3 shadow";

  return (
    <section className={twMerge(className, propClassName)}>
      <header className="text-xs font-semibold text-neutral-500">
        {title}
      </header>
      <div className="text-xl">{children}</div>
    </section>
  );
}
