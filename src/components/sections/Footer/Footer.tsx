"use client";

import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import { BsGithub, BsLinkedin, BsInstagram, BsEnvelope } from "react-icons/bs";
import FadeUp from "@/components/motion/FadeUp";

const socials = [
  { href: SOCIAL_LINKS.github, icon: BsGithub, label: "GitHub" },
  { href: SOCIAL_LINKS.linkedin, icon: BsLinkedin, label: "LinkedIn" },
  { href: SOCIAL_LINKS.instagram, icon: BsInstagram, label: "Instagram" },
  { href: `mailto:${CONTACT_EMAIL}`, icon: BsEnvelope, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center pb-16 pt-16">
      <FadeUp>
        <div className="w-[90%] max-w-[600px] mx-auto flex flex-col items-center gap-8">
          {/* Divider */}
          <div className="w-16 h-px bg-ios-border" />

          <p className="text-sm text-ios-text-secondary text-center max-w-sm leading-relaxed">
            Interested in working together? Feel free to reach out.
          </p>

          {/* Social icons — floating, no background */}
          <div className="flex gap-6">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="text-ios-text-secondary transition-all duration-300 hover:text-white hover:scale-110 hover:[filter:drop-shadow(0_0_8px_rgba(125,92,56,0.4))]"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <p className="text-xs text-ios-text-secondary/50">
            © 2026 Paulo Guilherme
          </p>
        </div>
      </FadeUp>
    </footer>
  );
}
