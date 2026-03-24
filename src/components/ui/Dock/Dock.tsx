"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/constants";

const dockItems = [
  {
    href: SOCIAL_LINKS.github,
    label: "GitHub",
    icon: "/images/dock/icons8-git-128.png",
  },
  {
    href: SOCIAL_LINKS.linkedin,
    label: "LinkedIn",
    icon: "/images/dock/icons8-linkedin-100.png",
  },
  {
    href: SOCIAL_LINKS.instagram,
    label: "Instagram",
    icon: "/images/dock/icons8-instagram-96.png",
  },
];

export default function Dock() {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    itemRefs.current.forEach((item) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(e.clientX - centerX);
      const scale = Math.max(1, 1.5 - distance / 150);
      item.style.transform = `scale(${scale}) translateY(${(scale - 1) * -10}px)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    itemRefs.current.forEach((item) => {
      if (item) item.style.transform = "";
    });
  }, []);

  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-ios-glass-solid backdrop-blur-[30px] p-2.5 rounded-3xl border border-ios-border flex gap-[15px] z-[1000] shadow-[0_20px_40px_rgba(0,0,0,0.4)] max-[768px]:w-[90%] max-[768px]:justify-around max-[768px]:p-2 max-[768px]:bottom-[15px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {dockItems.map((item, i) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          ref={(el) => { itemRefs.current[i] = el; }}
          className="group relative w-[50px] h-[50px] rounded-xl flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer hover:bg-white/10 max-[768px]:w-[45px] max-[768px]:h-[45px]"
        >
          <Image
            src={item.icon}
            alt={item.label}
            width={30}
            height={30}
          />
          <span className="absolute -top-10 bg-black/80 text-white py-1 px-2.5 rounded-lg text-xs opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap group-hover:opacity-100">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
