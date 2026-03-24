export interface Project {
  title: string;
  description: string;
  details: string;
  tech: string[];
  githubUrl: string;
  deployUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Controle Pessoal de Livros",
    description:
      "Full-stack application for personal book management with financial tracking and spending analytics.",
    details:
      "Built a complete CRUD system with database integration for managing a personal book collection. Features include advanced search and filtering, deletion with confirmation, and a financial dashboard with interactive charts that track spending over time. The backend API handles authentication and persistent storage.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
    githubUrl: "https://github.com/albavxs/Controle-pessoal-de-livros",
  },
  {
    title: "Weather App",
    description:
      "Real-time weather dashboard with geolocation detection and worldwide city search.",
    details:
      "Integrates with OpenWeatherMap API to deliver current conditions, humidity, wind speed, and multi-day forecasts. Automatically detects the user's location on load and allows searching any city globally. Responsive design adapts from mobile to desktop with smooth transitions between weather states.",
    tech: ["JavaScript", "HTML", "CSS", "OpenWeatherMap API"],
    githubUrl: "https://github.com/albavxs/Weather-app",
  },
  {
    title: "Gameboxd",
    description:
      "Social platform for gamers with real-time game discovery powered by the Twitch API.",
    details:
      "A Letterboxd-inspired platform for games. Users authenticate via Twitch OAuth, browse trending titles, search the full game catalog, and rate their favorites. The app fetches live data from Twitch's IGDB integration for accurate game metadata, cover art, and popularity rankings.",
    tech: ["React", "Node.js", "Twitch API", "OAuth"],
    githubUrl: "https://github.com/albavxs/gameboxdd",
  },
  {
    title: "Prime Look",
    description:
      "Mobile app for professional aesthetics management with secure authentication and scheduling.",
    details:
      "Developed collaboratively using React Native for the mobile frontend and Node.js for the backend API. Features include user registration with JWT authentication, appointment scheduling, professional profile management, and a modular architecture designed for scalability. The API follows RESTful patterns with input validation and error handling.",
    tech: ["React Native", "Node.js", "Express", "JWT", "REST API"],
    githubUrl: "https://github.com/Vinijosee/Prime-Look",
  },
  {
    title: "AlgoriUI",
    description:
      "Interactive platform for studying algorithms and data structures visually, turning abstract concepts into intuitive experiences.",
    details:
      "An educational tool that brings algorithms and data structures to life through visual, step-by-step representations. Users can explore sorting algorithms, search trees, linked lists, and more — watching each operation unfold in real time. Built to make CS fundamentals accessible and engaging, whether you're a student learning for the first time or reviewing for technical interviews.",
    tech: ["TypeScript", "React", "CSS Modules", "Storybook"],
    githubUrl: "https://github.com/albavxs/AlgoriUI",
    deployUrl: "https://algoriui.vercel.app",
  },
];
