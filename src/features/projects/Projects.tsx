"use client";

import { useState } from "react";
import { projects, type Project } from "@/content/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import Section from "@/shared/ui/Section";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

/* SharkType abre a seção: é o projeto que o trecho do Hero imita */
const FEATURED = 1;

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { t } = useLanguage();

  const rest = projects.map((project, index) => ({ project, index })).filter(({ index }) => index !== FEATURED);

  return (
    <Section id="projects-section" title={t("projects.sectionTitle")} intro={t("projects.intro")}>
      <ProjectCard
        project={projects[FEATURED]}
        index={FEATURED}
        featured
        onOpen={() => setSelected(projects[FEATURED])}
      />

      <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {rest.map(({ project, index }) => (
          <ProjectCard key={project.title} project={project} index={index} onOpen={() => setSelected(project)} />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
