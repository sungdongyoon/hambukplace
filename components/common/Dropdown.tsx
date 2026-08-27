import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type DropdownType = {
  className?: string;
  list: {
    label: string;
    href: string;
  }[];
};

const Dropdown = ({ className, list }: DropdownType) => {
  return (
    <div className={twMerge(`w-40 absolute right-0 z-10 ${className}`)}>
      <ul className="bg-white rounded-lg shadow-2xl">
        {list.map((el, idx) => (
          <li
            key={idx}
            className="border-b border-line-normal-neutral last:border-0"
          >
            <Link
              href={el.href}
              className="px-4 py-2 block text-[0.8rem] font-medium"
            >
              {el.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
