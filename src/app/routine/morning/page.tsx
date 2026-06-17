// src/app/routine/morning/page.tsx
"use client";

import TimerPill from "@/components/timer-pill";
import RoutineChecklist, { RoutineStep } from "@/components/routine-checklist";

const STEPS: RoutineStep[] = [
  { id: "1", text: "Bathroom", emoji: "🚽" },
  { id: "2", text: "Brush teeth + wash face", emoji: "🦷" },
  { id: "3", text: "Get dressed", emoji: "👕" },
  { id: "4", text: "Breakfast", emoji: "🍳" },
  { id: "5", text: "Shoes + backpack", emoji: "🎒" },
];

export default function MorningRoutinePage() {
  return (
    <div className="space-y-5 pb-8">
      <section className="space-y-1.5">
        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[rgb(var(--primary))]">
          Routine
        </p>

        <h1 className="text-[2.65rem] font-black leading-[0.92] tracking-[-0.06em] text-[rgb(var(--text))]">
          Morning
        </h1>

        <p className="max-w-[31ch] text-[0.98rem] leading-relaxed text-[rgb(var(--muted))]">
          Move through one step at a time. Restart whenever you need.
        </p>
      </section>

      <TimerPill
        label="Transition Timer"
        defaultMinutes={10}
        minMinutes={1}
        maxMinutes={30}
      />

      <RoutineChecklist
        steps={STEPS}
        finishHref="/rewards"
        doneTitle="Morning complete"
        doneMessage="Nice work. You’re ready for the next part of the day."
      />
    </div>
  );
}