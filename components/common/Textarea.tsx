import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={`w-full min-h-24 resize-none px-2.5 py-2 text-[14px] text-label-normal border border-line-normal-neutral outline-none rounded-md focus:border-primary-normal ${className}`}
      {...props}
    />
  );
};

export default Textarea;
