// src/components/timer-pill.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLowStim } from "@/components/low-stim-provider";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function TimerPill({
  label = "Transition Timer",
  defaultMinutes = 10,
  minMinutes = 1,
  maxMinutes = 60,
  onComplete,
}: {
  label?: string;
  defaultMinutes?: number;
  minMinutes?: number;
  maxMinutes?: number;
  onComplete?: () => void;
}) {
  const { lowStim } = useLowStim();

  const [minutes, setMinutes] = useState(defaultMinutes);
  const totalSeconds = useMemo(() => minutes * 60, [minutes]);

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!running) {
      setSecondsLeft(totalSeconds);
      completedRef.current = false;
    }
  }, [minutes, totalSeconds, running]);

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (secondsLeft !== 0) return;

    if (running) setRunning(false);

    if (!completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [secondsLeft, running, onComplete]);

  const mm = Math.floor(secondsLeft / 60);
  const ss = secondsLeft % 60;

  const canDec = !running && minutes > minMinutes;
  const canInc = !running && minutes < maxMinutes;

  function resetTimer() {
    setRunning(false);
    setSecondsLeft(totalSeconds);
    completedRef.current = false;
  }

  return (
    <section className="timer-card" aria-label={label}>
      <div className="sr-only" aria-live="polite">
        {running
          ? `Timer running. ${mm} minutes and ${ss} seconds remaining.`
          : `Timer set to ${minutes} minutes.`}
      </div>

      <div className="timer-top">
        <div>
          <h2 className="timer-title">{label}</h2>
          <p className="timer-subtitle">
            {lowStim ? "Calm mode is on." : "Set a gentle transition window."}
          </p>
        </div>

        <div className="timer-display" aria-label={`${mm} minutes ${ss} seconds`}>
          {pad(mm)}:{pad(ss)}
        </div>
      </div>

      <div className="timer-bottom">
        <div className="timer-stepper">
          <button
            type="button"
            disabled={!canDec}
            onClick={() =>
              setMinutes((current) => Math.max(minMinutes, current - 1))
            }
            className="timer-stepper-button focus-ring"
            aria-label="Decrease minutes"
          >
            −
          </button>

          <span className="timer-minutes">{minutes} min</span>

          <button
            type="button"
            disabled={!canInc}
            onClick={() =>
              setMinutes((current) => Math.min(maxMinutes, current + 1))
            }
            className="timer-stepper-button focus-ring"
            aria-label="Increase minutes"
          >
            +
          </button>
        </div>

        <div className="timer-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setRunning((current) => !current)}
            aria-pressed={running}
          >
            {running ? "Pause" : "Start"}
          </button>

          <button type="button" className="btn-secondary" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}