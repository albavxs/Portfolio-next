"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

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
          className="fixed inset-0 z-[1001] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-ios-glass-solid backdrop-blur-[30px] border border-ios-border rounded-t-[32px] sm:rounded-[24px] flex flex-col gap-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Screenshot */}
            <div className="relative w-full aspect-video">
              <Image
                src={project.screenshot}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="object-cover rounded-t-[32px] sm:rounded-t-[24px]"
              />
            </div>

            <div className="px-5 pb-5 sm:px-8 sm:pb-8 flex flex-col gap-4 sm:gap-5">
              {/* Handle bar (mobile) */}
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto sm:hidden" />

              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <button
                  onClick={onClose}
                  className="text-ios-text-secondary hover:text-white transition-colors text-2xl leading-none p-1"
                >
                  &times;
                </button>
              </div>

              <p className="text-sm text-ios-text-secondary leading-relaxed">
                {getTranslated("description", project.description)}
              </p>

              <p className="text-sm text-ios-text-secondary leading-relaxed">
                {getTranslated("details", project.details)}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className="text-xs text-ios-text-secondary border border-ios-border rounded-full px-3 py-1"
                  >
                    {techItem}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-ios-accent text-white border-none py-2.5 px-5 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-[1.02]">
                    GitHub
                  </button>
                </a>
                {project.deployUrl && (
                  <a
                    href={project.deployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-white/10 text-white border-none py-2.5 px-5 rounded-xl text-sm cursor-pointer transition-all duration-200 hover:bg-white/20 active:scale-95">
                      Live Demo
                    </button>
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
