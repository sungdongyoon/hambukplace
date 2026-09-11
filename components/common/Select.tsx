import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type SelectPropsType = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  defaultLabel: string;
  option: {
    label: string;
    value: string;
  }[];
};

const Select = ({
  className,
  option,
  defaultLabel,
  ...props
}: SelectPropsType) => {
  return (
    <div className="relative inline-flex shrink-0">
      <select
        value=""
        {...props}
        className={twMerge(
          `h-9 w-full rounded-md appearance-none border border-line-normal-alternative bg-background-normal-normal pl-3 pr-9 text-[0.8rem] text-label-normal cursor-pointer ${className}`,
        )}
      >
        <option value="" disabled>
          {defaultLabel}
        </option>
        {option.map((el) => (
          <option key={el.value} value={el.value}>
            {el.label}
          </option>
        ))}
      </select>

      <FaChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[0.7rem] text-label-neutral"
      />
    </div>
  );
};

export default Select;
