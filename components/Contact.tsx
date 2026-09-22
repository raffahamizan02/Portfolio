import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-hairline">
      <div className="max-w-content mx-auto px-7 grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16">
        <Reveal>
          <span className="block font-mono text-[0.78rem] text-accent mb-4">Contact</span>
          <h2 className="font-display font-semibold text-[clamp(1.7rem,3.4vw,2.3rem)] max-w-[14ch] leading-tight">
            Have a project in mind? Let&apos;s build something meaningful.
          </h2>
          <p className="mt-4.5 text-muted text-[1.02rem] max-w-[40ch]">
            Open to internships, junior backend roles, and small collaborative
            projects. Reach out directly, or use the form.
          </p>
          <div className="mt-9 flex flex-col">
            <a
              href={`mailto:${profile.email}`}
              className="flex justify-between items-center gap-3 py-4 border-t border-hairline no-underline text-ink hover:text-accent group"
            >
              <span className="font-mono text-[0.86rem] text-muted group-hover:text-muted">Email</span>
              <span className="font-semibold">{profile.email}</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center gap-3 py-4 border-t border-hairline no-underline text-ink hover:text-accent"
            >
              <span className="font-mono text-[0.86rem] text-muted">LinkedIn</span>
              <span className="font-semibold">Muhammad Abhiraffa Hamizan</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center gap-3 py-4 border-t border-b border-hairline no-underline text-ink hover:text-accent"
            >
              <span className="font-mono text-[0.86rem] text-muted">GitHub</span>
              <span className="font-semibold">raffahamizan02</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}