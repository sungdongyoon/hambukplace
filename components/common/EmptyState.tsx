import React from "react";
import { twMerge } from "tailwind-merge";

const EmptyState = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        `w-full h-full min-h-20 flex justify-center items-center border border-line-normal-neutral rounded-lg ${className}`,
      )}
    >
      <p className="font-semibold text-[0.6rem] xs:text-[0.8rem]">{message}</p>
    </div>
  );
};

export default EmptyState;
