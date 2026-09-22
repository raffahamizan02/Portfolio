import { FaJava, FaGithub } from "react-icons/fa";
import { SiPhp, SiJavascript, SiPython, SiLaravel, SiMysql, SiMongodb, SiGit } from "react-icons/si";

const rowOne = [
  { icon: FaJava, label: "Java" },
  { icon: SiPhp, label: "PHP" },
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiPython, label: "Python" },
  { icon: SiLaravel, label: "Laravel" },
];

const rowTwo = [
  { icon: SiMysql, label: "MySQL" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiGit, label: "Git" },
  { icon: FaGithub, label: "GitHub" },
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof rowOne;
  reverse?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-16 py-3 ${
          reverse ? "marquee-track-reverse animate-marquee-reverse" : "marquee-track animate-marquee"
        }`}
      >
        {loop.map((t, i) => {
          const Icon = t.icon;
          return (
            <span
              key={i}
              aria-hidden={i >= items.length}
              className="flex flex-col items-center gap-2.5 text-muted"
            >
              <Icon size={36} />
              <span className="font-mono text-[0.75rem]">{t.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <div
      className="flex flex-col gap-8"
      role="img"
      aria-label={`Skills: ${[...rowOne, ...rowTwo].map((t) => t.label).join(", ")}`}
    >
      <MarqueeRow items={rowOne} />
      <MarqueeRow items={rowTwo} reverse />
    </div>
  );
}