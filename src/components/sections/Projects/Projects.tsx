"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import FadeUp from "@/components/motion/FadeUp";
import ProjectCard from "./ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal/ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { t } = useLanguage();

  return (
    <section id="projects-section" className="w-full flex flex-col items-center px-4 sm:px-6 py-16 sm:py-24">
      <FadeUp>
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          {t("projects.sectionTitle")}
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-[1000px]">
        {projects.map((project, i) => (
          <FadeUp key={project.title} delay={i * 100}>
            <ProjectCard
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          </FadeUp>
        ))}
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
