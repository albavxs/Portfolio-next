"use client";

import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import { BsGithub, BsLinkedin, BsInstagram, BsEnvelope } from "react-icons/bs";
import { useLanguage } from "@/contexts/LanguageContext";

const socials = [
  { href: SOCIAL_LINKS.github, icon: BsGithub, label: "GitHub" },
  { href: SOCIAL_LINKS.linkedin, icon: BsLinkedin, label: "LinkedIn" },
  { href: SOCIAL_LINKS.instagram, icon: BsInstagram, label: "Instagram" },
  { href: `mailto:${CONTACT_EMAIL}`, icon: BsEnvelope, label: "Email" },
];

const navKeys = [
  { key: "about", id: "about-section" },
  { key: "projects", id: "projects-section" },
  { key: "contact", id: "contact-section" },
];

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <footer className="w-full flex flex-col items-center pb-10 pt-16">
      <div className="w-[90%] max-w-[600px] mx-auto flex flex-col items-center gap-6">
        {/* Divider */}
        <div className="w-16 h-px bg-ios-border" />

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-4">
          {navKeys.map(({ key, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-xs text-ios-text-secondary hover:text-white transition-colors duration-200 cursor-pointer border-none bg-transparent"
            >
              {t(`nav.${key}`)}
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex gap-5">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="text-ios-text-secondary transition-all duration-300 hover:text-white hover:scale-110"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-ios-text-secondary/50">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
