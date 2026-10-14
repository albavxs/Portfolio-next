"use client";

import Image from "next/image";
import type { Project } from "@/content/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import Tag from "@/shared/ui/Tag";
import { BsGithub, BsBoxArrowUpRight } from "react-icons/bs";

interface Props {
  project: Project;
  index: number;
  featured?: boolean;
  onOpen: () => void;
}

export default function ProjectCard({ project, index, featured = false, onOpen }: Props) {
  const { t } = useLanguage();

  const key = `projects.entries.${index}.description`;
  const description = t(key) !== key ? t(key) : project.description;

  return (
    <article
      className={`reveal group h-full overflow-hidden rounded-lg bg-surface transition-colors hover:bg-surface-hover ${
        featured ? "grid lg:grid-cols-[1.5fr_1fr]" : "flex flex-col"
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${t("projects.details")}: ${project.title}`}
        className={`relative block w-full overflow-hidden cursor-pointer ${featured ? "aspect-video lg:aspect-auto lg:min-h-[420px]" : "aspect-video"}`}
      >
        <Image
          src={project.screenshot}
          alt=""
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 700px" : "(max-width: 768px) 100vw, 580px"}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>

      <div className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-10 lg:justify-center" : "p-6 sm:p-8"}`}>
        <h3 className={`${featured ? "text-heading" : "text-lead"} font-semibold text-ink`}>{project.title}</h3>
        <p className="mt-3 max-w-[60ch] text-body text-muted">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7">
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full bg-white/[0.08] px-4 py-2 text-small font-medium text-ink transition-colors hover:bg-white/[0.14] cursor-pointer"
          >
            {t("projects.details")}
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-small text-muted transition-colors hover:text-ink"
          >
            <BsGithub size={15} />
            {t("projects.viewCode")}
          </a>
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-small text-accent transition-colors hover:text-ink"
            >
              <BsBoxArrowUpRight size={13} />
              {t("projects.liveDemo")}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
