"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), {
  ssr: false,
});

export default function Hero() {
  const scrollToSkills = () => {
    document.getElementById("skills-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative h-dvh w-full flex flex-col justify-center items-center text-center px-5 overflow-hidden">
      {/* SVG Background */}
      <object
        data="/background.svg"
        type="image/svg+xml"
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full pointer-events-none object-cover"
      />

      {/* Three.js Layer */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <SceneCanvas />
      </div>

      {/* Content */}
      <div className="relative z-[2]">
        <p className="text-ios-text-secondary text-sm mb-2 tracking-wide">
          Hi, I am Paulo Guilherme.
        </p>
        <h1 className="text-[clamp(40px,8vw,80px)] font-bold text-white leading-none -mt-1 -mb-1 [text-shadow:_0_1px_0_rgba(125,92,56,0.4),_0_2px_0_rgba(125,92,56,0.35),_0_3px_0_rgba(125,92,56,0.3),_0_4px_0_rgba(125,92,56,0.25),_0_5px_0_rgba(125,92,56,0.2),_0_6px_10px_rgba(0,0,0,0.4)]">
          Full Stack
        </h1>
        <h1 className="typing-text text-[clamp(40px,8vw,80px)] font-bold text-ios-text-secondary leading-none -mt-1 [text-shadow:_0_1px_0_rgba(125,92,56,0.25),_0_2px_0_rgba(125,92,56,0.2),_0_3px_0_rgba(125,92,56,0.15),_0_4px_8px_rgba(0,0,0,0.3)]">
          Developer<span className="text-ios-accent">.</span>
        </h1>
      </div>

      {/* Scroll Arrow */}
      <div
        className="bounce-arrow mt-12 cursor-pointer transition-transform duration-300 relative z-[2]"
        onClick={scrollToSkills}
      >
        <Image
          src="/images/misc/icons8-down-64.png"
          alt="Scroll down"
          width={50}
          height={50}
        />
      </div>
    </section>
  );
}
