// src/lib/calm-corner-data.ts

export type Tone = "sky" | "mint" | "sun" | "lav" | "rose";

export type Mood =
  | "Upset"
  | "Overwhelmed"
  | "Tired"
  | "Wiggly"
  | "Sad"
  | "Anxious";

export type MoodMeta = {
  id: Mood;
  emoji: string;
  tone: Tone;
  helper: string;
};

export type ResetTool = {
  title: string;
  steps: string[];
  note?: string;
  tone?: Tone;
};

export type ParentScript = {
  title: string;
  lines: string[];
  tip?: string;
};

export const KID_NAME = "Your Kid";

export const MOODS: MoodMeta[] = [
  { id: "Overwhelmed", emoji: "🌪️", tone: "sky", helper: "Too much at once." },
  { id: "Upset", emoji: "🔥", tone: "sun", helper: "Big feelings are here." },
  { id: "Tired", emoji: "😴", tone: "lav", helper: "Low energy mode." },
  { id: "Wiggly", emoji: "🐒", tone: "mint", helper: "Need to move it out." },
  { id: "Sad", emoji: "🌧️", tone: "rose", helper: "Need comfort + softness." },
  { id: "Anxious", emoji: "😟", tone: "sky", helper: "Worried + tight body." },
];

export const TOOLSETS: Record<Mood, ResetTool[]> = {
  Upset: [
    {
      title: "Cold water reset",
      tone: "sky",
      steps: ["Sip cold water", "Hold cup with both hands", "Slow exhale 3 times"],
    },
    {
      title: "Squeeze + release",
      tone: "mint",
      steps: ["Squeeze hands tight for 3 seconds", "Release for 3 seconds", "Repeat 5 times"],
    },
    {
      title: "Name 5 things",
      tone: "lav",
      steps: ["5 things you see", "4 things you feel", "3 things you hear"],
    },
    {
      title: "Pillow press",
      tone: "rose",
      steps: ["Hold a pillow tight", "Press for 10 seconds", "Take 3 slow breaths"],
    },
  ],
  Overwhelmed: [
    {
      title: "Lower the noise",
      tone: "lav",
      steps: ["Turn lights down", "Reduce sound", "One small step only"],
    },
    {
      title: "Body pressure",
      tone: "mint",
      steps: ["Wrap in blanket", "Bear hug for 10 seconds", "Unclench jaw + shoulders"],
    },
    {
      title: "Break the task",
      tone: "sun",
      steps: ["Pick the first step", "Do it for 60 seconds", "Pause + check in"],
    },
    {
      title: "Quiet corner",
      tone: "rose",
      steps: ["Sit somewhere soft", "Look at one calm thing", "Take 3 slow breaths"],
    },
  ],
  Tired: [
    {
      title: "Micro rest",
      tone: "lav",
      steps: ["Sit down", "Take 3 slow breaths", "Take a small sip of water"],
    },
    {
      title: "Gentle stretch",
      tone: "mint",
      steps: ["Shoulder rolls", "Neck side stretch", "Shake arms out"],
    },
    {
      title: "Fuel check",
      tone: "sun",
      steps: ["Snack if hungry", "Water if thirsty", "Bathroom if needed"],
    },
    {
      title: "Cozy reset",
      tone: "rose",
      steps: ["Get something soft", "Sit for one minute", "Rest your body"],
    },
  ],
  Wiggly: [
    {
      title: "Wall pushes",
      tone: "mint",
      steps: ["Hands on wall", "Push for 10 seconds", "Rest 5 seconds", "Repeat 3 times"],
    },
    {
      title: "Shake it out",
      tone: "sky",
      steps: ["Shake hands", "Shake legs", "Big stretch"],
    },
    {
      title: "Animal walk",
      tone: "sun",
      steps: ["Bear walk 10 steps", "Crab walk 10 steps", "Stop + breathe"],
    },
    {
      title: "Jump count",
      tone: "lav",
      steps: ["Do 10 jumps", "Pause", "Take 2 slow breaths"],
    },
  ],
  Sad: [
    {
      title: "Comfort object",
      tone: "rose",
      steps: ["Pick a soft thing", "Hold it close", "Slow exhale 3 times"],
    },
    {
      title: "Tiny kindness",
      tone: "lav",
      steps: ["Pick one small comfort", "Do it now", "Say “that helped a little”"],
    },
    {
      title: "Music reset",
      tone: "sky",
      steps: ["One calm song", "Sit together", "Breathe with the beat"],
    },
    {
      title: "Warm drink pause",
      tone: "sun",
      steps: ["Hold a warm drink or cup", "Take one sip", "Rest for a moment"],
    },
  ],
  Anxious: [
    {
      title: "Breathe with fingers",
      tone: "sky",
      steps: ["Trace 5 fingers slowly", "Inhale up, exhale down", "Repeat once"],
    },
    {
      title: "Feet on the floor",
      tone: "lav",
      steps: ["Press feet down", "Feel toes + heels", "Slow exhale 3 times"],
    },
    {
      title: "Worry to words",
      tone: "sun",
      steps: ["Name the worry", "Name 1 safe thing", "Pick 1 tiny next step"],
    },
    {
      title: "Hand on heart",
      tone: "rose",
      steps: ["Put hand on chest", "Breathe in slowly", "Say “I am safe right now”"],
    },
  ],
};

export const PARENT_SCRIPTS: Record<Mood, ParentScript> = {
  Overwhelmed: {
    title: "When it’s too much",
    lines: [
      "I see it’s a lot right now.",
      "You’re safe.",
      "We’re going to do one small step together.",
      "You’re not in trouble.",
    ],
    tip: "Lower input: lights down, fewer words, one step only.",
  },
  Upset: {
    title: "When feelings are big",
    lines: [
      "I see you’re really upset.",
      "You’re safe with me.",
      "It’s okay to feel this.",
      "Let’s do one small reset together.",
    ],
    tip: "Keep your voice low + steady. Name the feeling, not the behavior.",
  },
  Tired: {
    title: "When energy is low",
    lines: [
      "Your body looks tired.",
      "You’re safe.",
      "We can slow down.",
      "Let’s do one small thing, then rest.",
    ],
    tip: "Offer water/snack/bathroom first — basic needs check.",
  },
  Wiggly: {
    title: "When the body needs movement",
    lines: [
      "Your body needs to move right now.",
      "That’s okay.",
      "Let’s do a safe movement reset.",
      "Then we’ll try the next step.",
    ],
    tip: "Give a “yes”: push, jump, wall press — then transition.",
  },
  Sad: {
    title: "When it feels heavy",
    lines: [
      "I see you’re feeling sad.",
      "You’re safe.",
      "I’m here with you.",
      "We can do something small and soft.",
    ],
    tip: "Connection first: sit close, comfort object, gentle tone.",
  },
  Anxious: {
    title: "When worry takes over",
    lines: [
      "That worry feels big right now.",
      "You’re safe.",
      "We can help your body feel calmer.",
      "One tiny step is enough.",
    ],
    tip: "Grounding works: feet on floor + simple choices.",
  },
};

export const toneBg: Record<Tone, string> = {
  sky: "bg-sky-soft",
  mint: "bg-mint-soft",
  sun: "bg-sun-soft",
  lav: "bg-lav-soft",
  rose: "bg-rose-soft",
};

export const toneText: Record<Tone, string> = {
  sky: "text-sky",
  mint: "text-mint",
  sun: "text-sun",
  lav: "text-lav",
  rose: "text-rose",
};