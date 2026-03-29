"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BsHouse, BsPerson, BsFolder, BsEnvelope } from "react-icons/bs";
import type { IconType } from "react-icons";

const linkKeys: { key: string; id: string; icon: IconType }[] = [
  { key: "home", id: "hero-section", icon: BsHouse },
  { key: "about", id: "about-section", icon: BsPerson },
  { key: "projects", id: "projects-section", icon: BsFolder },
  { key: "contact", id: "contact-section", icon: BsEnvelope },
];

export default function Nav() {
  const [active, setActive] = useState("hero-section");
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      for (let i = linkKeys.length - 1; i >= 0; i--) {
        const el = document.getElementById(linkKeys[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActive(linkKeys[i].id);
            return;
          }
        }
      }
      setActive("hero-section");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "hero-section") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleLang = () => {
    setLang(lang === "pt-br" ? "en" : "pt-br");
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] backdrop-blur-[20px] bg-ios-glass-solid/80 border border-ios-border rounded-full px-2 py-1.5 flex gap-0.5 transition-all duration-500">
      {linkKeys.map(({ key, id, icon: Icon }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer border-none ${
            active === id
              ? "bg-white/10 text-white"
              : "text-ios-text-secondary hover:text-white hover:bg-white/5"
          }`}
        >
          <Icon size={13} />
          <span className="hidden md:inline">{t(`nav.${key}`)}</span>
        </button>
      ))}

      <div className="w-px h-5 self-center bg-ios-border mx-1" />

      <button
        onClick={toggleLang}
        className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer border-none text-ios-accent hover:bg-white/5"
      >
        {lang === "pt-br" ? "PT" : "EN"}
      </button>
    </nav>
  );
}
