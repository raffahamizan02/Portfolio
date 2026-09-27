export const profile = {
  name: "Muhammad Abhiraffa Hamizan",
  displayName: "ABHIRAFFA HAMIZAN",
  title: "Backend Developer",
  tagline: "APIs / DATABASES / SERVER-SIDE SYSTEMS",
  location: "Malang, East Java, Indonesia",
  email: "raplhy02@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/muhammad-abhiraffa-hamizan-b1a097438/",
  github: "https://github.com/raffahamizan02",
  instagram: "https://www.instagram.com/raff_hamiz",
  discord: "https://discord.com/users/rraplhybbums_96320",
  quote: "Think through the problem. Make the soundest move.",
};

export type Skill = {
  name: string;
  icon: string;
};

export const skills: Skill[] = [
  { name: "PHP", icon: "PHP" },
  { name: "Java", icon: "Java" },
  { name: "JavaScript", icon: "JS" },
  { name: "Python", icon: "Py" },
  { name: "Laravel", icon: "Laravel" },
  { name: "MySQL", icon: "MySQL" },
  { name: "MongoDB", icon: "MongoDB" },
  { name: "Git", icon: "Git" },
  { name: "GitHub", icon: "GitHub" },
];

export type Project = {
  slug: string;
  title: string;
  description: string;
  role: string;
  year: string;
  technologies: string[];
  image?: string;
  liveUrl: string | null;
  repoUrl: string | null;
};

export const projects: Project[] = [
  {
    slug: "chess-game",
    title: "Chess Game",
    description:
      "A backend API built to handle chess game logic, tracking board state and validating moves through server-side rules.",
    role: "Backend project",
    year: "2026",
    technologies: ["API design", "Backend logic"],
    image: "/projects/chess-game.jpg",
    liveUrl: null,
    repoUrl: "https://github.com/raffahamizan02/ChessGameAPI",
  },
  {
    slug: "nusa-quest",
    title: "Nusa Quest",
    description:
      "An RPG educational platform using multi-modal AI to teach Javanese language and etiquette through interactive quests, pronunciation tests, and adaptive quizzes.",
    role: "Game Designer",
    year: "2026",
    technologies: ["Express JS", "Cloudflare KV", "Groq LLM", "NusaTTSE"],
    image: "/projects/nusa-quest.jpg",
    liveUrl: "https://nusaquest.pages.dev/",
    repoUrl: "https://github.com/biebpp/NusaQuest",
  },
];

export const journey = [
  {
    when: "JUL 2022 — JUN 2025",
    title: "Student",
    org: "MTs Negeri Batu",
    body: "A foundational stage of study before moving into software engineering.",
  },
  {
    when: "JUL 2025 — PRESENT",
    title: "Software Engineering Student",
    org: "SMKS PGRI 3 Malang",
    body: "Studying software engineering with a growing focus on backend development, APIs, and system building.",
  },
  {
    when: "JUL 2018 — PRESENT",
    title: "Competitive Chess Player",
    org: "Tournament play",
    body: "Chess has shaped how I think through problems: analytical, patient, and deliberate under pressure.",
  },
];

export const navLinks = [
  { href: "/#top", label: "Home" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#journey", label: "Journey" },
];
