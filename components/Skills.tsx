import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SkillsMarquee from "./SkillsMarquee";

export default function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-hairline">
      <div className="max-w-content mx-auto px-7">
        <Reveal>
          <SectionHeading title="Skills" />
        </Reveal>
        <Reveal delay={0.1}>
          <SkillsMarquee />
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 text-[0.92rem] font-semibold text-accent hover:text-accent-strong transition-colors"
            >
              <span>Explore all skills & directory</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}