import React, { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

const BREAKPOINTS = [
  { max: 360, name: "2xs" },
  { max: 480, name: "xs" },
  { max: 768, name: "sm" },
  { max: 992, name: "md" },
  { max: 1200, name: "lg" },
  { max: 1600, name: "xl" },
] as const;

const getBreakpoint = (width: number) => {
  return BREAKPOINTS.find((breakpoint) => width <= breakpoint.max)?.name ?? "";
};

const ViewBreakPoint = ({ className }: { className?: string }) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setWidth(window.innerWidth);

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  const breakPoint = useMemo(() => getBreakpoint(width), [width]);

  if (width === 0) return null;

  return (
    <div
      className={twMerge(
        `fixed top-3 left-3 bg-black text-white text-[0.8rem] w-42.5 px-6 py-3 rounded-lg z-10 ${className}`,
      )}
    >
      <p>너비 : {width}px</p>
      <p>Break Point : {breakPoint}</p>
    </div>
  );
};

export default ViewBreakPoint;
