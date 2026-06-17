// src/app/rewards/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Reward = {
  id: string;
  title: string;
  emoji: string;
  helper: string;
};

type RewardLog = {
  rewardId: string | null;
  rewardTitle: string | null;
  ts: number;
};

const REWARD_LOG_KEY = "pkh_reward_logs";

const REWARDS: Reward[] = [
  {
    id: "r1",
    title: "Sticker or stamp",
    emoji: "🏷️",
    helper: "A small mark of effort.",
  },
  {
    id: "r2",
    title: "Choice time",
    emoji: "🎮",
    helper: "Five minutes to choose.",
  },
  {
    id: "r3",
    title: "Snack or treat",
    emoji: "🍓",
    helper: "A gentle food reward.",
  },
  {
    id: "r4",
    title: "Dance break",
    emoji: "🕺",
    helper: "Move and celebrate.",
  },
  {
    id: "r5",
    title: "Story time",
    emoji: "📚",
    helper: "Read something cozy.",
  },
  {
    id: "r6",
    title: "Outside walk",
    emoji: "🌿",
    helper: "Step outside together.",
  },
];

function saveRewardChoice(reward: Reward | null) {
  try {
    const raw = window.localStorage.getItem(REWARD_LOG_KEY);
    const previous: RewardLog[] = raw ? JSON.parse(raw) : [];

    const next: RewardLog = {
      rewardId: reward?.id ?? null,
      rewardTitle: reward?.title ?? null,
      ts: Date.now(),
    };

    window.localStorage.setItem(
      REWARD_LOG_KEY,
      JSON.stringify([next, ...previous].slice(0, 50))
    );
  } catch {
    // Ignore localStorage failures in demo mode.
  }
}

export default function RewardsPage() {
  const router = useRouter();
  const [picked, setPicked] = useState<string | null>(null);

  const pickedReward = useMemo(
    () => REWARDS.find((reward) => reward.id === picked) ?? null,
    [picked]
  );

  function toggleReward(id: string) {
    setPicked((current) => (current === id ? null : id));
  }

  function finishRewards() {
    saveRewardChoice(pickedReward);
    router.push("/");
  }

  return (
    <div className="space-y-4 pb-8">
      <section className="space-y-1.5">
        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[rgb(var(--primary))]">
          Rewards
        </p>

        <h1 className="text-[2.45rem] font-black leading-[0.94] tracking-[-0.055em] text-[rgb(var(--text))]">
          Pick a gentle win
        </h1>

        <p className="max-w-[31ch] text-[0.98rem] leading-relaxed text-[rgb(var(--muted))]">
          Celebrate effort without pressure. You can also skip for now.
        </p>
      </section>

      <div className="sr-only" aria-live="polite">
        {pickedReward
          ? `Reward selected: ${pickedReward.title}`
          : "No reward selected"}
      </div>

      <section
        aria-labelledby="reward-options"
        className="space-y-4 rounded-[1.5rem] p-4"
        style={{
          border: "1px solid rgb(var(--border) / 0.18)",
          background: "rgb(var(--card) / 0.84)",
          boxShadow:
            "0 1px 2px rgb(var(--shadow) / 0.035), 0 10px 22px rgb(var(--shadow) / 0.05)",
        }}
      >
        <div>
          <h2
            id="reward-options"
            className="text-base font-extrabold leading-tight tracking-[-0.025em] text-[rgb(var(--text))]"
          >
            Choose one reward
          </h2>

          <p className="mt-1 text-sm leading-snug text-[rgb(var(--muted))]">
            Pick what feels good for this moment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {REWARDS.map((reward) => {
            const active = picked === reward.id;

            return (
              <button
                key={reward.id}
                type="button"
                onClick={() => toggleReward(reward.id)}
                aria-pressed={active}
                aria-label={`${reward.title}. ${reward.helper}${
                  active ? ". Selected. Press again to deselect." : ""
                }`}
                className="focus-ring relative flex min-h-[6.7rem] flex-col items-start gap-2.5 rounded-[1.2rem] p-3 text-left"
                style={{
                  border: active
                    ? "1px solid rgb(var(--primary) / 0.42)"
                    : "1px solid rgb(var(--border) / 0.14)",
                  background: active
                    ? "rgb(var(--primary-soft) / 0.92)"
                    : "rgb(var(--card-strong) / 0.72)",
                  boxShadow: active
                    ? "inset 0 0 0 2px rgb(var(--primary) / 0.1)"
                    : "none",
                }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-[0.85rem] text-base leading-none"
                  style={{
                    background: "rgb(var(--sun-soft) / 0.86)",
                  }}
                  aria-hidden="true"
                >
                  {reward.emoji}
                </span>

                <span className="block pr-5">
                  <span className="block text-[0.95rem] font-extrabold leading-tight tracking-[-0.025em] text-[rgb(var(--text))]">
                    {reward.title}
                  </span>

                  <span className="mt-1 block text-[0.8rem] leading-snug text-[rgb(var(--muted))]">
                    {reward.helper}
                  </span>
                </span>

                <span
                  className="absolute right-3 top-3 flex h-5.5 w-5.5 items-center justify-center rounded-full border text-[0.7rem] font-black"
                  style={{
                    width: "1.35rem",
                    height: "1.35rem",
                    borderColor: active
                      ? "rgb(var(--primary))"
                      : "rgb(var(--border) / 0.28)",
                    background: active ? "rgb(var(--primary))" : "transparent",
                    color: active
                      ? "rgb(var(--text-on-primary))"
                      : "transparent",
                  }}
                  aria-hidden="true"
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="reward-feedback"
        className="rounded-[1.35rem] p-4"
        style={{
          border: "1px solid rgb(var(--border) / 0.16)",
          background:
            "linear-gradient(180deg, rgb(var(--sun-soft) / 0.78), rgb(var(--primary-soft) / 0.62))",
        }}
      >
        <p className="text-xs font-black uppercase tracking-[0.08em] text-[rgb(var(--primary))]">
          Effort noticed
        </p>

        <h2
          id="reward-feedback"
          className="mt-1 text-[1.2rem] font-black leading-tight tracking-[-0.035em] text-[rgb(var(--text))]"
        >
          {pickedReward ? "Nice work choosing gently." : "Good work showing up."}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">
          {pickedReward
            ? `You picked ${pickedReward.emoji} ${pickedReward.title}.`
            : "No reward is needed to make the effort count."}
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => router.back()}
        >
          Back
        </button>

        <button type="button" className="btn-primary" onClick={finishRewards}>
          Done
        </button>
      </div>
    </div>
  );
}