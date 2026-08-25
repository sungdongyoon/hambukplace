import React from "react";
import { twMerge } from "tailwind-merge";

const PageTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={twMerge(
        `text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] font-semibold mb-6 ${className}`,
      )}
    >
      {children}
    </h2>
  );
};

export default PageTitle;
