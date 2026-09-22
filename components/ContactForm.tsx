"use client";

import { FormEvent, useState } from "react";
import { profile } from "@/lib/data";

type Errors = { name?: string; email?: string; message?: string };

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ text: string; success: boolean } | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!message || message.length < 10) nextErrors.message = "Message should be at least 10 characters.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ text: "Please fix the fields above.", success: false });
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setStatus({ text: "Opening your email app to send this message…", success: true });
    form.reset();
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[0.86rem] text-muted">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          className="font-body text-[0.98rem] px-3.5 py-3 border border-hairline rounded-s bg-bg-raised text-ink focus:border-accent"
        />
        <span className="text-[0.8rem] text-red-700 min-h-[1.1em]">{errors.name}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[0.86rem] text-muted">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          className="font-body text-[0.98rem] px-3.5 py-3 border border-hairline rounded-s bg-bg-raised text-ink focus:border-accent"
        />
        <span className="text-[0.8rem] text-red-700 min-h-[1.1em]">{errors.email}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[0.86rem] text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="font-body text-[0.98rem] px-3.5 py-3 border border-hairline rounded-s bg-bg-raised text-ink focus:border-accent resize-y min-h-[120px]"
        />
        <span className="text-[0.8rem] text-red-700 min-h-[1.1em]">{errors.message}</span>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-s bg-brand text-white px-5 py-[11px] text-sm font-semibold hover:bg-brand-strong transition-colors"
        >
          Send message
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`text-[0.9rem] min-h-[1.3em] ${status?.success ? "text-emerald-700" : "text-muted"}`}
      >
        {status?.text}
      </p>
    </form>
  );
}