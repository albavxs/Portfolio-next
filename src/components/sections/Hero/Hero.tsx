"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SOCIAL_LINKS } from "@/lib/constants";
import { BsGithub, BsLinkedin, BsDownload } from "react-icons/bs";

const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), {
  ssr: false,
});

function CodeBlock() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[660px] rounded-2xl overflow-hidden border border-ios-border bg-[#0d1117] shadow-2xl">
      {/* Title bar */}
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

      {/* Code content */}
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

        {/* TechStack object */}
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

      // Parallax on hero content — moves up slower
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        contentRef.current.style.opacity = `${Math.max(0, 1 - scrollY / (vh * 0.7))}`;
      }

      // Fade out and hide SVG + Three.js after hero
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
      className="relative h-dvh w-full flex flex-col justify-center items-center px-5 overflow-hidden"
    >
      {/* SVG Background */}
      <object
        ref={bgRef}
        data="/background.svg"
        type="image/svg+xml"
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full pointer-events-none object-cover transition-opacity duration-100"
      />

      {/* Three.js Layer */}
      <div ref={threeRef} className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-100">
        <SceneCanvas />
      </div>

      {/* Content — two columns */}
      <div
        ref={contentRef}
        className="relative z-[2] w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 will-change-transform"
      >
        {/* Left column — avatar + name + subtitle + buttons */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[520px]">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-ios-border shadow-lg mb-5">
            <Image
              src="/images/profile/thumbnail_Image.jpeg"
              alt="Paulo Guilherme"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h1 className="text-[clamp(40px,7vw,72px)] font-bold text-white leading-none [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]">
            {t("hero.name")}
          </h1>

          {/* Subtitle with bold highlights */}
          <p className="text-ios-text-secondary text-base md:text-lg mt-4 leading-relaxed">
            {t("hero.subtitlePre")}{t("hero.subtitlePre") ? " " : ""}
            <span className="font-semibold text-white">{t("hero.subtitleBold1")}</span>
            {" "}{t("hero.subtitleMid")}{" "}
            <span className="font-semibold text-white">{t("hero.subtitleBold2")}</span>
            {" "}{t("hero.subtitleEnd")}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-7">
            <a
              href={resumeUrl}
              download
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ios-glass border border-ios-border text-white text-sm font-medium transition-all duration-300 hover:bg-ios-glass-hover hover:scale-105"
            >
              <BsDownload size={14} />
              {t("hero.downloadCv")}
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ios-text-secondary text-sm font-medium transition-all duration-300 hover:text-white"
            >
              <BsGithub size={18} />
              Github
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ios-text-secondary text-sm font-medium transition-all duration-300 hover:text-white"
            >
              <BsLinkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right column — code block */}
        <div className="hidden md:block">
          <CodeBlock />
        </div>
      </div>

      {/* Scroll Arrow */}
      <div
        className="bounce-arrow mt-8 cursor-pointer transition-transform duration-300 relative z-[2]"
        onClick={scrollToAbout}
      >
        <Image
          src="/images/misc/icons8-down-64.png"
          alt="Scroll down"
          width={40}
          height={40}
        />
      </div>
    </section>
  );
}
