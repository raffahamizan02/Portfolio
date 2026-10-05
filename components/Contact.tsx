import { Mail, Github, Linkedin } from "lucide-react";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const channels = [
  { icon: Mail, label: "Email", href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
  { icon: Github, label: "GitHub", href: profile.github },
];

export default function Contact() {
  return (
    <section id="contact" className="py-14 sm:py-20 md:py-24 border-t border-hairline overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-7 max-w-full">
        <Reveal className="max-w-xl mx-auto text-center">
          <SectionHeading
            title="Contact"
          />
          <p className="mt-3 sm:mt-4 text-muted text-[0.95rem] sm:text-[1.02rem] leading-relaxed break-words [text-wrap:balance]">
            Open to internships, junior backend roles, and small
            collaborations.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-8">
            {channels.map((c) => {
              const Icon = c.icon;
              const isExternal = c.href.startsWith("http");
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline px-4 py-2.5 min-h-[44px] text-sm font-medium hover:border-accent hover:text-accent transition-colors touch-manipulation select-none"
                >
                  <Icon size={15} />
                  {c.label}
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="max-w-lg mx-auto mt-10 sm:mt-14 w-full">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}