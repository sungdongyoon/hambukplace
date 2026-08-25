import React from "react";
import { twMerge } from "tailwind-merge";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={twMerge(
        `w-full h-8 px-2.5 text-[14px] text-label-normal border border-line-normal-neutral outline-none rounded-md focus:border-primary-normal ${className}`,
      )}
    />
  );
};

export default Input;
