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
    <section id="contact" className="py-24 border-t border-hairline">
      <div className="max-w-content mx-auto px-7">
        <Reveal className="max-w-xl mx-auto text-center">
          <SectionHeading
            title="Contact"
          />
          <p className="mt-4 text-muted text-[1.02rem]">
            Open to internships, junior backend roles, and small
            collaborations.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {channels.map((c) => {
              const Icon = c.icon;
              const isExternal = c.href.startsWith("http");
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                >
                  <Icon size={15} />
                  {c.label}
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="max-w-lg mx-auto mt-14">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}