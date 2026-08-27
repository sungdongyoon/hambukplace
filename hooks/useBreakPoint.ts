"use client";

import { useEffect, useState } from "react";

const BREAKPOINTS = {
  "2xs": 360,
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1600,
} as const;

type BreakPointKey = keyof typeof BREAKPOINTS;

export const useBreakPoint = (breakPoint: BreakPointKey) => {
  const [isBreakPoint, setIsBreakPoint] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${BREAKPOINTS[breakPoint] - 1}px)`,
    );

    const handleChange = () => {
      setIsBreakPoint(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isBreakPoint;
};
