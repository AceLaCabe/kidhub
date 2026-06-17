// src/app/parent/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  isParentUnlocked,
  lockParentMode,
  unlockParentMode,
} from "@/lib/parent-mode";

const DEMO_PARENT_CODE = "2468";

export default function ParentModePage() {
  const [checking, setChecking] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUnlocked(isParentUnlocked());
    setChecking(false);
  }, []);

  function handleUnlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (code !== DEMO_PARENT_CODE) {
      setError("That code did not work.");
      return;
    }

    unlockParentMode();
    setUnlocked(true);
    setError("");
  }

  function handleLock() {
    lockParentMode();
    setUnlocked(false);
    setCode("");
  }

  if (checking) {
    return (
      <div className="calm-card">
        <p className="calm-section-title">Checking parent mode…</p>
      </div>
    );
  }

  if (unlocked) {
  return (
    <div className="space-y-5 pb-8">
      <section className="space-y-1.5">
        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[rgb(var(--primary))]">
          Parent Mode
        </p>

        <h1 className="text-[2.45rem] font-black leading-[0.94] tracking-[-0.055em] text-[rgb(var(--text))]">
          Caregiver tools
        </h1>

        <p className="max-w-[33ch] text-[0.98rem] leading-relaxed text-[rgb(var(--muted))]">
          Review patterns, customize support, and adjust the app for your child.
        </p>
      </section>

      <section className="calm-card space-y-3">
        <div>
          <h2 className="calm-section-title">Today’s support</h2>
          <p className="calm-section-copy">
            Quick access to the tools connected to your child’s recent activity.
          </p>
        </div>

        <Link href="/parent/calm-corner" className="parent-tool-card focus-ring">
          <span className="parent-tool-icon" aria-hidden="true">
            😌
          </span>

          <span className="min-w-0 flex-1">
            <span className="parent-tool-title">Calm Corner support</span>
            <span className="parent-tool-copy">
              View saved feelings and use caregiver scripts.
            </span>
          </span>

          <span className="parent-tool-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </section>

      <section className="calm-card space-y-3">
        <div>
          <h2 className="calm-section-title">Coming dashboard tools</h2>
          <p className="calm-section-copy">
            These will become account-based once parent and child profiles are linked.
          </p>
        </div>

        <div className="grid gap-3">
          <div className="parent-tool-card is-muted">
            <span className="parent-tool-icon" aria-hidden="true">
              ⏱️
            </span>

            <span className="min-w-0 flex-1">
              <span className="parent-tool-title">Routine insights</span>
              <span className="parent-tool-copy">
                Track routine time, completion patterns, and skipped steps.
              </span>
            </span>
          </div>

          <div className="parent-tool-card is-muted">
            <span className="parent-tool-icon" aria-hidden="true">
              ⭐
            </span>

            <span className="min-w-0 flex-1">
              <span className="parent-tool-title">Reward settings</span>
              <span className="parent-tool-copy">
                Edit rewards, effort celebrations, and choices.
              </span>
            </span>
          </div>

          <div className="parent-tool-card is-muted">
            <span className="parent-tool-icon" aria-hidden="true">
              🧩
            </span>

            <span className="min-w-0 flex-1">
              <span className="parent-tool-title">Customize support</span>
              <span className="parent-tool-copy">
                Adjust routines and reset tools for your child’s schedule.
              </span>
            </span>
          </div>
        </div>
      </section>

      <button type="button" onClick={handleLock} className="btn-secondary w-full">
        Lock parent mode
      </button>
    </div>
  );
}

  return (
    <div className="space-y-5 pb-8">
      <section className="space-y-1.5">
        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[rgb(var(--primary))]">
          Parent Mode
        </p>

        <h1 className="text-[2.45rem] font-black leading-[0.94] tracking-[-0.055em] text-[rgb(var(--text))]">
          Grown-ups only
        </h1>

        <p className="max-w-[31ch] text-[0.98rem] leading-relaxed text-[rgb(var(--muted))]">
          Unlock caregiver tools with a parent code.
        </p>
      </section>

      <form onSubmit={handleUnlock} className="calm-card space-y-4">
        <div>
          <label htmlFor="parent-code" className="calm-section-title">
            Parent code
          </label>
          <p className="calm-section-copy">Demo code: 2468</p>
        </div>

        <input
          id="parent-code"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setError("");
          }}
          placeholder="Enter code"
        />

        {error && (
          <p className="text-sm font-bold text-[rgb(var(--primary))]">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary w-full">
          Unlock parent mode
        </button>
      </form>
    </div>
  );
}