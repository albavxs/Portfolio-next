"use client";

import { experience } from "@/data/experience";
import { useLanguage } from "@/contexts/LanguageContext";
import FadeLeft from "@/components/motion/FadeLeft";
import FadeUp from "@/components/motion/FadeUp";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience-section" className="w-full flex flex-col items-center px-6 py-24">
      <FadeUp>
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          {t("experience.sectionTitle")}
        </h2>
      </FadeUp>

      <div className="w-full max-w-[800px] mx-auto relative pl-[30px]">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-ios-border" />

        {experience.map((entry, i) => {
          const translatedEntry = {
            dateRange: t(`experience.entries.${i}.dateRange`) !== `experience.entries.${i}.dateRange`
              ? t(`experience.entries.${i}.dateRange`)
              : entry.dateRange,
            title: t(`experience.entries.${i}.title`) !== `experience.entries.${i}.title`
              ? t(`experience.entries.${i}.title`)
              : entry.title,
            company: t(`experience.entries.${i}.company`) !== `experience.entries.${i}.company`
              ? t(`experience.entries.${i}.company`)
              : entry.company,
            description: t(`experience.entries.${i}.description`) !== `experience.entries.${i}.description`
              ? t(`experience.entries.${i}.description`)
              : entry.description,
          };

          return (
            <FadeLeft key={entry.dateRange} delay={i * 100}>
              <div className="relative mb-8 p-6 bg-ios-glass-solid backdrop-blur-[20px] border border-ios-border rounded-[20px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-ios-glass-hover hover:-translate-y-[5px] hover:border-white/20 supports-[backdrop-filter]:bg-ios-glass">
                {/* Timeline dot */}
                <div className="absolute -left-[35px] top-[25px] w-3 h-3 rounded-full bg-ios-accent border-[3px] border-ios-bg z-[1]" />

                <div className="text-xs text-ios-accent font-semibold uppercase mb-1">
                  {translatedEntry.dateRange}
                </div>
                <div className="text-lg font-semibold text-white mb-1">
                  {translatedEntry.title}
                </div>
                <div className="text-sm text-ios-text-secondary mb-3">
                  {translatedEntry.company}
                </div>
                <p className="text-sm text-ios-text-secondary mb-4">
                  {translatedEntry.description}
                </p>

                {/* Bullet points */}
                {entry.bullets.length > 0 && (
                  <ul className="space-y-1.5 mb-4">
                    {entry.bullets.map((bullet, bi) => {
                      const translatedBullet = t(`experience.entries.${i}.bullets.${bi}`);
                      const displayBullet = translatedBullet !== `experience.entries.${i}.bullets.${bi}`
                        ? translatedBullet
                        : bullet;
                      return (
                        <li key={bi} className="flex items-start gap-2 text-sm text-ios-text-secondary">
                          <span className="text-ios-accent mt-1 shrink-0">•</span>
                          {displayBullet}
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* Tech badges */}
                {entry.techBadges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.techBadges.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] text-ios-accent/80 border border-ios-accent/20 rounded-full px-2.5 py-0.5 font-medium"
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
    </section>
  );
}
