import type { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Container({ children, className, ...rest }: ContainerProps) {
  return (
    <div
      className={twMerge("mx-auto w-full max-w-5xl px-6 sm:px-8", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
