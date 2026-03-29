"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import ptBr from "@/locales/pt-br.json";
import en from "@/locales/en.json";

type Lang = "pt-br" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, unknown>> = {
  "pt-br": ptBr,
  en: en,
};

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object") {
      if (Array.isArray(current)) {
        const index = parseInt(key, 10);
        if (!isNaN(index) && index < current.length) {
          current = current[index];
          continue;
        }
        return path;
      }
      if (key in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[key];
        continue;
      }
    }
    return path;
  }
  return typeof current === "string" ? current : path;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt-br");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "pt-br" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang === "pt-br" ? "pt-BR" : "en";
  };

  const t = (key: string): string => {
    return getNestedValue(translations[lang] as Record<string, unknown>, key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
