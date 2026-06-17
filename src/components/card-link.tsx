// src/components/card-link.tsx
import Link from "next/link";

type Tone = "sky" | "mint" | "sun" | "lav" | "rose";

const toneClasses: Record<Tone, string> = {
  sky: "bg-sky-soft text-sky",
  mint: "bg-mint-soft text-mint",
  sun: "bg-sun-soft text-sun",
  lav: "bg-lav-soft text-lav",
  rose: "bg-rose-soft text-rose",
};

type CardLinkProps = {
  href: string;
  title: string;
  description: string;
  emoji: string;
  disabled?: boolean;
  tone?: Tone;
};

export default function CardLink({
  href,
  title,
  description,
  emoji,
  disabled = false,
  tone = "sky",
}: CardLinkProps) {
  const className = [
    "kid-card group",
    toneClasses[tone],
    disabled ? "kid-card-disabled" : "kid-card-interactive focus-ring",
  ].join(" ");

  const content = (
    <>
      <div className="kid-card-icon" aria-hidden="true">
        {emoji}
      </div>

      <div className="space-y-1.5">
        <h3 className="kid-card-title">{title}</h3>
        <p className="kid-card-copy">{description}</p>
      </div>
    </>
  );

  if (disabled) {
    return (
      <div
        aria-disabled="true"
        aria-label={`${title}. ${description}. Coming soon.`}
        className={className}
      >
        {content}
      </div>
    );
  }

  return (
    <Link href={href} aria-label={`${title}. ${description}`} className={className}>
      {content}
    </Link>
  );
}