"use client";

import { experience } from "@/data/experience";
import FadeLeft from "@/components/motion/FadeLeft";

export default function Experience() {
  return (
    <section id="experience-section" className="w-full flex flex-col items-center">
      <h2 className="text-[32px] font-bold text-white text-center mt-[60px] mb-[30px] md:text-2xl md:mt-10 md:mb-5">
        Experience
      </h2>

      <div className="w-[90%] max-w-[800px] mx-auto relative pl-[30px]">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-ios-border" />

        {experience.map((entry, i) => (
          <FadeLeft key={entry.dateRange} delay={i * 100}>
            <div className="relative mb-10 p-5 bg-ios-glass-solid backdrop-blur-[20px] border border-ios-border rounded-[20px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-ios-glass-hover hover:-translate-y-[5px] hover:border-white/20 supports-[backdrop-filter]:bg-ios-glass">
              {/* Timeline dot */}
              <div className="absolute -left-[35px] top-[25px] w-3 h-3 rounded-full bg-ios-accent border-[3px] border-ios-bg z-[1]" />

              <div className="text-xs text-ios-accent font-semibold uppercase mb-1">
                {entry.dateRange}
              </div>
              <div className="text-lg font-semibold mb-1">{entry.title}</div>
              <div className="text-sm text-ios-text-secondary mb-2.5">
                {entry.company}
              </div>
              <p className="text-sm text-ios-text-secondary">
                {entry.description}
              </p>
            </div>
          </FadeLeft>
        ))}
      </div>
    </section>
  );
}
