import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonSize = "xs" | "sm" | "md" | "lg";
type ButtonVariant = "normal" | "outline";

type CommonProps = {
  children: React.ReactNode;
  size?: ButtonSize;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonProps = CommonProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (Omit<React.ComponentProps<typeof Link>, "href"> & { href: string })
  );

const buttonSize: Record<ButtonSize, string> = {
  xs: "h-5 px-2.5 text-[0.6rem]",
  sm: "h-7 px-3.5 text-[0.8rem]",
  md: "h-8 px-4 text-[14px]",
  lg: "h-9 px-5 text-[14px]",
};

const buttonType: Record<ButtonVariant, string> = {
  normal: "bg-primary-normal text-white",
  outline: "border border-line-normal-normal text-label-neutral",
};

const Button = ({
  children,
  size = "md",
  className,
  variant = "normal",
  ...props
}: ButtonProps) => {
  const mergedClassName = twMerge(
    "inline-flex justify-center items-center leading-none rounded-md cursor-pointer",
    buttonSize[size],
    buttonType[variant],
    className,
  );

  if (props.href !== undefined) {
    return (
      <Link {...props} className={mergedClassName}>
        {children}
      </Link>
    );
  }

  const { href, type = "button", ...buttonProps } = props;

  return (
    <button {...buttonProps} type={type} className={mergedClassName}>
      {children}
    </button>
  );
};

export default Button;
