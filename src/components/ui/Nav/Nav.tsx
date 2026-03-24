"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Skills", id: "skills-section" },
  { label: "Projects", id: "projects-section" },
  { label: "Experience", id: "experience-section" },
  { label: "About", id: "about-section" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);

      // Find active section
      for (let i = links.length - 1; i >= 0; i--) {
        const el = document.getElementById(links[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActive(links[i].id);
            return;
          }
        }
      }
      setActive("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[1000] backdrop-blur-[20px] bg-ios-glass-solid/80 border border-ios-border rounded-full px-2 py-1.5 flex gap-1 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      {links.map(({ label, id }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer border-none ${
            active === id
              ? "bg-white/10 text-white"
              : "text-ios-text-secondary hover:text-white hover:bg-white/5"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
