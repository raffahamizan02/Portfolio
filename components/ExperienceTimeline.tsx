import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { journey } from "@/lib/data";

export default function ExperienceTimeline() {
  return (
    <section id="journey" className="py-24 border-t border-hairline">
      <div className="max-w-content mx-auto px-7">
        <Reveal>
          <SectionHeading
            title="Journey"
            description=""
          />
        </Reveal>
        <div className="flex flex-col">
          {journey.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              className="grid grid-cols-[20px_1fr] md:grid-cols-[160px_1px_1fr] gap-0 relative"
            >
              <div className="hidden md:block font-mono text-[0.85rem] text-muted py-7 pr-6">
                {item.when}
              </div>
              <div className="bg-hairline relative row-span-2 md:row-span-1">
                <div className="absolute top-[34px] left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-bg border-2 border-accent" />
              </div>
              <div className="col-start-2 md:col-start-3 py-6 pl-8">
                <span className="md:hidden font-mono text-[0.8rem] text-muted block mb-1">
                  {item.when}
                </span>
                <h3 className="font-display font-semibold text-[1.06rem]">{item.title}</h3>
                <span className="text-accent text-[0.9rem] mt-1 block">{item.org}</span>
                <p className="text-muted mt-3 text-[0.95rem] leading-[1.65]">{item.body}</p>
                {item.points.length > 0 && (
                  <ul className="mt-3 pl-4.5 text-muted text-[0.93rem] leading-[1.7] list-disc">
                    {item.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}