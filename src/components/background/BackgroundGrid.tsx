import { cn } from "@/lib/utils";

export function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-0",
        "[background-size:24px_24px]",
        "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
      )}
    />
  );
}
