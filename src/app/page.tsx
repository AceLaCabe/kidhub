// src/app/page.tsx
import CardLink from "@/components/card-link";

const supportTools = [
  {
    href: "/routine/morning",
    title: "Morning",
    description: "Start the day one step at a time.",
    emoji: "🌤️",
    tone: "sun" as const,
  },
  {
    href: "/calm-corner",
    title: "Calm",
    description: "Breathing, grounding, and reset tools.",
    emoji: "😌",
    tone: "mint" as const,
  },
  {
    href: "/routine/bedtime",
    title: "Bedtime",
    description: "A soft wind-down before sleep.",
    emoji: "🌙",
    tone: "lav" as const,
  },
  {
    href: "/rewards",
    title: "Rewards",
    description: "Celebrate effort without pressure.",
    emoji: "⭐",
    tone: "rose" as const,
  },
];

export default function HomePage() {
  return (
    <main className="space-y-5">
      <section className="space-y-1.5">
        <h1 className="page-title">What do you need?</h1>
        <p className="page-subtitle">Choose one gentle support path.</p>
      </section>

      <section aria-label="Support tools">
        <div className="grid grid-cols-2 gap-3">
          {supportTools.map((tool) => (
            <CardLink
              key={tool.href}
              href={tool.href}
              title={tool.title}
              description={tool.description}
              emoji={tool.emoji}
              tone={tool.tone}
            />
          ))}
        </div>
      </section>
    </main>
  );
}