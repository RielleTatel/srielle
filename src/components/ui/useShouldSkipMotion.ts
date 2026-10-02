"use client";

import { useSyncExternalStore } from "react";

const query =
  "(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export function useShouldSkipMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
