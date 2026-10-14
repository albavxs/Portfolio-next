"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/content/social";
import { BsEnvelope, BsLinkedin, BsGithub, BsWhatsapp, BsCopy, BsCheck2 } from "react-icons/bs";

const secondary = [
  { href: SOCIAL_LINKS.linkedin, icon: BsLinkedin, label: "LinkedIn" },
  { href: SOCIAL_LINKS.github, icon: BsGithub, label: "GitHub" },
  { href: SOCIAL_LINKS.whatsapp, icon: BsWhatsapp, label: "WhatsApp" },
];

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <section id="contact-section" className="scroll-mt-16 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="reveal rounded-lg bg-surface px-6 py-14 sm:px-12 sm:py-20">
        <h2 className="text-display font-semibold text-ink">{t("contact.sectionTitle")}</h2>
        <p className="mt-6 max-w-[52ch] text-lead text-muted">{t("contact.subtitle")}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex min-w-0 items-center gap-3 rounded-full bg-accent-strong px-6 py-3.5 text-body font-medium text-white transition-colors hover:bg-accent"
          >
            <BsEnvelope size={18} className="shrink-0" />
            <span className="truncate">{CONTACT_EMAIL}</span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-5 py-3.5 text-body text-ink transition-colors hover:bg-white/[0.14] cursor-pointer"
          >
            {copied ? <BsCheck2 size={18} /> : <BsCopy size={16} />}
            <span aria-live="polite">{copied ? t("contact.copied") : t("contact.copy")}</span>
          </button>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {secondary.map(({ href, icon: Icon, label }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body text-muted transition-colors hover:text-ink"
              >
                <Icon size={18} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
