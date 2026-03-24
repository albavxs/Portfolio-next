"use client";

import Image from "next/image";
import FadeUp from "@/components/motion/FadeUp";
import { projects } from "@/data/projects";

const badges = ["Computer Science at IBMR", "Rio de Janeiro, RJ", "Full Stack Developer"];

export default function About() {
  return (
    <section id="about-section" className="w-full flex flex-col items-center">
      <FadeUp>
        <h2 className="text-[32px] font-bold text-white text-center mt-[60px] mb-[30px] md:text-2xl md:mt-10 md:mb-5">
          About Me
        </h2>
      </FadeUp>

      <div className="flex flex-row items-center gap-12 max-w-[800px] w-[90%] mx-auto mb-[100px] max-[768px]:flex-col max-[768px]:text-center">
        {/* Photo */}
        <FadeUp>
          <div className="[perspective:800px] shrink-0">
            <div className="transition-transform duration-500 hover:[transform:rotateY(5deg)_rotateX(2deg)]">
              <Image
                src="/images/profile/thumbnail_Image.jpeg"
                alt="Paulo Guilherme"
                width={220}
                height={220}
                className="rounded-[32px] object-cover border-2 border-ios-border shadow-[0_20px_40px_rgba(0,0,0,0.3)] max-[768px]:w-[160px] max-[768px]:h-[160px]"
              />
            </div>
          </div>
        </FadeUp>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <FadeUp delay={100}>
            <p className="text-2xl font-bold text-white">
              Paulo Guilherme Alves
            </p>
            <p className="text-sm text-ios-text-secondary mt-1">
              Passionate Developer
            </p>
          </FadeUp>

          <FadeUp delay={200}>
            <p className="text-sm text-ios-text-secondary leading-relaxed">
              Transforming ideas into efficient, responsive, and intuitive
              technological solutions.
            </p>
          </FadeUp>

          <FadeUp delay={300}>
            <div className="flex flex-wrap gap-2 max-[768px]:justify-center">
              {badges.map((item) => (
                <span
                  key={item}
                  className="text-xs text-ios-text-secondary border border-ios-border rounded-full px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={400}>
            <div className="flex gap-8 py-2 max-[768px]:justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{projects.length}+</p>
                <p className="text-xs text-ios-text-secondary">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">2+</p>
                <p className="text-xs text-ios-text-secondary">Year Experience</p>
              </div>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
