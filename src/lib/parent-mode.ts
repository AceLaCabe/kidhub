// src/lib/parent-mode.ts

export const PARENT_UNLOCK_KEY = "pkh_parent_unlocked";

export function isParentUnlocked() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(PARENT_UNLOCK_KEY) === "true";
}

export function unlockParentMode() {
  window.localStorage.setItem(PARENT_UNLOCK_KEY, "true");
}

export function lockParentMode() {
  window.localStorage.removeItem(PARENT_UNLOCK_KEY);
}