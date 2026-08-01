import React from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "normal" | "outline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: ButtonSize;
  className?: string;
  variant?: ButtonVariant;
};

const Button = ({
  children,
  size = "md",
  className,
  variant = "normal",
  ...props
}: ButtonProps) => {
  // 버튼 사이즈
  const buttonSize: Record<ButtonSize, string> = {
    sm: "h-7 px-3.5 text-[0.8rem]",
    md: "h-8 px-4 text-[14px]",
    lg: "h-9 px-5 text-[14px]",
  };

  // 버튼 타입
  const buttonType: Record<ButtonVariant, string> = {
    normal: "bg-primary-normal text-white",
    outline: "border border-line-normal-normal text-label-neutral",
  };

  return (
    <button
      {...props}
      className={`inline-flex justify-center items-center leading-none rounded-md cursor-pointer ${buttonSize[size]} ${buttonType[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
