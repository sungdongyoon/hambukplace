import React from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonType = "normal" | "outline";

type ButtonProps = {
  children: React.ReactNode;
  size?: ButtonSize;
  className?: string;
  type?: ButtonType;
};

const Button = ({
  children,
  size = "md",
  className,
  type = "normal",
}: ButtonProps) => {
  // 버튼 사이즈
  const buttonSize: Record<ButtonSize, string> = {
    sm: "h-7 px-3.5 text-[0.8rem]",
    md: "h-8 px-4 text-[14px]",
    lg: "h-9 px-5 text-[14px]",
  };

  // 버튼 타입
  const buttonType: Record<ButtonType, string> = {
    normal: "bg-primary-normal text-white",
    outline: "border border-line-normal-normal text-label-neutral",
  };

  return (
    <button
      className={`inline-flex justify-center items-center leading-none rounded-md cursor-pointer ${buttonSize[size]} ${buttonType[type]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
