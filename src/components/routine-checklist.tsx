// src/components/routine-checklist.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type RoutineStep = {
  id: string;
  text: string;
  emoji?: string;
};

type RoutineChecklistProps = {
  steps: RoutineStep[];
  onFinish?: () => void;
  finishHref?: string;
  doneTitle?: string;
  doneMessage?: string;
};

export default function RoutineChecklist({
  steps,
  onFinish,
  finishHref = "/rewards",
  doneTitle = "All done",
  doneMessage = "Nice work finishing your routine.",
}: RoutineChecklistProps) {
  const router = useRouter();
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());

  const completedCount = doneIds.size;
  const totalCount = steps.length;
  const remaining = totalCount - completedCount;
  const allDone = totalCount > 0 && completedCount === totalCount;
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  function toggleStep(id: string) {
    setDoneIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function resetAll() {
    setDoneIds(new Set());
  }

  function finish() {
    if (!allDone) return;
    onFinish?.();
    router.push(finishHref);
  }

  return (
    <section className="routine-card space-y-4" aria-label="Routine checklist">
      <div className="sr-only" aria-live="polite">
        {allDone ? "All steps completed" : `${remaining} steps remaining`}
      </div>

      <div className="space-y-2">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="routine-section-title">Today&apos;s steps</h2>
            <p className="routine-section-copy">
              Tap each step when it&apos;s done.
            </p>
          </div>

          <p className="routine-progress-number">{progress}%</p>
        </div>

        <div className="routine-progress-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <ul className="m-0 list-none space-y-2.5 p-0">
        {steps.map((step, index) => {
          const checked = doneIds.has(step.id);

          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => toggleStep(step.id)}
                aria-pressed={checked}
                aria-label={`${step.text}. Step ${index + 1} of ${totalCount}. ${
                  checked ? "Completed" : "Not completed"
                }`}
                data-complete={checked}
                className="routine-step-button focus-ring"
              >
                <span className="routine-step-emoji" aria-hidden="true">
                  {step.emoji ?? "✓"}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="routine-step-count">
                    Step {index + 1} of {totalCount}
                  </span>
                  <span className="routine-step-name">{step.text}</span>
                </span>

                <span className="routine-step-check" aria-hidden="true">
                  {checked ? "✓" : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {allDone && (
        <div className="routine-complete-card" role="status">
          <h2>{doneTitle}</h2>
          <p>{doneMessage}</p>
        </div>
      )}

      <div className="space-y-2 pt-1">
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="btn-secondary" onClick={resetAll}>
            Reset
          </button>

          <button
            type="button"
            className="btn-primary disabled:opacity-45"
            onClick={finish}
            disabled={!allDone}
            aria-disabled={!allDone}
          >
            Finish
          </button>
        </div>

        {!allDone && (
          <p className="routine-footer-note">
            {remaining} step{remaining !== 1 ? "s" : ""} left
          </p>
        )}
      </div>
    </section>
  );
}