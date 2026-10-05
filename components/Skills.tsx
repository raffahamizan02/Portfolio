import Reveal from "./Reveal";
import SkillsMarquee from "./SkillsMarquee";

export default function Skills() {
  return (
    <section id="skills" className="py-14 sm:py-20 md:py-24 border-t border-hairline overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-7 max-w-full overflow-hidden">
        <Reveal delay={0.1}>
          <SkillsMarquee />
        </Reveal>
      </div>
    </section>
  );
}