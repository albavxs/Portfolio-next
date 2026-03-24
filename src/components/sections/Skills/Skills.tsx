"use client";

import Image from "next/image";
import { skills, type Skill } from "@/data/skills";
import FadeUp from "@/components/motion/FadeUp";
import Marquee from "@/components/ui/Marquee/Marquee";
import {
  SiTypescript,
  SiGodotengine,
  SiLinux,
  SiGnubash,
  SiDocker,
} from "react-icons/si";
import type { IconType } from "react-icons";

const iconConfig: Record<string, { Icon: IconType; color: string }> = {
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  godot: { Icon: SiGodotengine, color: "#478CBF" },
  linux: { Icon: SiLinux, color: "#FCC624" },
  shell: { Icon: SiGnubash, color: "#4EAA25" },
  docker: { Icon: SiDocker, color: "#2496ED" },
};

function SkillPill({ skill }: { skill: Skill }) {
  const config = iconConfig[skill.icon];

  return (
    <div
      className="group flex items-center gap-3 px-4 py-2 min-w-[140px] transition-all duration-300 hover:scale-110 hover:[filter:drop-shadow(0_0_8px_rgba(125,92,56,0.4))]"
      title={skill.description}
    >
      {skill.icon.startsWith("/") ? (
        <Image
          src={skill.icon}
          alt={skill.name}
          width={40}
          height={40}
          className="object-contain grayscale brightness-200 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100"
        />
      ) : config ? (
        <config.Icon
          className="w-10 h-10 text-white/70 transition-colors duration-300 group-hover:[color:var(--skill-color)]"
          style={
            {
              "--skill-color": config.color,
            } as React.CSSProperties
          }
        />
      ) : null}
      <span className="text-sm font-medium text-white whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
}

export default function Skills() {
  const row1 = skills.slice(0, 6);
  const row2 = skills.slice(6);

  return (
    <section className="w-full flex flex-col items-center">
      <FadeUp>
        <h2
          id="skills-section"
          className="text-[32px] font-bold text-white text-center mt-[60px] mb-[30px] md:text-2xl md:mt-10 md:mb-5"
        >
          Skills
        </h2>
      </FadeUp>

      <div className="w-full flex flex-col gap-4 max-w-[1200px] [perspective:800px]">
        <Marquee direction="left" speed={35} pauseOnHover className="[transform:translateZ(0px)]">
          {row1.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </Marquee>

        <Marquee direction="right" speed={40} pauseOnHover className="[transform:translateZ(-60px)_scale(0.92)] opacity-60 blur-[0.5px]">
          {row2.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
