import type { IconType } from "react-icons";
import { FaJava, FaGithub } from "react-icons/fa6";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiVuedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiGit,
  SiFigma,
  SiPostman,
} from "react-icons/si";

export type SkillItem = {
  name: string;
  label: string;
  icon: IconType;
  color: string;
  url: string;
};

export const rowOne: SkillItem[] = [
  {
    name: "javascript",
    label: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "typescript",
    label: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "python",
    label: "Python",
    icon: SiPython,
    color: "#3776AB",
    url: "https://www.python.org/",
  },
  {
    name: "java",
    label: "Java",
    icon: FaJava,
    color: "#EA2D2E",
    url: "https://dev.java/",
  },
  {
    name: "php",
    label: "PHP",
    icon: SiPhp,
    color: "#777BB4",
    url: "https://www.php.net/",
  },
  {
    name: "laravel",
    label: "Laravel",
    icon: SiLaravel,
    color: "#FF2D20",
    url: "https://laravel.com/",
  },
  {
    name: "mysql",
    label: "MySQL",
    icon: SiMysql,
    color: "#4479A1",
    url: "https://www.mysql.com/",
  },
  {
    name: "mongodb",
    label: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
    url: "https://www.mongodb.com/",
  },
  {
    name: "react",
    label: "React",
    icon: SiReact,
    color: "#61DAFB",
    url: "https://react.dev/",
  },
  {
    name: "nextjs",
    label: "Next.js",
    icon: SiNextdotjs,
    color: "#0070F3",
    url: "https://nextjs.org/",
  },
  {
    name: "tailwindcss",
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    url: "https://tailwindcss.com/",
  },
  {
    name: "bootstrap",
    label: "Bootstrap",
    icon: SiBootstrap,
    color: "#7952B3",
    url: "https://getbootstrap.com/",
  },
  {
    name: "html5",
    label: "HTML5",
    icon: SiHtml5,
    color: "#E34F26",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "css3",
    label: "CSS3",
    icon: SiCss,
    color: "#1572B6",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "git",
    label: "Git",
    icon: SiGit,
    color: "#F05032",
    url: "https://git-scm.com/",
  },
  {
    name: "github",
    label: "GitHub",
    icon: FaGithub,
    color: "#A371F7",
    url: "https://github.com/",
  },
];

export const allSkills: SkillItem[] = [
  ...rowOne,
];
