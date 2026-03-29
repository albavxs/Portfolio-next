"use client";

import { type KeyboardEvent, type MouseEvent } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import { BsGithub, BsBoxArrowUpRight } from "react-icons/bs";

interface Props {
  project: Project;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({ project, index, onClick }: Props) {
  const { lang, t } = useLanguage();

  const translatedDescription =
    t(`projects.entries.${index}.description`) !== `projects.entries.${index}.description`
      ? t(`projects.entries.${index}.description`)
      : project.description;
  const detailsLabel = lang === "pt-br" ? "Detalhes" : "Details";

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  const openDetails = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={project.title}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="group cursor-pointer rounded-[20px] bg-ios-glass-solid backdrop-blur-[20px] border border-ios-border overflow-hidden flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-ios-glass-hover hover:-translate-y-[5px] hover:border-white/20 active:scale-[0.98] outline-none supports-[backdrop-filter]:bg-ios-glass"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={project.screenshot}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 sm:p-6 flex flex-col gap-3 flex-1">
        <p className="text-xl font-semibold text-white">{project.title}</p>
        <p className="text-sm text-ios-text-secondary leading-relaxed line-clamp-3">
          {translatedDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-[11px] text-ios-text-secondary border border-ios-border rounded-full px-2.5 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="hidden md:flex gap-2 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-1.5 text-xs text-ios-text-secondary hover:text-white transition-colors duration-200"
          >
            <BsGithub size={14} />
            {t("projects.viewCode")}
          </a>
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-ios-accent hover:text-white transition-colors duration-200"
            >
              <BsBoxArrowUpRight size={12} />
              {t("projects.liveDemo")}
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-2 md:hidden">
          <button
            type="button"
            onClick={openDetails}
            className="rounded-full bg-ios-accent px-3.5 py-2 text-xs font-semibold text-white transition-transform duration-200 active:scale-95"
          >
            {detailsLabel}
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-full border border-ios-border px-3.5 py-2 text-xs text-ios-text-secondary transition-colors duration-200 hover:text-white"
          >
            <BsGithub size={14} />
            {t("projects.viewCode")}
          </a>
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-ios-accent/20 bg-ios-accent/10 px-3.5 py-2 text-xs text-ios-accent transition-colors duration-200 hover:text-white"
            >
              <BsBoxArrowUpRight size={12} />
              {t("projects.liveDemo")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
