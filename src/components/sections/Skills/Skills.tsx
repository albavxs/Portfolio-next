"use client";

import Image from "next/image";
import { skills, type Skill } from "@/data/skills";
import FadeUp from "@/components/motion/FadeUp";
import Marquee from "@/components/ui/Marquee/Marquee";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  SiTypescript,
  SiGodotengine,
  SiLinux,
  SiGnubash,
  SiDocker,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
} from "react-icons/si";
import type { IconType } from "react-icons";

const iconConfig: Record<string, IconType> = {
  typescript: SiTypescript,
  godot: SiGodotengine,
  linux: SiLinux,
  shell: SiGnubash,
  docker: SiDocker,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  git: SiGit,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  supabase: SiSupabase,
};

function SkillPill({ skill }: { skill: Skill }) {
  const Icon = iconConfig[skill.icon];

  return (
    <div
      className="group flex items-center gap-3 px-5 py-3 min-w-[150px] rounded-2xl bg-ios-glass-solid border border-ios-border backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[var(--brand)]/40 hover:shadow-[0_0_20px_var(--brand-glow)]"
      style={{
        ["--brand" as string]: skill.brandColor,
        ["--brand-glow" as string]: `${skill.brandColor}25`,
      }}
      title={skill.description}
    >
      {skill.icon.startsWith("/") ? (
        <Image
          src={skill.icon}
          alt={skill.name}
          width={36}
          height={36}
          className="object-contain grayscale brightness-200 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100"
        />
      ) : Icon ? (
        <Icon
          className="w-9 h-9 text-white/60 transition-colors duration-300 group-hover:text-[var(--brand)]"
        />
      ) : null}
      <span className="text-sm font-medium text-white/80 whitespace-nowrap transition-colors duration-300 group-hover:text-white">
        {skill.name}
      </span>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  const languages = skills.filter((s) => s.category === "languages");
  const frameworks = skills.filter((s) => s.category === "frameworks");
  const infra = skills.filter((s) => s.category === "infra");

  return (
    <section id="skills-section" className="w-full flex flex-col items-center py-24">
      <FadeUp>
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("skills.sectionTitle")}
          </h2>
          <p className="text-ios-text-secondary text-base">
            {t("skills.subtitle")}
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={100}>
        <span className="inline-block mb-10 text-sm font-semibold text-ios-accent border border-ios-accent/30 rounded-full px-4 py-1.5">
          {t("skills.counter")}
        </span>
      </FadeUp>

      <div className="w-full flex flex-col gap-5 max-w-[1200px]">
        <Marquee direction="left" speed={35} pauseOnHover>
          {languages.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </Marquee>

        <Marquee direction="right" speed={40} pauseOnHover>
          {frameworks.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </Marquee>

        <Marquee direction="left" speed={35} pauseOnHover>
          {infra.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
