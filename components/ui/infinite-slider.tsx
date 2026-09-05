"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InfiniteSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  speed?: number;
  speedOnHover?: number;
}

export function InfiniteSlider({
  children,
  gap = 24,
  direction = "vertical",
  reverse = false,
  speed = 35,
  speedOnHover = 15,
  className,
  style,
  ...props
}: InfiniteSliderProps) {
  const isVertical = direction === "vertical";

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        isVertical ? "flex-col max-h-[640px]" : "flex-row max-w-full",
        className
      )}
      style={{
        ...style,
      }}
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0",
          isVertical ? "flex-col animate-marquee-y" : "flex-row animate-marquee-x",
          "group-hover:[animation-play-state:paused]"
        )}
        style={{
          gap: `${gap}px`,
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0",
          isVertical ? "flex-col animate-marquee-y" : "flex-row animate-marquee-x",
          "group-hover:[animation-play-state:paused]"
        )}
        style={{
          gap: `${gap}px`,
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
          marginTop: isVertical ? `${gap}px` : undefined,
          marginLeft: !isVertical ? `${gap}px` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default InfiniteSlider;
