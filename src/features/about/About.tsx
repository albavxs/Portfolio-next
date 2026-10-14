"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { skills, type Skill } from "@/content/skills";
import { certificates } from "@/content/certificates";
import Section from "@/shared/ui/Section";
import { BsArrowUpRight } from "react-icons/bs";
import {
  SiTypescript,
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

const groups: Skill["category"][] = ["languages", "frameworks", "infra"];

function SkillChip({ skill }: { skill: Skill }) {
  const Icon = iconConfig[skill.icon];

  return (
    <li
      title={skill.description}
      className="inline-flex items-center gap-2.5 rounded-full bg-surface py-2 pl-3 pr-4 text-body text-ink"
    >
      {skill.icon.startsWith("/") ? (
        <Image src={skill.icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
      ) : Icon ? (
        <Icon className="h-5 w-5" style={{ color: skill.brandColor }} />
      ) : null}
      {skill.name}
    </li>
  );
}

export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about-section" title={t("about.introTitle")}>
      <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-20">
        <div className="reveal relative aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-lg bg-surface">
          <Image
            src="/images/screenshots/pege.jpeg"
            alt="Paulo Guilherme"
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="max-w-[60ch] text-lead text-ink">{t("about.bio")}</p>
          <p className="mt-4 text-body text-muted">
            {t("about.location")}. {t("about.university")}.
          </p>

          <h3 className="mt-14 text-lead font-semibold text-ink">{t("about.skillsTitle")}</h3>
          <div className="mt-6 flex flex-col gap-6">
            {groups.map((group) => (
              <div key={group}>
                <p className="text-small text-muted">{t(`skills.${group}`)}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === group)
                    .map((skill) => (
                      <SkillChip key={skill.name} skill={skill} />
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 id="certificates" className="mt-14 text-lead font-semibold text-ink">
            {t("about.certificatesTitle")}
          </h3>
          <ul className="mt-6 flex flex-col gap-2">
            {certificates.map((cert) => (
              <li key={cert.title} className="reveal">
                <a
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-lg bg-surface px-5 py-4 transition-colors hover:bg-surface-hover"
                >
                  <span className="text-body text-ink">
                    {cert.title}
                    <span className="sr-only"> ({t("about.viewCertificate")})</span>
                  </span>
                  <span className="flex items-center gap-3 text-small text-muted">
                    {cert.institution}, {cert.hours}h
                    <BsArrowUpRight aria-hidden="true" className="transition-colors group-hover:text-ink" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
