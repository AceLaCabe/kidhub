// src/app/parent/calm-corner/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getLastMood } from "@/lib/kidlog";
import {
  KID_NAME,
  MOODS,
  Mood,
  PARENT_SCRIPTS,
  toneBg,
} from "@/lib/calm-corner-data";
import { isParentUnlocked, lockParentMode } from "@/lib/parent-mode";

export default function ParentCalmCornerPage() {
  const [checking, setChecking] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [lastMood, setLastMood] = useState<{ mood: string; ts: number } | null>(
    null
  );

  useEffect(() => {
    const canAccess = isParentUnlocked();
    setUnlocked(canAccess);

    if (canAccess) {
      setLastMood(getLastMood());
    }

    setChecking(false);
  }, []);

  const parentMood = useMemo(() => {
    const candidate = lastMood?.mood;
    if (!candidate) return null;

    return MOODS.some((item) => item.id === candidate)
      ? (candidate as Mood)
      : null;
  }, [lastMood]);

  const parentMoodMeta = useMemo(() => {
    if (!parentMood) return null;
    return MOODS.find((item) => item.id === parentMood) ?? null;
  }, [parentMood]);

  const parentScript = useMemo(() => {
    if (!parentMood) return null;
    return PARENT_SCRIPTS[parentMood];
  }, [parentMood]);

  const lastMoodTime = lastMood
    ? new Date(lastMood.ts).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  async function copyScript() {
    if (!parentScript) return;

    const text = parentScript.lines.map((line) => `“${line}”`).join("\n");

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore clipboard failure
    }
  }

  function handleLock() {
    lockParentMode();
    window.location.href = "/";
  }

  if (checking) {
    return (
      <div className="calm-card">
        <p className="calm-section-title">Checking parent mode…</p>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="space-y-5 pb-8">
        <section className="calm-card space-y-4 text-center">
          <div>
            <h1 className="calm-section-title">Parent mode is locked</h1>
            <p className="calm-section-copy">
              Unlock parent mode to view caregiver support.
            </p>
          </div>

          <Link href="/parent" className="btn-primary w-full">
            Unlock parent mode
          </Link>
        </section>
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
          Calm support
        </h1>

        <p className="max-w-[31ch] text-[0.98rem] leading-relaxed text-[rgb(var(--muted))]">
          Use fewer words, lower input, and guide one tiny step.
        </p>
      </section>

      <section className="calm-card space-y-4" aria-labelledby="parent-view">
        <div>
          <h2 id="parent-view" className="calm-section-title">
            Last feeling saved
          </h2>
          <p className="calm-section-copy">
            This is the feeling last saved from Calm Corner.
          </p>
        </div>

        <div className="parent-mood-card">
          <p className="parent-mood-label">Last feeling saved</p>

          {parentMoodMeta ? (
            <div
              className={[
                "parent-mood-pill",
                toneBg[parentMoodMeta.tone],
              ].join(" ")}
            >
              <span aria-hidden="true">{parentMoodMeta.emoji}</span>
              <span>{parentMoodMeta.id}</span>
            </div>
          ) : (
            <div className="parent-mood-empty">No feeling saved yet</div>
          )}

          {lastMoodTime && (
            <p className="parent-mood-time">Saved at {lastMoodTime}</p>
          )}
        </div>
      </section>

      {parentScript ? (
        <section className="calm-card space-y-4">
          <div>
            <h2 className="calm-section-title">{parentScript.title}</h2>
            <p className="calm-section-copy">
              Try saying one line at a time.
            </p>
          </div>

          <div className="space-y-2">
            {parentScript.lines.map((line) => (
              <div key={line} className="script-line-card">
                “{line}”
              </div>
            ))}
          </div>

          <button type="button" onClick={copyScript} className="btn-secondary w-full">
            Copy script
          </button>

          {parentScript.tip && (
            <div className="parent-tip-card">
              <p className="parent-tip-label">Parent tip</p>
              <p>{parentScript.tip}</p>
            </div>
          )}
        </section>
      ) : (
        <section className="calm-card text-center">
          <h2 className="calm-section-title">No mood yet</h2>
          <p className="calm-section-copy mt-1">
            Ask your kid to choose a feeling and save a reset first.
          </p>
        </section>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link href="/parent" className="btn-secondary">
          Parent home
        </Link>

        <button type="button" onClick={handleLock} className="btn-primary">
          Lock mode
        </button>
      </div>
    </div>
  );
}