import Reveal from "./Reveal";
import SkillsMarquee from "./SkillsMarquee";

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-content mx-auto px-7">
        <Reveal delay={0.1}>
          <SkillsMarquee />
        </Reveal>
      </div>
    </section>
  );
}