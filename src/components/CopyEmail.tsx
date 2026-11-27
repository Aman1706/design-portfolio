"use client";

import { useEffect, useRef, useState } from "react";

const LABELS = { idle: "Copy", copied: "Copied ✓", failed: "Couldn't copy" } as const;

/** Copies the email for people without a mail client set up (where mailto: does nothing). */
export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<keyof typeof LABELS>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${email}`}
        className="rounded-[20px] border border-pill-border px-4 py-1.5 text-[14px] leading-[normal] font-medium transition-colors hover:border-accent-alt hover:text-accent-alt lg:text-[16px]"
      >
        {LABELS[status]}
      </button>
      <span role="status" className="sr-only">
        {status === "copied" ? "Email address copied" : status === "failed" ? "Couldn't copy the email address" : ""}
      </span>
    </>
  );
}
