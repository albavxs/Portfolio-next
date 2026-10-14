"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BsList, BsXLg } from "react-icons/bs";

const links = [
  { key: "projects", id: "projects-section" },
  { key: "experience", id: "experience-section" },
  { key: "about", id: "about-section" },
  { key: "contact", id: "contact-section" },
];

/* Barra simples: nome à esquerda, poucos links, idioma. Única superfície com blur da página. */
export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const isPtBr = lang === "pt-br";

  useEffect(() => {
    const onScroll = () => {
      for (let i = links.length - 1; i >= 0; i--) {
        const el = document.getElementById(links[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(links[i].id);
          return;
        }
      }
      setActive("");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => setLang(isPtBr ? "en" : "pt-br");

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero-section" className="text-body font-semibold text-ink" onClick={() => setOpen(false)}>
          Paulo Guilherme
        </a>

        <nav className="hidden sm:flex items-center gap-1" aria-label="Main">
          {links.map(({ key, id }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`rounded-full px-3 py-1.5 text-small transition-colors ${
                active === id ? "text-ink bg-white/[0.08]" : "text-muted hover:text-ink"
              }`}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <button
            onClick={toggleLang}
            aria-label={t("nav.switchLang")}
            className="ml-2 rounded-full px-3 py-1.5 text-small font-semibold text-accent hover:bg-white/[0.06] cursor-pointer"
          >
            {isPtBr ? "EN" : "PT"}
          </button>
        </nav>

        <div className="flex items-center gap-1 sm:hidden">
          <button
            onClick={toggleLang}
            aria-label={t("nav.switchLang")}
            className="flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-small font-semibold text-accent"
          >
            {isPtBr ? "EN" : "PT"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink"
          >
            {open ? <BsXLg size={16} /> : <BsList size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="sm:hidden px-4 pb-4" aria-label="Main">
          <ul className="flex flex-col">
            {links.map(({ key, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-lead ${active === id ? "text-ink" : "text-muted"}`}
                >
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
