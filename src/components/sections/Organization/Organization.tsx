"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { SOCIAL_LINKS } from "@/lib/constants";
import FadeUp from "@/components/motion/FadeUp";
import { BsPeopleFill } from "react-icons/bs";

export default function Organization() {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <FadeUp>
        <div className="flex items-center justify-center gap-3 mb-3">
          <BsPeopleFill size={24} className="text-ios-accent" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            {t("org.title")}
          </h2>
        </div>
        <p className="text-ios-text-secondary text-base leading-relaxed max-w-[700px] mx-auto text-center mb-10">
          {t("org.description")}
        </p>
      </FadeUp>

      <FadeUp delay={100}>
        <a
          href={SOCIAL_LINKS.orgGithub}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl border border-ios-border bg-ios-glass backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-1 max-w-[650px] mx-auto"
        >
          <div className="relative w-full aspect-[16/9]">
            <Image
              src="/images/screenshots/org.png"
              alt="Few Soldiers — GitHub Organization"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover object-top"
            />
          </div>
        </a>
      </FadeUp>

      <FadeUp delay={200}>
        <div className="flex justify-center mt-8">
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-ios-glass border border-ios-border text-white text-sm font-medium transition-all duration-300 hover:bg-ios-glass-hover hover:border-white/20 hover:scale-105"
          >
            <BsPeopleFill size={16} />
            {t("org.cta")}
          </a>
        </div>
      </FadeUp>
    </section>
  );
}
