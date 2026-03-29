export interface Skill {
  name: string;
  icon: string;
  description: string;
  category: "languages" | "frameworks" | "infra";
  brandColor: string;
}

export const skills: Skill[] = [
  // Languages
  {
    name: "JavaScript",
    icon: "/images/skills/icons8-javascript-144.png",
    description: "The language I master the most, learned through courses and deep practice.",
    category: "languages",
    brandColor: "#F7DF1E",
  },
  {
    name: "TypeScript",
    icon: "typescript",
    description: "Type-safe development for scalable and maintainable applications.",
    category: "languages",
    brandColor: "#3178C6",
  },
  {
    name: "Python",
    icon: "/images/skills/icons8-python-150.png",
    description: "Great for algorithms, automations, and LLM-related projects.",
    category: "languages",
    brandColor: "#3776AB",
  },
  {
    name: "HTML",
    icon: "/images/skills/icons8-html-150.png",
    description: "Essential technology for website structures, used in all my web projects.",
    category: "languages",
    brandColor: "#E34F26",
  },
  {
    name: "CSS",
    icon: "/images/skills/icons8-css-150.png",
    description: "Technology that brings life to my projects, focusing on modern UI/UX.",
    category: "languages",
    brandColor: "#1572B6",
  },
  {
    name: "Shell",
    icon: "shell",
    description: "Scripting and automation for efficient workflows and DevOps tasks.",
    category: "languages",
    brandColor: "#4EAA25",
  },
  // Frameworks & Runtime
  {
    name: "React",
    icon: "/images/skills/icons8-react-native-150.png",
    description: "Building dynamic and responsive user interfaces with component-based architecture.",
    category: "frameworks",
    brandColor: "#61DAFB",
  },
  {
    name: "Next.js",
    icon: "nextjs",
    description: "Full-stack React framework for production-grade applications.",
    category: "frameworks",
    brandColor: "#FFFFFF",
  },
  {
    name: "Node.js",
    icon: "/images/skills/icons8-node-js-96.png",
    description: "Powering the backend of my applications with JavaScript efficiency.",
    category: "frameworks",
    brandColor: "#339933",
  },
  {
    name: "Godot Engine",
    icon: "godot",
    description: "Game development with open-source engine, scripting and scene design.",
    category: "frameworks",
    brandColor: "#478CBF",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwind",
    description: "Utility-first CSS framework for rapid and consistent UI development.",
    category: "frameworks",
    brandColor: "#06B6D4",
  },
  // Infra, DB & Tools
  {
    name: "Docker",
    icon: "docker",
    description: "Containerization for consistent development and deployment environments.",
    category: "infra",
    brandColor: "#2496ED",
  },
  {
    name: "Linux",
    icon: "linux",
    description: "Daily driver OS, system administration, and development environment.",
    category: "infra",
    brandColor: "#FCC624",
  },
  {
    name: "Git",
    icon: "git",
    description: "Version control and collaborative development workflows.",
    category: "infra",
    brandColor: "#F05032",
  },
  {
    name: "PostgreSQL",
    icon: "postgresql",
    description: "Robust relational database for complex data modeling and queries.",
    category: "infra",
    brandColor: "#4169E1",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    description: "Flexible NoSQL database for dynamic and scalable applications.",
    category: "infra",
    brandColor: "#47A248",
  },
  {
    name: "Supabase",
    icon: "supabase",
    description: "Open-source Firebase alternative with PostgreSQL backend.",
    category: "infra",
    brandColor: "#3FCF8E",
  },
];
