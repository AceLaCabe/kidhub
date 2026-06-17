// src/components/top-bar.tsx
"use client";

import Link from "next/link";
import { useLowStim } from "@/components/low-stim-provider";

export default function TopBar() {
  const { lowStim, toggle } = useLowStim();

  return (
    <header className="sticky top-3 z-20 mb-3 rounded-full border border-[rgba(var(--border),0.24)] bg-[rgba(var(--card),0.86)] p-1 shadow-[0_10px_24px_rgba(var(--shadow),0.055)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/"
          aria-label="Go home"
          className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-full px-2.5 text-sm font-extrabold tracking-[-0.01em] text-[rgb(var(--text))]"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgb(var(--primary))] text-xs leading-none text-[rgb(var(--text-on-primary))]"
          >
            ✦
          </span>
          <span>Kids Hub</span>
        </Link>

        <button
          type="button"
          onClick={toggle}
          aria-pressed={lowStim}
          aria-label={lowStim ? "Turn calm mode off" : "Turn calm mode on"}
          className={[
            "focus-ring inline-flex min-h-10 items-center gap-2 rounded-full border px-3 text-sm font-extrabold",
            lowStim
              ? "border-[rgba(var(--primary),0.5)] bg-[rgb(var(--primary))] text-[rgb(var(--text-on-primary))]"
              : "border-[rgba(var(--border),0.24)] bg-[rgba(var(--card-strong),0.78)] text-[rgb(var(--text))]",
          ].join(" ")}
        >
          <span>{lowStim ? "Calm On" : "Calm"}</span>

          <span
            aria-hidden="true"
            className={[
              "relative h-5 w-9 rounded-full",
              lowStim
                ? "bg-[rgba(var(--text-on-primary),0.28)]"
                : "bg-[rgba(var(--border),0.3)]",
            ].join(" ")}
          >
            <span
              className={[
                "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full shadow-sm",
                lowStim
                  ? "left-[1.15rem] bg-[rgb(var(--text-on-primary))]"
                  : "left-0.5 bg-[rgb(var(--card-strong))]",
              ].join(" ")}
            />
          </span>
        </button>
      </div>
    </header>
  );
}