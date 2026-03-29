"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { experience } from "@/data/experience";
import { skills, type Skill } from "@/data/skills";
import FadeUp from "@/components/motion/FadeUp";
import Marquee from "@/components/ui/Marquee/Marquee";
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

const sidebarLinks = [
  { key: "intro", id: "about-section" },
  { key: "experience", id: "experience-section" },
  { key: "certificates", id: "certificates-section" },
  { key: "skills", id: "skills-section" },
];

const certificates = [
  { image: "/images/certificados/175093.jpg", title: "Usabilidade, Dev Web, Mobile e Jogos", institution: "IBMR", tag: "160h" },
  { image: "/images/certificados/1750976520133.jpg", title: "Teoria da Computação e Compiladores", institution: "IBMR", tag: "IA 160h" },
  { image: "/images/certificados/34536.jpg", title: "Azure Cloud Computing com IA", institution: "São Judas / IBMR", tag: "Cloud 30h" },
  { image: "/images/certificados/45645.jpg", title: "Programação de Soluções Computacionais", institution: "IBMR / Oracle Academy", tag: "Oracle 160h" },
  { image: "/images/certificados/4564566.jpg", title: "Sistemas Computacionais e Segurança", institution: "IBMR", tag: "Segurança 160h" },
];

/* ─── Skill Pill with tap-glow on mobile ─── */
function SkillPill({ skill }: { skill: Skill }) {
  const Icon = iconConfig[skill.icon];

  return (
    <div
      className="skill-pill-tap group flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-ios-glass-solid border border-ios-border backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[var(--brand)]/40 hover:shadow-[0_0_20px_var(--brand-glow)]"
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
          className="object-contain grayscale brightness-200 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100 w-6 h-6 sm:w-7 sm:h-7"
        />
      ) : Icon ? (
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white/60 transition-colors duration-300 group-hover:text-[var(--brand)]" />
      ) : null}
      <span className="text-xs sm:text-sm font-medium text-white/80 whitespace-nowrap transition-colors duration-300 group-hover:text-white">
        {skill.name}
      </span>
    </div>
  );
}

/* ─── Certificates Carousel — scroll-hijack desktop, snap-swipe mobile ─── */
function CertificatesCarousel({ title, subtitle }: { title: string; subtitle: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardW = isMobile ? 280 : 380;
  const gap = isMobile ? 16 : 24;
  const totalTrack = certificates.length * cardW + (certificates.length - 1) * gap;
  const maxTranslate = totalTrack - cardW;
  const sectionHeight = totalTrack + 500;

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -maxTranslate]);
  const progressWidth = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  // Mobile: snap carousel
  if (isMobile) {
    return (
      <div>
        <SectionTitle>{title}</SectionTitle>
        <p className="text-ios-text-secondary text-xs mb-4">{subtitle}</p>
        <div className="overflow-x-auto snap-carousel certificates-scroll pb-4 -mx-4">
          <div
            className="flex w-max gap-4"
            style={{ paddingInline: "max(1rem, calc(50vw - 140px))" }}
          >
            {certificates.map((cert, i) => (
              <CertCard key={i} cert={cert} mobile />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop: scroll hijack
  return (
    <div ref={containerRef} className="relative" style={{ height: `${sectionHeight}px` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="mb-6 pl-1">
          <SectionTitle>{title}</SectionTitle>
          <p className="text-ios-text-secondary text-sm">{subtitle}</p>
        </div>

        <motion.div className="flex gap-6" style={{ x }}>
          {certificates.map((cert, i) => (
            <CertCard key={i} cert={cert} />
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <div className="w-full max-w-[400px] h-[4px] bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-ios-accent rounded-full" style={{ width: progressWidth }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CertCard({ cert, mobile }: { cert: typeof certificates[0]; mobile?: boolean }) {
  return (
    <div className={`shrink-0 ${mobile ? "w-[280px] snap-card" : "w-[380px]"} rounded-2xl border border-ios-border bg-ios-glass backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:scale-[1.02]`}>
      <div className="relative w-full aspect-[4/3]">
        <Image src={cert.image} alt={cert.title} fill sizes={mobile ? "280px" : "380px"} className="object-cover" />
      </div>
      <div className={`${mobile ? "p-3" : "p-5"}`}>
        <h4 className={`${mobile ? "text-sm" : "text-base"} font-semibold text-white mb-1 leading-snug`}>{cert.title}</h4>
        <div className="flex items-center justify-between">
          <span className={`${mobile ? "text-xs" : "text-sm"} text-ios-text-secondary`}>{cert.institution}</span>
          <span className="text-[11px] text-ios-accent border border-ios-accent/30 rounded-full px-2.5 py-0.5 font-medium">{cert.tag}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Section Title ─── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ios-accent mb-4 sm:mb-6 flex items-center gap-2">
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
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);

  return (
    <section ref={sectionRef} className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
        {/* ── Sidebar ── */}
        <aside className="lg:sticky lg:top-[30vh] lg:self-start shrink-0 w-full lg:w-[260px]">
          <div className="flex flex-col items-center text-center">
            <div className="[perspective:800px] mb-4">
              <div className="transition-transform duration-500 hover:[transform:rotateY(5deg)_rotateX(2deg)]">
                <Image
                  src="/images/profile/thumbnail_Image.jpeg"
                  alt="Paulo Guilherme"
                  width={180}
                  height={180}
                  className="rounded-2xl object-cover border-2 border-ios-border shadow-[0_20px_40px_rgba(0,0,0,0.3)] w-[140px] h-[140px] sm:w-[180px] sm:h-[180px]"
                />
              </div>
            </div>

            <p className="text-base sm:text-lg font-bold text-white">Paulo Guilherme</p>
            <span className="flex items-center gap-1 text-sm text-ios-text-secondary mt-1">
              <BsGeoAlt size={12} className="text-ios-accent" />
              {t("about.location")}
            </span>

            <div className="w-full h-px bg-ios-border my-4 sm:my-5" />

            {/* Mini-nav with animated indicator */}
            <nav className="flex flex-row lg:flex-col gap-2 w-full overflow-x-auto pb-1">
              {sidebarLinks.map(({ key, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  aria-current={activeSection === id ? "page" : undefined}
                  className={`group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-full lg:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer border text-left whitespace-nowrap ${
                    activeSection === id
                      ? "bg-ios-accent/12 text-white border-ios-accent/30 shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
                      : "text-ios-text-secondary border-white/8 bg-white/[0.03] hover:text-white hover:bg-white/5 hover:border-white/14"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
                      activeSection === id
                        ? "h-1.5 w-5 rounded-full bg-ios-accent"
                        : "bg-ios-text-secondary/40 group-hover:bg-white/60"
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
          {/* ─── Sobre Mim ─── */}
          <div id="about-section" className="mb-12 sm:mb-16 scroll-mt-24">
            <FadeUp>
              <SectionTitle>{t("about.introTitle")}</SectionTitle>

              <p className="text-ios-text-secondary text-sm sm:text-base leading-relaxed mb-2">
                {t("about.rolePrefix")}{" "}
                <span className="font-semibold text-ios-accent">{t("about.roleHighlight")}</span>
              </p>

              <p className="text-ios-text-secondary text-sm sm:text-base leading-relaxed mb-5">
                {t("about.bio")}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-ios-text-secondary border border-ios-border rounded-full px-3 py-1.5">
                  {t("about.location")}
                </span>
              </div>
            </FadeUp>
          </div>

          {/* Divider */}
          <div className="section-divider mb-12 sm:mb-16" />

          {/* ─── Experiência ─── */}
          <div id="experience-section" className="mb-12 sm:mb-16 scroll-mt-24">
            <FadeUp>
              <SectionTitle>{t("about.experienceTitle")}</SectionTitle>
            </FadeUp>

            <div className="relative pl-5 sm:pl-[30px]">
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
                  <motion.div
                    key={entry.dateRange}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="relative mb-6 sm:mb-8 p-4 sm:p-6 bg-ios-glass-solid backdrop-blur-[20px] border border-ios-border rounded-2xl sm:rounded-[20px] transition-all duration-300 hover:bg-ios-glass-hover hover:-translate-y-[3px] hover:border-white/20">
                      <div className="absolute -left-[26px] sm:-left-[35px] top-[20px] sm:top-[25px] w-3 h-3 rounded-full bg-ios-accent border-[3px] border-ios-bg z-[1]" />

                      <div className="text-[11px] text-ios-text-secondary uppercase tracking-wider mb-1">
                        {te.company}
                      </div>
                      <div className="text-base sm:text-lg font-semibold text-white mb-0.5">
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
                              <li key={bi} className="flex items-start gap-2 text-xs sm:text-sm text-ios-text-secondary">
                                <span className="text-ios-accent mt-0.5 shrink-0">•</span>
                                {tb !== `experience.entries.${i}.bullets.${bi}` ? tb : bullet}
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {entry.techBadges.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {entry.techBadges.map((tech) => (
                            <span key={tech} className="text-[10px] sm:text-[11px] text-ios-text-secondary border border-ios-border rounded-full px-2 sm:px-2.5 py-0.5">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="section-divider mb-12 sm:mb-16" />

          {/* ─── Certificações ─── */}
          <div id="certificates-section" className="mb-12 sm:mb-16 scroll-mt-24">
            <CertificatesCarousel
              title={t("about.certificatesTitle")}
              subtitle={t("about.certificatesSubtitle")}
            />
          </div>

          {/* Divider */}
          <div className="section-divider mb-12 sm:mb-16" />

          {/* ─── Expertise Técnica ─── */}
          <div id="skills-section" className="scroll-mt-24">
            <FadeUp>
              <SectionTitle>{t("about.skillsTitle")}</SectionTitle>
            </FadeUp>

            <div className="flex flex-col gap-6 sm:gap-8">
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
