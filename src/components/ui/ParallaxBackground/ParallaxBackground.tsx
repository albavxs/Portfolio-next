"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function ParallaxBackground() {
  const { scrollYProgress } = useScroll();

  // Each orb moves at a different speed — slow drift creates depth
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Fade in after hero (starts at ~15% scroll, fully visible at ~25%)
  const opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #05050a 0%, #08060f 30%, #0a0814 60%, #07050c 100%)",
        }}
      />

      {/* Orb 1 — large blue, top-left */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full will-change-transform"
        style={{
          y: y1,
          top: "10%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(0, 60, 180, 0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Orb 2 — deep purple, center-right */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          y: y2,
          top: "35%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(80, 20, 140, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Orb 3 — accent glow, bottom-center */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full will-change-transform"
        style={{
          y: y3,
          top: "60%",
          left: "20%",
          background: "radial-gradient(circle, rgba(0, 122, 255, 0.03) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* Orb 4 — warm purple, far bottom */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          y: y1,
          top: "80%",
          right: "15%",
          background: "radial-gradient(circle, rgba(100, 30, 160, 0.05) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </motion.div>
  );
}
