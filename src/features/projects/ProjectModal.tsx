"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import Tag from "@/shared/ui/Tag";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!project) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  const projectIndex = project ? projects.findIndex((p) => p.title === project.title) : -1;

  const getTranslated = (field: string, fallback: string) => {
    if (projectIndex === -1) return fallback;
    const key = `projects.entries.${projectIndex}.${field}`;
    const val = t(key);
    return val !== key ? val : fallback;
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[1001] flex items-end sm:items-center justify-center bg-black/75 p-2 sm:p-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="w-full sm:max-w-[640px] max-h-[90vh] overflow-y-auto bg-surface rounded-t-2xl sm:rounded-lg flex flex-col gap-5 shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
          >
            {/* Screenshot */}
            <div className="relative w-full aspect-video">
              <Image
                src={project.screenshot}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="object-cover object-top"
              />
            </div>

            <div className="px-5 pb-5 sm:px-8 sm:pb-8 flex flex-col gap-4 sm:gap-5">
              
              <div className="flex items-start justify-between">
                <h3 className="text-heading font-semibold text-ink">{project.title}</h3>
                <button
                  onClick={onClose}
                  aria-label={t("projects.close")}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-white/[0.08] text-lead cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <p className="text-body text-muted">
                {getTranslated("description", project.description)}
              </p>

              <p className="text-body text-muted">
                {getTranslated("details", project.details)}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((techItem) => (
                  <Tag key={techItem}>{techItem}</Tag>
                ))}
              </div>

              <div className="flex gap-3 mt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-accent-strong px-5 py-2.5 text-body font-medium text-white transition-colors hover:bg-accent"
                >
                  GitHub
                </a>
                {project.deployUrl && (
                  <a
                    href={project.deployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-white/[0.08] px-5 py-2.5 text-body font-medium text-ink transition-colors hover:bg-white/[0.14]"
                  >
                    {t("projects.liveDemo")}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
