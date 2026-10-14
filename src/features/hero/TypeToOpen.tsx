"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const TARGET = 'await portfolio.open("projects")';

/*
 * A "coisa viva" do Hero: o visitante digita uma linha de código, como no SharkType,
 * e ao terminar a página abre os projetos. Sem JavaScript, a linha aparece inteira
 * e o link "Pular para os projetos" faz o mesmo papel.
 */
export default function TypeToOpen() {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [keystrokes, setKeystrokes] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [result, setResult] = useState<{ wpm: number; acc: number } | null>(null);
  useEffect(() => {
    if (!result) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setTimeout(() => {
      inputRef.current?.blur();
      document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1600);
    return () => window.clearTimeout(id);
  }, [result]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (result) return;
    const next = event.target.value.slice(0, TARGET.length);
    const now = performance.now();
    const start = startedAt ?? now;
    if (startedAt === null) setStartedAt(now);

    let added = 0;
    let wrong = 0;
    if (next.length > value.length) {
      added = next.length - value.length;
      for (let i = value.length; i < next.length; i++) {
        if (next[i] !== TARGET[i]) wrong++;
      }
    }
    const totalKeys = keystrokes + added;
    const totalMistakes = mistakes + wrong;
    setKeystrokes(totalKeys);
    setMistakes(totalMistakes);
    setValue(next);

    if (next === TARGET) {
      const minutes = Math.max((now - start) / 60000, 1 / 600);
      setResult({
        wpm: Math.round(TARGET.length / 5 / minutes),
        acc: Math.round(((totalKeys - totalMistakes) / Math.max(totalKeys, 1)) * 100),
      });
    }
  };

  const restart = () => {
    setValue("");
    setKeystrokes(0);
    setMistakes(0);
    setStartedAt(null);
    setResult(null);
    inputRef.current?.focus();
  };

  const doneText = result
    ? t("hero.typing.done").replace("{wpm}", String(result.wpm)).replace("{acc}", String(result.acc))
    : "";

  return (
    <div className="w-full overflow-hidden rounded-lg bg-surface">
      <div className="flex items-center gap-2 bg-white/[0.03] px-5 py-3 sm:px-8">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-small text-muted">portfolio.ts</span>
      </div>
      <div className="p-5 sm:p-8">
        <p className="text-small text-muted">{t("hero.typing.label")}</p>

        <div className="relative mt-5">
          <code
            aria-hidden="true"
            className="block font-mono text-body sm:text-lead leading-relaxed whitespace-pre-wrap"
          >
            {TARGET.split("").map((char, i) => {
              const typed = i < value.length;
              const wrong = typed && value[i] !== char;
              const isCaret = focused && !result && i === value.length;
              return (
                <span
                  key={i}
                  className={`relative ${
                    wrong
                      ? "text-danger underline decoration-2 underline-offset-4"
                      : typed
                        ? "text-ink"
                        : "text-muted"
                  }`}
                >
                  {isCaret && (
                    <span className="type-caret absolute -left-px top-[0.15em] h-[1.1em] w-[2px] bg-accent" />
                  )}
                  {char}
                </span>
              );
            })}
          </code>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label={t("hero.typing.inputLabel")}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="absolute inset-0 h-full w-full cursor-text opacity-0"
          />
        </div>

        <div className="mt-6 flex min-h-[3rem] flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="text-small text-muted" aria-live="polite">
            {result ? (
              doneText
            ) : focused ? null : (
              <>
                <span className="pointer-coarse:hidden">{t("hero.typing.hint")}</span>
                <span className="hidden pointer-coarse:inline">{t("hero.typing.hintTouch")}</span>
              </>
            )}
          </p>
          <div className="flex items-center gap-4">
            {result && (
              <button onClick={restart} className="text-small text-muted hover:text-ink cursor-pointer">
                {t("hero.typing.restart")}
              </button>
            )}
            <a href="#projects-section" className="text-small text-accent hover:text-ink">
              {t("hero.typing.skip")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
