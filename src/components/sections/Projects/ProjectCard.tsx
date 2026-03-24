"use client";

import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-ios-glass-solid backdrop-blur-[20px] border border-ios-border rounded-[20px] p-[30px] flex flex-col gap-3 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-ios-glass-hover hover:-translate-y-[5px] hover:border-white/20 active:scale-[0.98] supports-[backdrop-filter]:bg-ios-glass"
    >
      <p className="text-xl font-semibold text-white">{project.title}</p>
      <p className="text-sm text-ios-text-secondary">{project.description}</p>
    </div>
  );
}
