import { FaJava, FaGithub } from "react-icons/fa6";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiCplusplus,
  SiSharp,
  SiGo,
  SiRust,
  SiKotlin,
  SiSwift,
  SiDart,
  SiRuby,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiDjango,
  SiFlask,
  SiSpring,
  SiVuedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiFirebase,
  SiGit,
  SiDocker,
  SiLinux,
  SiFigma,
  SiPostman,
} from "react-icons/si";

const rowOne = [
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiPython, label: "Python" },
  { icon: FaJava, label: "Java" },
  { icon: SiPhp, label: "PHP" },
  { icon: SiMysql, label: "MySQL" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiSqlite, label: "SQLite" },
  { icon: SiGit, label: "Git" },
  { icon: FaGithub, label: "GitHub" },
  { icon: SiPostman, label: "Postman" },
];

const rowTwo = [
  { icon: SiReact, label: "React" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: SiExpress, label: "Express" },
  { icon: SiLaravel, label: "Laravel" },
  { icon: SiVuedotjs, label: "Vue.js" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiBootstrap, label: "Bootstrap" },
  { icon: SiHtml5, label: "HTML5" },
  { icon: SiCss, label: "CSS3" },
  { icon: SiFigma, label: "Figma" },
];

type Row = typeof rowOne;

function MarqueeRow({
  items,
  reverse = false,
  speed = 28,
}: {
  items: Row;
  reverse?: boolean;
  speed?: number;
}) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-14 py-3 ${
          reverse ? "marquee-track-reverse animate-marquee-reverse" : "marquee-track animate-marquee"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((t, i) => {
          const Icon = t.icon;
          return (
            <span
              key={i}
              aria-hidden={i >= items.length}
              className="flex flex-col items-center gap-2.5 text-muted shrink-0"
            >
              <Icon size={32} />
              <span className="font-mono text-[0.72rem] whitespace-nowrap">{t.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  const all = [...rowOne, ...rowTwo];
  return (
    <div
      className="flex flex-col gap-9"
      role="img"
      aria-label={`Skills and technologies: ${all.map((t) => t.label).join(", ")}`}
    >
      <MarqueeRow items={rowOne} speed={30} />
      <MarqueeRow items={rowTwo} reverse speed={34} />
    </div>
  );
}