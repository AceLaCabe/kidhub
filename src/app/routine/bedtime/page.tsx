// src/app/routine/bedtime/page.tsx
"use client";

import TimerPill from "@/components/timer-pill";
import RoutineChecklist, { RoutineStep } from "@/components/routine-checklist";

const STEPS: RoutineStep[] = [
  { id: "1", text: "Pajamas", emoji: "🌙" },
  { id: "2", text: "Brush teeth + wash face", emoji: "🦷" },
  { id: "3", text: "Pick tomorrow’s clothes", emoji: "👕" },
  { id: "4", text: "Quiet activity", emoji: "📖" },
  { id: "5", text: "Lights down", emoji: "💤" },
];

export default function BedtimeRoutinePage() {
  return (
    <div className="space-y-5 pb-8">
      <section className="space-y-1.5">
        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[rgb(var(--primary))]">
          Routine
        </p>

        <h1 className="text-[2.45rem] font-black leading-[0.94] tracking-[-0.055em] text-[rgb(var(--text))]">
          Bedtime
        </h1>

        <p className="max-w-[31ch] text-[0.98rem] leading-relaxed text-[rgb(var(--muted))]">
          Slow is okay. Calm is the goal.
        </p>
      </section>

      <TimerPill
        label="Bedtime Timer"
        defaultMinutes={5}
        minMinutes={1}
        maxMinutes={30}
      />

      <RoutineChecklist
        steps={STEPS}
        doneTitle="Bedtime complete"
        doneMessage="You worked hard today. Rest time."
        finishHref="/"
      />
    </div>
  );
}