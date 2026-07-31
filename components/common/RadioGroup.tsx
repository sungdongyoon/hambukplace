import React from "react";

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  groupClassName?: string;
  labelClassName?: string;
};

const RadioGroup = ({
  name,
  value,
  options,
  onChange,
  groupClassName,
  labelClassName,
}: RadioGroupProps) => {
  return (
    <div className="flex items-center gap-3">
      {options.map((option) => {
        const id = `${name}-${option.value}`;

        return (
          <div
            key={option.value}
            className={`flex items-center gap-1 ${groupClassName}`}
          >
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <label
              htmlFor={id}
              className={`text-[0.9rem] font-medium ${labelClassName}`}
            >
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioGroup;
