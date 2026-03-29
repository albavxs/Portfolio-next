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
    tech: ["TypeScript", "React", "CSS Modules", "Storybook"],
    githubUrl: "https://github.com/albavxs/AlgoriUI",
    deployUrl: "https://algori-ui.vercel.app/",
    screenshot: "/images/screenshots/AlgoriUI.png",
  },
  {
    title: "SharkType",
    description:
      "Typing platform focused on tech stacks with 'inverted questions' that teach while you type.",
    details:
      "A typing practice platform with the unique focus on technology stacks. Uses the 'inverted question' concept to teach while the user practices. Under active development, with plans for gamification, leaderboard, and progression system.",
    tech: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/albavxs/sharktype",
    deployUrl: "https://shark-type-io.vercel.app/",
    screenshot: "/images/screenshots/sharktype.png",
  },
];
