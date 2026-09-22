import { FaJava, FaGithub } from "react-icons/fa";
import { SiPhp, SiJavascript, SiPython, SiLaravel, SiMysql, SiMongodb, SiGit } from "react-icons/si";

const techs = [
  { icon: FaJava, label: "Java" },
  { icon: SiPhp, label: "PHP" },
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiPython, label: "Python" },
  { icon: SiLaravel, label: "Laravel" },
  { icon: SiMysql, label: "MySQL" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiGit, label: "Git" },
  { icon: FaGithub, label: "GitHub" },
];

export default function TechMarquee() {
  const loop = [...techs, ...techs];

  return (
    <div
      className="overflow-hidden border-y border-hairline bg-bg-raised"
      role="img"
      aria-label={`Tech stack: ${techs.map((t) => t.label).join(", ")}`}
    >
      <div className="marquee-track flex w-max gap-10 py-4 animate-marquee">
        {loop.map((t, i) => {
          const Icon = t.icon;
          return (
            <span
              key={i}
              aria-hidden={i >= techs.length}
              className="flex items-center gap-2 text-muted text-sm whitespace-nowrap px-2"
            >
              <Icon size={16} />
              {t.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}