import { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-small text-muted">
      {children}
    </span>
  );
}
