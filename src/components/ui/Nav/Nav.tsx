"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BsHouse,
  BsPerson,
  BsFolder,
  BsEnvelope,
  BsGeoAlt,
  BsList,
  BsXLg,
} from "react-icons/bs";
import type { IconType } from "react-icons";

const linkKeys: { key: string; id: string; icon: IconType }[] = [
  { key: "home", id: "hero-section", icon: BsHouse },
  { key: "about", id: "about-section", icon: BsPerson },
  { key: "projects", id: "projects-section", icon: BsFolder },
  { key: "contact", id: "contact-section", icon: BsEnvelope },
];

export default function Nav() {
  const [active, setActive] = useState("hero-section");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const activeLink = linkKeys.find(({ id }) => id === active) ?? linkKeys[0];
  const ActiveIcon = activeLink.icon;
  const isPtBr = lang === "pt-br";

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
    setMobileOpen(false);
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
    setLang(isPtBr ? "en" : "pt-br");
  };

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-[1000] backdrop-blur-[20px] bg-ios-glass-solid/80 border border-ios-border rounded-full px-2 py-1.5 gap-0.5 transition-all duration-500">
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

      {/* Mobile topbar */}
      <div className="sm:hidden fixed inset-x-0 top-0 z-[1000] px-3 pt-3">
        <div className="rounded-[26px] border border-white/12 bg-ios-glass-solid/90 shadow-[0_24px_60px_rgba(0,0,0,0.38)] ring-1 ring-white/8 backdrop-blur-[24px]">
          <div className="flex items-center gap-2 p-2">
            <div className="min-w-0 flex-1 rounded-[20px] border border-white/8 bg-white/[0.03] px-3 py-2.5">
              <div className="flex items-center gap-2 text-[11px] font-medium text-white">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/55" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="truncate">{t("contact.available")}</span>
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-ios-text-secondary">
                <BsGeoAlt size={11} className="shrink-0 text-ios-accent" />
                <span className="truncate">{t("about.location")}</span>
              </div>
            </div>

            <button
              onClick={toggleLang}
              aria-label={isPtBr ? "Switch to English" : "Mudar para português"}
              className="flex h-11 min-w-11 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.05] px-3 text-xs font-semibold text-ios-accent transition-all duration-300 active:scale-95"
            >
              {isPtBr ? "EN" : "PT"}
            </button>

            <button
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={
                mobileOpen
                  ? isPtBr
                    ? "Fechar menu de navegação"
                    : "Close navigation menu"
                  : isPtBr
                    ? "Abrir menu de navegação"
                    : "Open navigation menu"
              }
              className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.05] text-white transition-all duration-300 active:scale-95"
            >
              {mobileOpen ? <BsXLg size={16} /> : <BsList size={18} />}
            </button>
          </div>

          {mobileOpen && (
            <div className="animate-[slideDown_0.22s_ease-out] px-2 pb-2">
              <div className="mb-2 flex items-center justify-between rounded-[20px] border border-white/8 bg-white/[0.03] px-3 py-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-ios-text-secondary/80">
                  {isPtBr ? "Seção atual" : "Current section"}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-white">
                  <ActiveIcon size={12} className="text-ios-accent" />
                  {t(`nav.${activeLink.key}`)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {linkKeys.map(({ key, id, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex items-center gap-2 rounded-[20px] border px-3.5 py-3 text-xs font-medium transition-all duration-200 cursor-pointer ${
                      active === id
                        ? "border-ios-accent/35 bg-ios-accent/16 text-white"
                        : "border-white/10 bg-white/[0.04] text-ios-text-secondary"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{t(`nav.${key}`)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
