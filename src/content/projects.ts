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
  {
    title: "Minha Estante",
    description:
      "Personal book collection manager with Google Books integration, search, analytics and localStorage persistence.",
    details:
      "A personal library management system that lets users catalog, organize, and analyze their book collections. Features include multi-criteria search by title, author or ISBN, automatic metadata import via Google Books API, price tracking, collection statistics with visual charts, and browser-based persistence via localStorage.",
    tech: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Recharts", "Google Books API"],
    githubUrl: "https://github.com/albavxs/Controle-pessoal-de-livros",
    deployUrl: "https://controle-pessoal-de-livros.vercel.app/",
    screenshot: "/images/screenshots/minhaEstante.png",
  },
];
