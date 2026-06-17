// src/components/parent-gate.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PARENT_UNLOCK_KEY = "pkh_parent_unlocked";

export function unlockParentMode() {
  window.localStorage.setItem(PARENT_UNLOCK_KEY, "true");
}

export function lockParentMode() {
  window.localStorage.removeItem(PARENT_UNLOCK_KEY);
}

export default function ParentGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<"checking" | "locked" | "unlocked">(
    "checking"
  );

  useEffect(() => {
    const unlocked =
      window.localStorage.getItem(PARENT_UNLOCK_KEY) === "true";

    setStatus(unlocked ? "unlocked" : "locked");
  }, []);

  if (status === "checking") {
    return (
      <div className="calm-card">
        <p className="calm-section-title">Checking parent mode…</p>
      </div>
    );
  }

  if (status === "locked") {
    return (
      <div className="calm-card space-y-4 text-center">
        <div>
          <p className="calm-section-title">Parent mode is locked</p>
          <p className="calm-section-copy">
            Unlock parent mode to view support scripts and saved mood notes.
          </p>
        </div>

        <Link href="/parent" className="btn-primary w-full">
          Unlock parent mode
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}