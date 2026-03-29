"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { experience } from "@/data/experience";
import { skills, type Skill } from "@/data/skills";
import FadeUp from "@/components/motion/FadeUp";
import FadeLeft from "@/components/motion/FadeLeft";
import Marquee from "@/components/ui/Marquee/Marquee";
import { BsGeoAlt } from "react-icons/bs";
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

/* ─── Icon config for skill pills ─── */
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

/* ─── Sidebar mini-nav items ─── */
const sidebarLinks = [
  { key: "intro", id: "about-section" },
  { key: "experience", id: "experience-section" },
  { key: "skills", id: "skills-section" },
];

/* ─── Skill Pill ─── */
function SkillPill({ skill }: { skill: Skill }) {
  const Icon = iconConfig[skill.icon];

  return (
    <div
      className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-ios-glass-solid border border-ios-border backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[var(--brand)]/40 hover:shadow-[0_0_20px_var(--brand-glow)]"
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
          width={28}
          height={28}
          className="object-contain grayscale brightness-200 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100"
        />
      ) : Icon ? (
        <Icon className="w-7 h-7 text-white/60 transition-colors duration-300 group-hover:text-[var(--brand)]" />
      ) : null}
      <span className="text-sm font-medium text-white/80 whitespace-nowrap transition-colors duration-300 group-hover:text-white">
        {skill.name}
      </span>
    </div>
  );
}

/* ─── Section Title (Arthur style with | bar) ─── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl md:text-2xl font-bold text-ios-accent mb-6 flex items-center gap-2">
      <span className="text-ios-accent">|</span> {children}
    </h3>
  );
}

/* ─── Main About Component ─── */
export default function About() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("about-section");

  useEffect(() => {
    const onScroll = () => {
      for (let i = sidebarLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(sidebarLinks[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sidebarLinks[i].id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const languages = skills.filter((s) => s.category === "languages");
  const frameworks = skills.filter((s) => s.category === "frameworks");
  const infra = skills.filter((s) => s.category === "infra");

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Content parallax — moves slightly slower than scroll
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);

  return (
    <section ref={sectionRef} className="relative w-full max-w-[1200px] mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
        {/* ── Sidebar ── */}
        <aside className="lg:sticky lg:top-[30vh] lg:self-start shrink-0 w-full lg:w-[260px]">
          <div className="flex flex-col items-center text-center">
            {/* Photo */}
            <div className="[perspective:800px] mb-4">
              <div className="transition-transform duration-500 hover:[transform:rotateY(5deg)_rotateX(2deg)]">
                <Image
                  src="/images/profile/thumbnail_Image.jpeg"
                  alt="Paulo Guilherme"
                  width={180}
                  height={180}
                  className="rounded-2xl object-cover border-2 border-ios-border shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                />
              </div>
            </div>

            {/* Name + Location */}
            <p className="text-lg font-bold text-white">Paulo Guilherme</p>
            <span className="flex items-center gap-1 text-sm text-ios-text-secondary mt-1">
              <BsGeoAlt size={12} className="text-ios-accent" />
              {t("about.location")}
            </span>

            {/* Divider */}
            <div className="w-full h-px bg-ios-border my-5" />

            {/* Mini-nav */}
            <nav className="flex flex-row lg:flex-col gap-1 w-full">
              {sidebarLinks.map(({ key, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer border-none text-left w-full ${
                    activeSection === id
                      ? "bg-ios-accent/10 text-ios-accent"
                      : "text-ios-text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      activeSection === id ? "bg-ios-accent" : "bg-ios-text-secondary/40"
                    }`}
                  />
                  {t(`about.sidebar.${key}`)}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Content ── */}
        <motion.div className="flex-1 min-w-0" style={{ y: contentY }}>
          {/* ─── Introdução ─── */}
          <div id="about-section" className="mb-16 scroll-mt-24">
            <FadeUp>
              <SectionTitle>{t("about.introTitle")}</SectionTitle>

              <p className="text-ios-text-secondary text-base leading-relaxed mb-2">
                {t("about.rolePrefix")}{" "}
                <span className="font-semibold text-ios-accent">{t("about.roleHighlight")}</span>
              </p>

              <p className="text-ios-text-secondary text-base leading-relaxed mb-5">
                {t("about.bio")}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-ios-text-secondary border border-ios-border rounded-full px-3 py-1.5">
                  {t("about.location")}
                </span>
              </div>
            </FadeUp>
          </div>

          {/* ─── Experiência ─── */}
          <div id="experience-section" className="mb-16 scroll-mt-24">
            <FadeUp>
              <SectionTitle>{t("about.experienceTitle")}</SectionTitle>
            </FadeUp>

            <div className="relative pl-[30px]">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-ios-border" />

              {experience.map((entry, i) => {
                const te = {
                  dateRange: t(`experience.entries.${i}.dateRange`) !== `experience.entries.${i}.dateRange`
                    ? t(`experience.entries.${i}.dateRange`) : entry.dateRange,
                  title: t(`experience.entries.${i}.title`) !== `experience.entries.${i}.title`
                    ? t(`experience.entries.${i}.title`) : entry.title,
                  company: t(`experience.entries.${i}.company`) !== `experience.entries.${i}.company`
                    ? t(`experience.entries.${i}.company`) : entry.company,
                  description: t(`experience.entries.${i}.description`) !== `experience.entries.${i}.description`
                    ? t(`experience.entries.${i}.description`) : entry.description,
                };

                return (
                  <FadeLeft key={entry.dateRange} delay={i * 100}>
                    <div className="relative mb-8 p-6 bg-ios-glass-solid backdrop-blur-[20px] border border-ios-border rounded-[20px] transition-all duration-300 hover:bg-ios-glass-hover hover:-translate-y-[3px] hover:border-white/20">
                      <div className="absolute -left-[35px] top-[25px] w-3 h-3 rounded-full bg-ios-accent border-[3px] border-ios-bg z-[1]" />

                      <div className="text-[11px] text-ios-text-secondary uppercase tracking-wider mb-1">
                        {te.company}
                      </div>
                      <div className="text-lg font-semibold text-white mb-0.5">
                        {te.title}
                      </div>
                      <div className="text-xs text-ios-accent font-medium mb-3">
                        {te.dateRange}
                      </div>

                      {entry.bullets.length > 0 && (
                        <ul className="space-y-1.5 mb-4">
                          {entry.bullets.map((bullet, bi) => {
                            const tb = t(`experience.entries.${i}.bullets.${bi}`);
                            return (
                              <li key={bi} className="flex items-start gap-2 text-sm text-ios-text-secondary">
                                <span className="text-ios-accent mt-1 shrink-0">•</span>
                                {tb !== `experience.entries.${i}.bullets.${bi}` ? tb : bullet}
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {entry.techBadges.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {entry.techBadges.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] text-ios-text-secondary border border-ios-border rounded-full px-2.5 py-0.5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </FadeLeft>
                );
              })}
            </div>
          </div>

          {/* ─── Expertise Técnica ─── */}
          <div id="skills-section" className="scroll-mt-24">
            <FadeUp>
              <SectionTitle>{t("about.skillsTitle")}</SectionTitle>
            </FadeUp>

            <div className="flex flex-col gap-8">
              <FadeUp delay={0}>
                <h4 className="text-xs uppercase tracking-wider text-ios-text-secondary mb-3">
                  {t("skills.languages")}
                </h4>
                <Marquee direction="left" speed={35} pauseOnHover>
                  {languages.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} />
                  ))}
                </Marquee>
              </FadeUp>

              <FadeUp delay={100}>
                <h4 className="text-xs uppercase tracking-wider text-ios-text-secondary mb-3">
                  {t("skills.frameworks")}
                </h4>
                <Marquee direction="right" speed={40} pauseOnHover>
                  {frameworks.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} />
                  ))}
                </Marquee>
              </FadeUp>

              <FadeUp delay={200}>
                <h4 className="text-xs uppercase tracking-wider text-ios-text-secondary mb-3">
                  {t("skills.infra")}
                </h4>
                <Marquee direction="left" speed={35} pauseOnHover>
                  {infra.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} />
                  ))}
                </Marquee>
              </FadeUp>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
