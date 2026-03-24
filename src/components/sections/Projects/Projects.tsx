"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import FadeUp from "@/components/motion/FadeUp";
import ProjectCard from "./ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal/ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section className="w-full flex flex-col items-center">
      <FadeUp>
        <h2 className="text-[32px] font-bold text-white text-center mt-[60px] mb-[30px] md:text-2xl md:mt-10 md:mb-5">
          Projects
        </h2>
      </FadeUp>

      <div className="grid grid-cols-2 gap-[25px] w-[90%] max-w-[1000px] px-5 max-[768px]:grid-cols-1">
        {projects.map((project, i) => (
          <FadeUp key={project.title} delay={i * 100}>
            <ProjectCard
              project={project}
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
