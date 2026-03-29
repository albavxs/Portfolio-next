export interface ExperienceEntry {
  dateRange: string;
  title: string;
  company: string;
  description: string;
  bullets: string[];
  techBadges: string[];
}

export const experience: ExperienceEntry[] = [
  {
    dateRange: "Nov 2025 - Present",
    title: "Full Stack Developer (Full-time)",
    company: "Few Company",
    description: "Promoted to full-time developer, responsible for end-to-end web solutions and system architecture.",
    bullets: [
      "End-to-end web development with React and Node.js",
      "System architecture and technical standards definition",
      "REST API integration and database management",
      "Technical mentoring and team code reviews",
    ],
    techBadges: ["React", "Next.js", "Node.js", "TypeScript", "Docker"],
  },
  {
    dateRange: "Apr 2025 - Nov 2025",
    title: "QA Engineer",
    company: "Lance",
    description: "Focused on quality assurance, automated testing, and ensuring software reliability.",
    bullets: [
      "Creation and execution of automated test plans",
      "Bug identification and regression documentation",
      "Collaboration with development team for continuous improvement",
      "Quality assurance across multiple platforms",
    ],
    techBadges: ["JavaScript", "Python", "Git", "Linux"],
  },
  {
    dateRange: "Feb 2025 - Nov 2025",
    title: "Full Stack Developer (Freelance)",
    company: "Few Company",
    description: "Started as a freelancer developing custom features and maintaining existing platforms.",
    bullets: [
      "Custom feature development for clients",
      "Maintenance and optimization of existing web platforms",
      "Implementation of responsive and accessible designs",
      "Direct communication with stakeholders for requirements gathering",
    ],
    techBadges: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
  },
];
