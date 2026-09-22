import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SkillsMarquee from "./SkillsMarquee";

export default function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-hairline">
      <div className="max-w-content mx-auto px-7">
        <Reveal>
          <SectionHeading
            title="Skills"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <SkillsMarquee />
        </Reveal>
      </div>
    </section>
  );
}