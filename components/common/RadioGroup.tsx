import React from "react";

type RadioOption<T extends string> = {
  label: string;
  value: T;
};

type RadioGroupProps<T extends string> = {
  name: string;
  value: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
  groupClassName?: string;
  labelClassName?: string;
};

const RadioGroup = <T extends string>({
  name,
  value,
  options,
  onChange,
  groupClassName,
  labelClassName,
}: RadioGroupProps<T>) => {
  return (
    <div className="flex items-center gap-4">
      {options.map((option) => {
        const id = `${name}-${option.value}`;

        return (
          <div
            key={option.value}
            className={`flex items-center gap-2 ${groupClassName}`}
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
              className={`text-[0.9rem] font-medium cursor-pointer ${labelClassName}`}
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
