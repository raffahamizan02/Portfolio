import { profile, highlights } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-hairline">
      <SectionHeading
        title="About"
      />
      <div className="max-w-content mx-auto px-7 grid md:grid-cols-2 gap-12 md:gap-16">
        <Reveal>
          <div className="mt-7 flex flex-col gap-4.5">
            {profile.bio.map((p, i) => (
              <p key={i} className="text-[1.04rem] leading-[1.75]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-7.5 flex flex-col gap-10">
          {highlights.map((h, i) => (
            <div
              key={h.title}
            >
              <div>
                <h4 className="font-display font-semibold text-base">{h.title}</h4>
                <p className="text-muted text-[0.92rem] mt-1.5">{h.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}