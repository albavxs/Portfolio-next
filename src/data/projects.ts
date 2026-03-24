export interface Project {
  title: string;
  description: string;
  details: string;
  githubUrl: string;
  deployUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Controle Pessoal de Livros",
    description: "React & Node.js application for book management and financial tracking.",
    details: "Features database integration, search, deletion, and spending analytics via charts.",
    githubUrl: "https://github.com/albavxs/Controle-pessoal-de-livros",
  },
  {
    title: "Weather App",
    description: "Real-time weather information based on user location and global search.",
    details: "Uses external APIs to provide detailed weather conditions for any city worldwide.",
    githubUrl: "https://github.com/albavxs/Weather-app",
  },
  {
    title: "Gameboxd",
    description: "A social platform for gamers using Twitch API for real-time game data.",
    details: "Explore trending games, search any title, and rate your favorites with Twitch login.",
    githubUrl: "https://github.com/albavxs/gameboxdd",
  },
  {
    title: "Prime Look",
    description: "Mobile application for professional aesthetics management and authentication.",
    details: "Developed with React Native and Node.js, featuring a robust authentication API and modular architecture.",
    githubUrl: "https://github.com/Vinijosee/Prime-Look",
  },
  {
    title: "AlgoriUI",
    description: "UI component library with modern design patterns and reusable elements.",
    details: "Open-source project focused on delivering polished, accessible UI components.",
    githubUrl: "https://github.com/albavxs/AlgoriUI",
    deployUrl: "https://algoriui.vercel.app",
  },
];
