"use client";

import { experience } from "@/content/experience";
import { useLanguage } from "@/i18n/LanguageContext";
import Section from "@/shared/ui/Section";
import Tag from "@/shared/ui/Tag";

export default function Experience() {
  const { t } = useLanguage();

  const tr = (i: number, field: string, fallback: string) => {
    const key = `experience.entries.${i}.${field}`;
    const value = t(key);
    return value !== key ? value : fallback;
  };

  return (
    <Section id="experience-section" title={t("experience.sectionTitle")}>
      <ol className="flex flex-col gap-12 sm:gap-14">
        {experience.map((entry, i) => (
          <li key={entry.dateRange + entry.title} className="reveal grid gap-2 md:grid-cols-[220px_1fr] md:gap-10">
            <p className="text-small text-muted tabular-nums md:pt-1">{tr(i, "dateRange", entry.dateRange)}</p>

            <div>
              <h3 className="text-lead font-semibold text-ink">{tr(i, "title", entry.title)}</h3>
              <p className="text-body text-muted">{tr(i, "company", entry.company)}</p>
              <p className="mt-3 max-w-[65ch] text-body text-ink">{tr(i, "description", entry.description)}</p>

              {entry.bullets.length > 0 && (
                <details className="group mt-4">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-small text-accent hover:text-ink [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">{t("experience.showDetails")}</span>
                    <span className="hidden group-open:inline">{t("experience.hideDetails")}</span>
                    <span aria-hidden="true" className="transition-transform group-open:rotate-180">⌄</span>
                  </summary>
                  <ul className="mt-4 flex max-w-[65ch] list-disc flex-col gap-2 pl-5 text-body text-muted marker:text-muted">
                    {entry.bullets.map((bullet, bi) => (
                      <li key={bi}>{tr(i, `bullets.${bi}`, bullet)}</li>
                    ))}
                  </ul>
                </details>
              )}

              {entry.techBadges.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.techBadges.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
