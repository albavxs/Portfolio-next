"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { skills, type Skill } from "@/content/skills";
import { certificates, type Certificate } from "@/content/certificates";
import Marquee from "@/shared/ui/Marquee";
import { BsGeoAlt } from "react-icons/bs";
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

const groups: { key: Skill["category"]; direction: "left" | "right"; speed: number }[] = [
  { key: "languages", direction: "left", speed: 38 },
  { key: "frameworks", direction: "right", speed: 32 },
  { key: "infra", direction: "left", speed: 40 },
];

const sidebarLinks = [
  { key: "intro", id: "about-section" },
  { key: "skills", id: "stack" },
  { key: "certificates", id: "certificates" },
];

/* ─── Skill: ícone em cinza que acende na cor da marca, com brilho ─── */
function SkillPill({ skill }: { skill: Skill }) {
  const Icon = iconConfig[skill.icon];

  return (
    <div
      title={skill.description}
      className="skill-pill group flex shrink-0 items-center gap-3 rounded-full bg-surface py-2.5 pl-3.5 pr-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-hover hover:shadow-[0_0_0_1px_var(--brand-ring),0_0_28px_var(--brand-glow)]"
      style={{
        ["--brand" as string]: skill.brandColor,
        ["--brand-ring" as string]: `${skill.brandColor}66`,
        ["--brand-glow" as string]: `${skill.brandColor}33`,
      }}
    >
      {skill.icon.startsWith("/") ? (
        <Image
          src={skill.icon}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain grayscale brightness-200 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100 pointer-coarse:grayscale-0 pointer-coarse:brightness-100"
        />
      ) : Icon ? (
        <Icon className="h-6 w-6 text-muted transition-colors duration-300 group-hover:text-[var(--brand)] pointer-coarse:text-[var(--brand)]" />
      ) : null}
      <span className="whitespace-nowrap text-body text-ink">{skill.name}</span>
    </div>
  );
}

function CertCard({ cert, mobile = false }: { cert: Certificate; mobile?: boolean }) {
  const { t } = useLanguage();

  return (
    <a
      href={cert.image}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block shrink-0 overflow-hidden rounded-lg bg-surface transition-all duration-300 hover:bg-surface-hover hover:-translate-y-1 ${
        mobile ? "snap-card w-[78vw] max-w-[320px]" : "w-[400px]"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        <Image
          src={cert.image}
          alt={`${t("about.viewCertificate")}: ${cert.title}`}
          fill
          sizes={mobile ? "320px" : "400px"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <p className="text-body font-medium text-ink">{cert.title}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-small text-muted">{cert.institution}</span>
          <span className="shrink-0 rounded-full bg-accent/15 px-3 py-0.5 text-small font-medium text-accent">
            {cert.hours}h
          </span>
        </div>
      </div>
    </a>
  );
}

/* ─── Certificados: rolagem lateral presa à página no desktop, swipe no celular ─── */
function Certificates({ title }: { title: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  const cardW = 400;
  const gap = 24;
  const total = certificates.length * cardW + (certificates.length - 1) * gap;
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -(total - cardW)]);
  const progress = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <div id="certificates" className="scroll-mt-20">
      {/* Desktop */}
      <div ref={trackRef} className="relative hidden md:block" style={{ height: total + 400 }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <h3 className="text-heading font-semibold text-ink">{title}</h3>
          <motion.div className="mt-8 flex gap-6" style={{ x }}>
            {certificates.map((cert) => (
              <CertCard key={cert.title} cert={cert} />
            ))}
          </motion.div>
          <div className="mt-8 h-1 w-full max-w-[400px] overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-accent" style={{ width: progress }} />
          </div>
        </div>
      </div>

      {/* Celular */}
      <div className="md:hidden">
        <h3 className="text-heading font-semibold text-ink">{title}</h3>
        <div className="snap-carousel -mx-4 mt-6 overflow-x-auto pb-2">
          <div className="flex w-max gap-4 px-4">
            {certificates.map((cert) => (
              <CertCard key={cert.title} cert={cert} mobile />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const [active, setActive] = useState("about-section");

  useEffect(() => {
    const onScroll = () => {
      for (let i = sidebarLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(sidebarLinks[i].id);
        if (el && el.getBoundingClientRect().top <= 240) {
          setActive(sidebarLinks[i].id);
          return;
        }
      }
      setActive("about-section");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="about-section" className="scroll-mt-16 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
        {/* ── Perfil fixo ── */}
        <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-[260px]">
          <div className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-lg bg-surface">
            <Image src="/images/screenshots/pege.jpeg" alt="Paulo Guilherme" fill sizes="260px" className="object-cover" />
          </div>
          <p className="mt-5 text-lead font-semibold text-ink">Paulo Guilherme</p>
          <p className="mt-1 flex items-center gap-1.5 text-body text-muted">
            <BsGeoAlt size={14} className="text-accent" />
            {t("about.location")}
          </p>

          <nav className="mt-6 hidden lg:flex flex-col gap-1" aria-label={t("about.introTitle")}>
            {sidebarLinks.map(({ key, id }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`flex items-center gap-3 rounded-full px-4 py-2 text-body transition-colors ${
                  active === id ? "bg-accent/15 text-ink" : "text-muted hover:text-ink hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === id ? "w-5 bg-accent" : "w-1.5 bg-muted/50"
                  }`}
                />
                {t(`about.sidebar.${key}`)}
              </a>
            ))}
          </nav>
        </aside>

        {/* ── Conteúdo ── */}
        <div className="min-w-0 flex-1">
          <h2 className="text-heading font-semibold text-ink">{t("about.introTitle")}</h2>
          <p className="mt-6 max-w-[60ch] text-lead text-ink">{t("about.bio")}</p>
          <p className="mt-4 text-body text-muted">{t("about.university")}</p>

          <div id="stack" className="mt-20 scroll-mt-20">
            <h3 className="text-heading font-semibold text-ink">{t("about.skillsTitle")}</h3>
            <div className="mt-8 flex flex-col gap-8">
              {groups.map(({ key, direction, speed }) => {
                const list = skills.filter((s) => s.category === key);
                return (
                  <div key={key}>
                    <p className="text-small text-muted">{t(`skills.${key}`)}</p>
                    <div className="mt-3 hidden md:block">
                      <Marquee direction={direction} speed={speed}>
                        {/* Grupos curtos se repetem para a faixa não abrir buraco */}
                        {(list.length < 6 ? [...list, ...list] : list).map((skill, i) => (
                          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
                        ))}
                      </Marquee>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 md:hidden">
                      {list.map((skill) => (
                        <SkillPill key={skill.name} skill={skill} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-20">
            <Certificates title={t("about.certificatesTitle")} />
          </div>
        </div>
      </div>
    </section>
  );
}
