"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { SOCIAL_LINKS } from "@/content/social";
import { BsGithub, BsDiscord } from "react-icons/bs";

export default function Organization() {
  const { t } = useLanguage();

  return (
    <section
      id="community-section"
      className="scroll-mt-16 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16 items-center"
    >
      <div>
        <h2 className="text-heading font-semibold text-ink">{t("org.title")}</h2>
        <p className="mt-5 max-w-[52ch] text-lead text-muted">{t("org.description")}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-body font-medium text-white transition-colors hover:bg-accent"
          >
            <BsDiscord size={18} />
            {t("org.cta")}
          </a>
          <a
            href={SOCIAL_LINKS.orgGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 text-body font-medium text-ink transition-colors hover:bg-surface-hover"
          >
            <BsGithub size={18} />
            {t("org.githubCta")}
          </a>
        </div>
      </div>

      <a
        href={SOCIAL_LINKS.orgGithub}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t("org.title")} · GitHub`}
        className="reveal relative block aspect-[16/10] overflow-hidden rounded-lg bg-surface"
      >
        <Image
          src="/images/screenshots/org.png"
          alt={t("org.imageAlt")}
          fill
          sizes="(max-width: 1024px) 100vw, 680px"
          className="object-cover object-top"
        />
      </a>
    </section>
  );
}
