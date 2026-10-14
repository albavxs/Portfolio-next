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
    title: "Full Stack Developer",
    company: "Few Company",
    description: "Desenvolvimento de soluções end-to-end com React, Next.js e APIs RESTful em Node.js, autenticação segura e integração com PostgreSQL e Supabase.",
    bullets: [
      "Developed end-to-end solutions with React, Next.js, and RESTful APIs in Node.js",
      "Implemented secure authentication flows and integrated PostgreSQL and Supabase databases",
      "Built 5+ responsive interfaces with Tailwind CSS focused on UX best practices",
      "Contributed to architectural decisions, code reviews, and Git versioning standards",
    ],
    techBadges: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Git"],
  },
  {
    dateRange: "Mar 2025 - Nov 2025",
    title: "Quality Assurance Analyst (QA)",
    company: "Lance Web",
    description: "Quality assurance, testes manuais e automatizados com Cypress, pipelines de CI/CD e garantia de confiabilidade do software.",
    bullets: [
      "Designed and executed manual and automated tests using Cypress",
      "Documented bugs and collaborated with developers for timely fixes",
      "Ensured delivery quality with focus on performance, usability, and security",
      "Utilized Postman, Jira, Bitbucket, and CI/CD pipelines",
    ],
    techBadges: ["Cypress", "Postman", "Jira", "Bitbucket", "CI/CD", "Automated Testing"],
  },
  {
    dateRange: "Feb 2025 - Nov 2025",
    title: "Full Stack Developer (Freelance)",
    company: "Few Company",
    description: "Started as a freelancer developing custom features and maintaining existing platforms.",
    bullets: [
      "Developed custom features for clients",
      "Maintained and optimized existing web platforms",
      "Implemented responsive and accessible designs",
      "Communicated directly with stakeholders for requirements gathering",
      "Built mobile applications with React and Expo",
    ],
    techBadges: ["React", "Next.js", "Node.js", "Expo", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Git"],
  },
  {
    dateRange: "Feb 2024 - Feb 2025",
    title: "Software Developer (Freelance Projects)",
    company: "Remote",
    description: "Freelance development of web projects for various clients.",
    bullets: [
      "Built full stack web applications from scratch",
      "Communicated directly with clients for requirements gathering",
      "Delivered responsive and functional solutions",
      "Selected technology stacks based on project needs",
    ],
    techBadges: ["React", "Next.js", "Node.js", "Expo", "TypeScript", "Tailwind CSS", "MySQL", "SQL", "MongoDB", "Git"],
  },
];
