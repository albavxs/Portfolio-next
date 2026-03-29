"use client";

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
  const { t } = useLanguage();

  const translatedDescription =
    t(`projects.entries.${index}.description`) !== `projects.entries.${index}.description`
      ? t(`projects.entries.${index}.description`)
      : project.description;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-ios-glass-solid backdrop-blur-[20px] border border-ios-border rounded-[20px] overflow-hidden flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-ios-glass-hover hover:-translate-y-[5px] hover:border-white/20 active:scale-[0.98] supports-[backdrop-filter]:bg-ios-glass"
    >
      {/* Screenshot */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={project.screenshot}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <p className="text-xl font-semibold text-white">{project.title}</p>
        <p className="text-sm text-ios-text-secondary leading-relaxed line-clamp-3">
          {translatedDescription}
        </p>

        {/* Tech badges */}
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

        {/* Action links */}
        <div className="flex gap-2 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-ios-accent hover:text-white transition-colors duration-200"
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
