import { cn } from "@/lib/utils";

export function BackgroundGrid() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#3a3730_1px,transparent_1px),linear-gradient(to_bottom,#3a3730_1px,transparent_1px)]",
        )}
      />
      <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
}
