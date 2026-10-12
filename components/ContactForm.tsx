"use client";

import { useCallback, useRef, useState } from "react";
import { profile } from "@/lib/data";
import PromptBar, {
  DEFAULT_SOURCES,
  DEFAULT_COMMANDS,
  DEFAULT_MODELS,
  DEFAULT_EFFORTS,
  type PromptBarSendDetail
} from "./PromptBar";

const ATTACH_FILES = ["brief.pdf", "screenshot.png", "metrics.csv"];
const DICTATION_TEXT = "Compare the last two quarters of sales";

export default function ContactForm() {
  const [busy, setBusy] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const attachIndex = useRef(0);
  const [status, setStatus] = useState<string | null>(null);

  const handleSend = useCallback((text: string, detail: PromptBarSendDetail) => {
    setBusy(true);
    setStatus(null);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setBusy(false);
      if (text.trim()) {
        const subject = encodeURIComponent("Portfolio Message");
        const body = encodeURIComponent(
          `${text.trim()}\n\nModel: ${detail.model?.name ?? "Default"} | Effort: ${detail.effort ?? "Default"}${
            detail.attachments.length ? `\nAttachments: ${detail.attachments.join(", ")}` : ""
          }`
        );
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setStatus("Opening email app to send message…");
      }
    }, 2400);
  }, []);

  const handleStop = useCallback(() => {
    clearTimeout(timerRef.current);
    setBusy(false);
    setStatus("Cancelled");
  }, []);

  const handleAttach = useCallback(() => {
    const file = ATTACH_FILES[attachIndex.current % ATTACH_FILES.length];
    attachIndex.current += 1;
    return file;
  }, []);

  const handleDictate = useCallback(() => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(DICTATION_TEXT);
      }, 2200);
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <PromptBar
        placeholder="Ask anything"
        sources={DEFAULT_SOURCES}
        commands={DEFAULT_COMMANDS}
        models={DEFAULT_MODELS}
        efforts={DEFAULT_EFFORTS}
        busy={busy}
        onSend={handleSend}
        onStop={handleStop}
        onAttach={handleAttach}
        onDictate={handleDictate}
        background="#27272a"
        color="#f5f5f5"
        menuBackground="#323236"
        sparkColor="#C8102E"
        sparkBoost={1}
        width={400}
        radius={16}
        maxRows={5}
        morphDuration={240}
        squash={0.12}
        tilt={8}
        pressScale={0.96}
      />

      {status ? (
        <p
          role="status"
          aria-live="polite"
          className="text-xs text-muted mt-3 text-center transition-opacity"
        >
          {status}
        </p>
      ) : null}
    </div>
  );
}