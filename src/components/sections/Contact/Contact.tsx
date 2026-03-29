"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import { BsEnvelope, BsTelephoneFill } from "react-icons/bs";
import FadeUp from "@/components/motion/FadeUp";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact-section"
      className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24"
    >
      <FadeUp>
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ios-text mb-4">
            {t("contact.sectionTitle")}
          </h2>
          <p className="text-ios-text-secondary text-base max-w-[600px] mx-auto leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={100}>
        <div className="w-full max-w-full sm:max-w-[700px] mx-auto">
          {/* Contact card */}
          <div className="rounded-2xl border border-ios-border bg-ios-glass backdrop-blur-xl overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-ios-border">
              <span className="text-sm font-medium text-ios-text">
                {t("contact.contactInfo")}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-ios-accent">
                {t("contact.available")}
                <span className="w-2 h-2 rounded-full bg-ios-accent animate-pulse" />
              </span>
            </div>

            {/* Contact buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-5">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-ios-glass-solid border border-ios-border transition-all duration-300 hover:bg-ios-glass-hover hover:border-white/20 hover:scale-[1.02] group"
              >
                <BsTelephoneFill size={16} className="text-ios-text-secondary group-hover:text-[#25D366] transition-colors" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-ios-text-secondary uppercase tracking-wider">
                    {t("contact.phone")}
                  </span>
                  <span className="text-xs text-ios-text font-medium">
                    (21) 96494-3769
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-ios-glass-solid border border-ios-border transition-all duration-300 hover:bg-ios-glass-hover hover:border-white/20 hover:scale-[1.02] group"
              >
                <BsEnvelope size={16} className="text-ios-text-secondary group-hover:text-ios-accent transition-colors" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-ios-text-secondary uppercase tracking-wider">
                    {t("contact.email")}
                  </span>
                  <span className="text-xs text-ios-text font-medium">
                    {CONTACT_EMAIL}
                  </span>
                </div>
              </a>
            </div>

            {/* Map embed */}
            <div className="px-4 pb-4 sm:px-5 sm:pb-5">
              <div className="rounded-xl overflow-hidden border border-ios-border h-[180px] sm:h-[250px] map-reveal">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117533.2!2d-43.2736!3d-22.9068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bde559108a05b%3A0x50dc426c672fd24e!2sRio%20de%20Janeiro%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rio de Janeiro, RJ"
                />
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
