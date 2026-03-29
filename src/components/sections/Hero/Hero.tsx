"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SOCIAL_LINKS } from "@/lib/constants";
import { BsGithub, BsLinkedin, BsDownload } from "react-icons/bs";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiTailwindcss,
} from "react-icons/si";

const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), {
  ssr: false,
});

const heroTechPills = [
  { Icon: SiReact, color: "#61DAFB", label: "React" },
  { Icon: SiNextdotjs, color: "#FFFFFF", label: "Next.js" },
  { Icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  { Icon: SiNodedotjs, color: "#339933", label: "Node.js" },
  { Icon: SiPython, color: "#3776AB", label: "Python" },
  { Icon: SiDocker, color: "#2496ED", label: "Docker" },
  { Icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind" },
];

function CodeBlock() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[660px] rounded-2xl overflow-hidden border border-ios-border bg-[#0d1117] shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-ios-border">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[11px] text-ios-text-secondary font-mono">
          developer.ts &middot; TypeScript
        </span>
        <span className="text-[10px] text-ios-text-secondary/50 ml-2">
          VSCode
        </span>
      </div>

      <div className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto">
        <div className="text-ios-text-secondary">
          <span className="text-[#ff7b72]">const</span>{" "}
          <span className="text-[#d2a8ff]">FullStackDeveloper</span>{" "}
          <span className="text-[#ff7b72]">=</span>{" "}
          <span className="text-ios-text-secondary">{"{"}</span>
        </div>
        <CodeLine label="name" value={t("hero.codeBlock.name")} />
        <CodeLine label="role" value={t("hero.codeBlock.role")} />
        <CodeLine label="experience" value={t("hero.codeBlock.experience")} />
        <CodeLine label="location" value={t("hero.codeBlock.location")} />
        <div className="pl-6">
          <span className="text-[#79c0ff]">available</span>
          <span className="text-ios-text-secondary">: </span>
          <span className="text-[#28c840]">true</span>
          <span className="text-ios-text-secondary">,</span>
        </div>
        <div className="text-ios-text-secondary">{"}"}</div>

        <div className="mt-4 text-ios-text-secondary">
          <span className="text-[#ff7b72]">const</span>{" "}
          <span className="text-[#d2a8ff]">TechStack</span>{" "}
          <span className="text-[#ff7b72]">=</span>{" "}
          <span className="text-ios-text-secondary">{"{"}</span>
        </div>
        <CodeArray label="frontend" values={["React", "Next.js", "TailwindCSS"]} />
        <CodeArray label="backend" values={["Node.js", "Python", "Express"]} />
        <CodeArray label="database" values={["PostgreSQL", "MongoDB", "Supabase"]} />
        <CodeArray label="tools" values={["Git", "Docker", "Linux"]} />
        <div className="text-ios-text-secondary">{"}"}</div>
      </div>
    </div>
  );
}

function CodeLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="pl-6">
      <span className="text-[#79c0ff]">{label}</span>
      <span className="text-ios-text-secondary">: </span>
      <span className="text-[#a5d6ff]">&quot;{value}&quot;</span>
      <span className="text-ios-text-secondary">,</span>
    </div>
  );
}

function CodeArray({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="pl-6">
      <span className="text-[#79c0ff]">{label}</span>
      <span className="text-ios-text-secondary">: [</span>
      {values.map((v, i) => (
        <span key={v}>
          <span className="text-[#a5d6ff]">&quot;{v}&quot;</span>
          {i < values.length - 1 && <span className="text-ios-text-secondary">, </span>}
        </span>
      ))}
      <span className="text-ios-text-secondary">],</span>
    </div>
  );
}

export default function Hero() {
  const { lang, t } = useLanguage();
  const resumeUrl = lang === "en" ? "/resume/PauloGuilherme_CV_EN-1.pdf" : "/resume/PauloGuilherme_CV_PTBR-1.pdf";
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLObjectElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        contentRef.current.style.opacity = `${Math.max(0, 1 - scrollY / (vh * 0.7))}`;
      }

      const opacity = Math.max(0, 1 - scrollY / (vh * 0.6));
      if (bgRef.current) {
        bgRef.current.style.opacity = `${opacity}`;
        bgRef.current.style.display = opacity <= 0 ? "none" : "";
      }
      if (threeRef.current) {
        threeRef.current.style.opacity = `${opacity}`;
        threeRef.current.style.display = opacity <= 0 ? "none" : "";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative h-dvh w-full flex flex-col justify-center items-center px-4 sm:px-5 overflow-hidden"
    >
      {/* SVG Background — hidden on mobile */}
      <object
        ref={bgRef}
        data="/background.svg"
        type="image/svg+xml"
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full pointer-events-none object-cover transition-opacity duration-100 hidden md:block"
      />

      {/* Animated gradient mesh — mobile only */}
      <div className="absolute inset-0 z-0 md:hidden hero-gradient-mesh" aria-hidden="true" />

      {/* Three.js Layer — hidden on mobile */}
      <div ref={threeRef} className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-100 hidden md:block">
        <SceneCanvas />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[2] w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-9 lg:gap-16 will-change-transform"
      >
        {/* Left column */}
        <div className="flex w-full max-w-[520px] flex-col items-center lg:items-start text-center lg:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-ios-border shadow-lg mb-4 sm:mb-5">
            <Image
              src="/images/profile/thumbnail_Image.jpeg"
              alt="Paulo Guilherme"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-[clamp(32px,7vw,72px)] font-bold text-white leading-none [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]">
            {t("hero.name")}
          </h1>

          <p className="mt-3 max-w-[34ch] text-ios-text-secondary text-sm leading-relaxed sm:mt-4 sm:text-base md:text-lg">
            {t("hero.subtitlePre")}{t("hero.subtitlePre") ? " " : ""}
            <span className="font-semibold text-white">{t("hero.subtitleBold1")}</span>
            {" "}{t("hero.subtitleMid")}{" "}
            <span className="font-semibold text-white">{t("hero.subtitleBold2")}</span>
            {" "}{t("hero.subtitleEnd")}
          </p>

          {/* Buttons */}
          <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-3 sm:mt-7 sm:gap-4 lg:justify-start">
            <a
              href={resumeUrl}
              download
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-ios-glass border border-ios-border text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-ios-glass-hover hover:scale-105"
            >
              <BsDownload size={14} />
              {t("hero.downloadCv")}
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ios-text-secondary text-xs sm:text-sm font-medium transition-all duration-300 hover:text-white"
            >
              <BsGithub size={18} />
              <span className="hidden sm:inline">Github</span>
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ios-text-secondary text-xs sm:text-sm font-medium transition-all duration-300 hover:text-white"
            >
              <BsLinkedin size={18} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>

          {/* Tech pills — mobile only (replaces code block) */}
          <div className="mt-7 flex max-w-[420px] flex-wrap justify-center gap-2 md:hidden lg:justify-start">
            {heroTechPills.map(({ Icon, color, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-xl"
                style={{ boxShadow: `0 10px 30px rgba(0, 0, 0, 0.18), inset 0 0 0 1px ${color}24` }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — code block (desktop only) */}
        <div className="hidden md:block">
          <CodeBlock />
        </div>
      </div>

      {/* Scroll Arrow */}
      <div
        className="bounce-arrow mt-6 sm:mt-8 cursor-pointer transition-transform duration-300 relative z-[2]"
        onClick={scrollToAbout}
      >
        <Image
          src="/images/misc/icons8-down-64.png"
          alt="Scroll down"
          width={36}
          height={36}
        />
      </div>
    </section>
  );
}
