"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SOCIAL_LINKS } from "@/content/social";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import TypeToOpen from "./TypeToOpen";

const SceneCanvas = dynamic(() => import("./scene/SceneCanvas"), { ssr: false });

export default function Hero() {
  const { lang, t } = useLanguage();
  const resumeUrl = lang === "en" ? "/resume/PauloGuilherme_CV_EN.docx" : "/resume/PauloGuilherme_CV_PTBR.docx";
  const sceneRef = useRef<HTMLDivElement>(null);

  /* A cena 3D some aos poucos conforme a página rola, e para de renderizar quando some */
  useEffect(() => {
    const onScroll = () => {
      if (!sceneRef.current) return;
      const opacity = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.6));
      sceneRef.current.style.opacity = `${opacity}`;
      sceneRef.current.style.visibility = opacity <= 0 ? "hidden" : "visible";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero-section" className="relative w-full overflow-hidden">
      {/* Cena 3D (traços animados, poliedros de vidro e poeira) — só no desktop */}
      <div ref={sceneRef} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <object data="/background.svg" type="image/svg+xml" aria-hidden="true" className="absolute inset-0 h-full w-full" />
        <SceneCanvas />
      </div>

      <div className="relative z-[1] w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-36 lg:min-h-dvh lg:pt-14 lg:pb-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 items-center">
        <div>
          <Image
            src="/images/profile/thumbnail_Image.jpeg"
            alt=""
            width={88}
            height={88}
            priority
            className="mb-8 h-[72px] w-[72px] rounded-full bg-surface object-cover sm:h-[88px] sm:w-[88px]"
          />
          <h1 className="text-display font-semibold text-ink">{t("hero.name")}</h1>
          <p className="mt-6 max-w-[36ch] text-lead text-muted">{t("hero.lead")}</p>

          <div className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="#projects-section"
              className="inline-flex items-center rounded-full bg-accent-strong px-5 sm:px-6 py-3 text-body font-medium text-white transition-colors hover:bg-accent"
            >
              {t("hero.ctaProjects")}
            </a>
            <a
              href={resumeUrl}
              download
              className="inline-flex items-center rounded-full bg-surface px-5 sm:px-6 py-3 text-body font-medium text-ink transition-colors hover:bg-surface-hover"
            >
              {t("hero.downloadCv")}
            </a>
            <span className="flex items-center">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
              >
                <BsGithub size={22} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
              >
                <BsLinkedin size={20} />
              </a>
            </span>
          </div>
        </div>

        <TypeToOpen />
      </div>
    </section>
  );
}
