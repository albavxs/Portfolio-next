export interface Project {
  title: string;
  description: string;
  details: string;
  tech: string[];
  githubUrl: string;
  deployUrl?: string;
  screenshot: string;
}

export const projects: Project[] = [
  {
    title: "AlgoriUI",
    description:
      "Open-source platform for learning algorithms interactively and visually, inspired by the book Grokking Algorithms.",
    details:
      "An educational tool that brings algorithms and data structures to life through visual, step-by-step representations. Users can explore sorting algorithms, search trees, linked lists, and more — watching each operation unfold in real time. Built to make CS fundamentals accessible and engaging.",
    tech: ["TypeScript", "React", "Next.js", "CSS Modules", "Storybook"],
    githubUrl: "https://github.com/albavxs/AlgoriUI",
    deployUrl: "https://algori-ui.vercel.app/",
    screenshot: "/images/screenshots/AlgoriUI.png",
  },
  {
    title: "SharkType",
    description:
      "Typing platform for developers with code and text tracks, progression, and an immersive interface.",
    details:
      "A typing practice platform built around real programming content. SharkType lets users train with code snippets and multilingual text tracks, switch difficulty and themes, and track XP, levels, streaks, and session history in an interface enhanced with sound feedback and 3D visuals.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
    githubUrl: "https://github.com/albavxs/SharkType",
    deployUrl: "https://shark-type-io.vercel.app/",
    screenshot: "/images/screenshots/sharktype.png",
  },
];
