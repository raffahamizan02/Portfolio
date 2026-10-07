export interface CompetitionItem {
  id: string;
  category: "Chess" | "Coding" | "Mathematics";
  title: string;
  place: "1st Place" | "2nd Place" | "3rd Place";
  placeBadge: string;
  organizer: string;
  year: string;
  description: string;
  image: string;
}

export const competitions: CompetitionItem[] = [
  {
    id: "comp-chess",
    category: "Chess",
    title: "Regional Junior Chess Championship",
    place: "1st Place",
    placeBadge: "🥇 1st Place",
    organizer: "PERCASI & Regional Tournament Circuit",
    year: "2024",
    description:
      "Achieved 1st place in classical and rapid tournament rounds, demonstrating tactical poise, endgame calculation, and composure under clock pressure.",
    image: "/certificates/cert-chess.jpg",
  },
  {
    id: "comp-coding",
    category: "Coding",
    title: "Backend Engineering & API Hackathon",
    place: "2nd Place",
    placeBadge: "🥈 2nd Place",
    organizer: "SMKS PGRI 3 Malang & Tech Guild",
    year: "2025",
    description:
      "Engineered a high-performance RESTful API service with PostgreSQL database indexing and robust validation within a tight 24-hour sprint.",
    image: "/certificates/cert-coding.jpg",
  },
  {
    id: "comp-math",
    category: "Mathematics",
    title: "Applied Logic & Mathematics Olympiad",
    place: "3rd Place",
    placeBadge: "🥉 3rd Place",
    organizer: "Regional Science & Mathematics Guild",
    year: "2023",
    description:
      "Awarded 3rd place for analytical problem-solving in discrete mathematics, combinatorial logic, probability theory, and algorithmic reasoning.",
    image: "/certificates/cert-math.jpg",
  },
];
