export const profile = {
  name: "Muhammad Abhiraffa Hamizan",
  title: "Software Engineering Student",
  tagline: "Backend developer in training",
  location: "Karangploso, Kabupaten Malang, East Java, Indonesia",
  email: "raplhy02@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/muhammad-abhiraffa-hamizan-b1a097438/",
  github: "https://github.com/raffahamizan02",
  instagram: "https://www.instagram.com/raff_hamiz",
  discord: "https://discord.com/users/rraplhybbums_96320",
  bio: [
    "I'm a Software Engineering student at SMK PGRI 3 Malang with a strong interest in backend development and building reliable, efficient, and scalable applications. I enjoy learning how systems work behind the scenes, from designing APIs and managing databases to writing server-side logic.",
    "Beyond technology, I'm a competitive chess player with experience in numerous tournaments. Chess has sharpened my analytical thinking, strategic decision-making, patience, and ability to solve problems under pressure, skills I carry directly into programming.",
    "I'm continuing to build my technical skills through projects and hands-on practice, with the goal of becoming a professional backend developer and contributing to technology that matters.",
  ],
};

export const highlights = [
  {
    title: "What I specialize in",
    body: "APIs, database design, and server-side application logic.",
  },
  {
    title: "How I approach problems",
    body: "Break the position down, weigh the options, commit to the soundest move — same method whether it's a board or a bug.",
  },
  {
    title: "Where I'm based",
    body: "Karangploso, Kabupaten Malang, East Java, Indonesia.",
  },
  {
    title: "Currently",
    body: "Studying Software Engineering at SMKS PGRI 3 Malang, building projects on the side.",
  },
];

export const skillGroups = [
  { title: "Languages", tags: ["PHP", "Java", "JavaScript", "Python"] },
  { title: "Frameworks", tags: ["Laravel"] },
  { title: "Databases", tags: ["MySQL", "MongoDB"] },
  { title: "Tools", tags: ["Git", "GitHub"] },
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
      "A backend API built to handle chess game logic, tracking board state and validating moves through server-side rules rather than a UI.",
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
      "NusaQuest is a RPG educational platform that uses multi-modal AI to teach Javanese language and etiquette through interactive quests, speech pronunciation tests, and real-time adaptive LLM quizzes",
    role: "Game Designer",
    year: "2026",
    technologies: ["Express JS", "Cloudflare KV", "Groq LLM", "NusaTTSE"],
    image: "/projects/nusa-quest.jpg",
    liveUrl: "https://nusaquest.pages.dev/",
    repoUrl: "https://github.com/biebpp/NusaQuest"
  },
];

export const journey = [
  {
    when: "Juli 2022 - Juni 2025",
    title: "Student",
    org: "MTs Negeri Batu",
    body: "Studying "
  },
  {
    when: "Juli 2025 - Present",
    title: "Software Engineering Student",
    org: "SMKS PGRI 3 Malang",
    body: "Studying software engineering with a focus on backend development"
  },
  {
    when: " Juli 2018 - Present",
    title: "Competitive chess player",
    org: "Tournament play",
    body: "Participating in chess tournaments alongside my studies. The game has shaped how I think through problems: analytical, patient, and deliberate under pressure — habits that carry directly into how I approach code."
  },
];

export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];