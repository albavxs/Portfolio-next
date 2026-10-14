import { ReactNode } from "react";

/* Contêiner padrão das seções: mesma borda esquerda e mesmo respiro em toda a página */
export default function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <h2 className="text-heading font-semibold text-ink">{title}</h2>
      {intro && <p className="mt-4 max-w-[60ch] text-lead text-muted">{intro}</p>}
      <div className="mt-10 sm:mt-14">{children}</div>
    </section>
  );
}
