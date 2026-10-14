"use client";

import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/content/social";
import { BsGithub, BsLinkedin, BsInstagram, BsEnvelope } from "react-icons/bs";
import { useLanguage } from "@/i18n/LanguageContext";

const socials = [
  { href: SOCIAL_LINKS.github, icon: BsGithub, label: "GitHub" },
  { href: SOCIAL_LINKS.linkedin, icon: BsLinkedin, label: "LinkedIn" },
  { href: SOCIAL_LINKS.instagram, icon: BsInstagram, label: "Instagram" },
  { href: `mailto:${CONTACT_EMAIL}`, icon: BsEnvelope, label: "Email" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-4 flex flex-wrap items-center justify-between gap-6">
      <p className="text-small text-muted">
        © {new Date().getFullYear()} {t("footer.copyright")}
      </p>
      <ul className="flex gap-2">
        {socials.map(({ href, icon: Icon, label }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
            >
              <Icon size={18} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
