import { rowOne, rowTwo, type SkillItem } from "@/lib/skillsData";

function MarqueeRow({
  items,
  reverse = false,
  speed = 28,
}: {
  items: SkillItem[];
  reverse?: boolean;
  speed?: number;
}) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden py-1">
      <div
        className={`flex w-max gap-8 py-3.5 ${
          reverse
            ? "marquee-track-reverse animate-marquee-reverse"
            : "marquee-track animate-marquee"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((t, i) => {
          const Icon = t.icon;
          const isAriaDuplicate = i >= items.length;

          return (
            <a
              key={`${t.name}-${i}`}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isAriaDuplicate ? -1 : 0}
              aria-hidden={isAriaDuplicate ? true : undefined}
              aria-label={`Buka website resmi ${t.label}`}
              title={`Kunjungi website resmi ${t.label} (${t.url})`}
              className="skill-item group relative flex flex-col items-center gap-2.5 shrink-0 px-3 py-2 rounded-2xl cursor-pointer hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              style={{
                ["--brand-color" as string]: t.color,
                ["--brand-bg" as string]: `${t.color}15`,
                ["--brand-border" as string]: `${t.color}35`,
                ["--brand-glow" as string]: `${t.color}45`,
              }}
            >
              <div className="skill-icon-box w-14 h-14 rounded-xl flex items-center justify-center border border-hairline/70 bg-bg-raised/80 backdrop-blur-xs">
                <Icon size={30} className="skill-icon text-muted" />
              </div>
              <span className="skill-label font-mono text-[0.73rem] text-muted whitespace-nowrap">
                {t.label}
              </span>
            </a>
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
      className="flex flex-col gap-6"
      role="region"
      aria-label={`Skills and technologies: ${all.map((t) => t.label).join(", ")}`}
    >
      <MarqueeRow items={rowOne} speed={32} />
      <MarqueeRow items={rowTwo} reverse speed={36} />
    </div>
  );
}