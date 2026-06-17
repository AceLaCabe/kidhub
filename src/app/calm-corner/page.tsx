// src/app/calm-corner/page.tsx
"use client";

import { useMemo, useState } from "react";
import { appendMoodLog, saveLastMood } from "@/lib/kidlog";
import {
  MOODS,
  TOOLSETS,
  Mood,
  Tone,
  toneBg,
  toneText,
} from "@/lib/calm-corner-data";

export default function CalmCornerPage() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [activeTool, setActiveTool] = useState<number | null>(null);
  const [didSaveSelection, setDidSaveSelection] = useState(false);

  const tools = useMemo(() => (mood ? TOOLSETS[mood] : []), [mood]);

  const selectedMoodMeta = useMemo(
    () => MOODS.find((m) => m.id === mood) ?? null,
    [mood]
  );

  const selectedReset = activeTool !== null ? tools[activeTool] : null;

  function clearSelections() {
    setMood(null);
    setActiveTool(null);
    setDidSaveSelection(false);
  }

  function handleMoodToggle(nextMood: Mood) {
    setDidSaveSelection(false);
    setActiveTool(null);
    setMood((prev) => (prev === nextMood ? null : nextMood));
  }

  function handleToolToggle(index: number) {
    setDidSaveSelection(false);
    setActiveTool((prev) => (prev === index ? null : index));
  }

  function confirmResetChoice() {
    if (!mood) return;

    saveLastMood(mood);
    appendMoodLog(mood);
    setDidSaveSelection(true);
  }

  return (
    <div className="space-y-5 pb-8">
      <section className="space-y-1.5">
        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[rgb(var(--primary))]">
          Calm Corner
        </p>

        <h1 className="text-[2.45rem] font-black leading-[0.94] tracking-[-0.055em] text-[rgb(var(--text))]">
          Choose a reset
        </h1>

        <p className="max-w-[31ch] text-[0.98rem] leading-relaxed text-[rgb(var(--muted))]">
          Pick what feels true, then try one small support tool.
        </p>
      </section>

      <section className="calm-card space-y-4" aria-labelledby="mood-picker">
        <div>
          <h2 id="mood-picker" className="calm-section-title">
            What’s happening?
          </h2>
          <p className="calm-section-copy">
            Choose the feeling that fits best right now.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {MOODS.map((item) => {
            const active = item.id === mood;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMoodToggle(item.id)}
                aria-pressed={active}
                aria-label={`${item.id}. ${item.helper}${
                  active ? ". Selected." : ""
                }`}
                className={[
                  "mood-card focus-ring",
                  toneBg[item.tone],
                  active ? "is-active" : "",
                ].join(" ")}
              >
                <span className="mood-card-icon" aria-hidden="true">
                  {item.emoji}
                </span>

                <span className="mood-card-title">{item.id}</span>
                <span className="mood-card-copy">{item.helper}</span>
              </button>
            );
          })}
        </div>

        {mood && (
          <button
            type="button"
            onClick={clearSelections}
            className="change-choice-button focus-ring"
          >
            Change feeling
          </button>
        )}
      </section>

      {mood && (
        <section className="calm-card space-y-4" aria-labelledby="reset-tools">
          <div>
            <h2 id="reset-tools" className="calm-section-title">
              Try one small reset
            </h2>
            <p className="calm-section-copy">
              Choose the tool that feels easiest to start.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool, index) => {
              const active = index === activeTool;
              const chipTone: Tone = tool.tone ?? selectedMoodMeta?.tone ?? "sky";

              return (
                <button
                  key={tool.title}
                  type="button"
                  onClick={() => handleToolToggle(index)}
                  aria-pressed={active}
                  className={[
                    "reset-tool-button focus-ring",
                    active ? "is-active" : "",
                  ].join(" ")}
                >
                  <span
                    className={["reset-tool-title", toneText[chipTone]].join(
                      " "
                    )}
                  >
                    {tool.title}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedReset && (
            <div className="reset-detail-card">
              <p className="reset-detail-kicker">Selected reset</p>
              <p className="reset-detail-title">{selectedReset.title}</p>

              <ol className="reset-steps">
                {selectedReset.steps.map((step, index) => (
                  <li key={step}>
                    <span className="reset-step-number">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={clearSelections}
                  className="btn-secondary"
                >
                  New choices
                </button>

                <button
                  type="button"
                  onClick={confirmResetChoice}
                  className="btn-primary"
                >
                  I&apos;ll try this
                </button>
              </div>

              {didSaveSelection && (
                <p className="saved-note" role="status">
                  Saved for parent view.
                </p>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}