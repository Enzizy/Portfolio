"use client";

import { useState } from "react";

type CopyEmailButtonProps = {
  email: string;
};

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="btn-pop rounded-full border border-[#1f1c1a]/40 px-4 py-2 text-sm font-medium transition hover:bg-[#1f1c1a] hover:text-[#fdf8f1]"
      aria-label="Copy email address"
    >
      {copied ? "Copied" : "Copy Email"}
    </button>
  );
}
