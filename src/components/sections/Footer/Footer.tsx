"use client";

import { useState } from "react";
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
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Name and message are required.");
      return;
    }
    setError("");

    const sub = encodeURIComponent(subject || `Contact from ${name}`);
    const body = encodeURIComponent(`Hi Paulo,\n\n${message}\n\n— ${name}`);
    window.open(`mailto:${CONTACT_EMAIL}?subject=${sub}&body=${body}`, "_self");
  };

  return (
    <footer className="w-full flex flex-col items-center pb-16 pt-16">
      <FadeUp>
        <div className="w-[90%] max-w-[600px] mx-auto flex flex-col items-center gap-10">
          {/* Divider */}
          <div className="w-16 h-px bg-ios-border" />

          <p className="text-sm text-ios-text-secondary text-center max-w-sm leading-relaxed">
            Interested in working together? Feel free to reach out.
          </p>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex gap-4 max-[480px]:flex-col">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-white/5 border border-ios-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-ios-text-secondary/50 outline-none transition-all duration-300 focus:border-white/20 focus:bg-white/[0.07]"
              />
              <input
                type="text"
                placeholder="Subject (optional)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 bg-white/5 border border-ios-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-ios-text-secondary/50 outline-none transition-all duration-300 focus:border-white/20 focus:bg-white/[0.07]"
              />
            </div>
            <textarea
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-ios-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-ios-text-secondary/50 outline-none transition-all duration-300 focus:border-white/20 focus:bg-white/[0.07] resize-none"
            />
            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}
            <button
              type="submit"
              className="self-start bg-ios-accent text-white border-none py-2.5 px-6 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-95"
            >
              Send Message
            </button>
          </form>

          {/* Social icons */}
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
