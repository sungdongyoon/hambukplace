"use client";

import React, { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

const BREAKPOINTS = [
  { min: 360, name: "2xs" },
  { min: 480, name: "xs" },
  { min: 768, name: "sm" },
  { min: 992, name: "md" },
  { min: 1200, name: "lg" },
  { min: 1600, name: "xl" },
] as const;

const getBreakpoint = (width: number) => {
  for (let i = BREAKPOINTS.length - 1; i >= 0; i--) {
    const current = BREAKPOINTS[i];

    if (width >= current.min) {
      const next = BREAKPOINTS[i + 1];

      return next
        ? `${current.name} (${current.min}px ~ ${next.min}px 미만)`
        : `${current.name} (${current.min}px 이상)`;
    }
  }

  return `base (${BREAKPOINTS[0].min}px 미만)`;
};

const ViewBreakPoint = ({ className }: { className?: string }) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  const breakPoint = getBreakpoint(width);

  if (width === 0) return null;

  return (
    <div
      className={twMerge(
        `fixed top-3 left-3 bg-black text-white text-[0.8rem] w-max max-w-[calc(100vw-24px)] px-6 py-3 rounded-lg z-10 ${className}`,
      )}
    >
      <p>너비 : {width}px</p>
      <p>Break Point : {breakPoint}</p>
    </div>
  );
};

export default ViewBreakPoint;
