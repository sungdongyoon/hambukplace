"use client";

import React, { useState } from "react";

type TabItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type TabProps = {
  info: TabItem[];
};

const Tabs = ({ info }: TabProps) => {
  const [activeItem, setActiveItem] = useState(info[0]?.id);

  const activeTab = info.find((item) => item.id === activeItem);

  return (
    <div>
      <div
        role="tablist"
        className="flex items-center border-b border-line-normal-neutral mb-3"
      >
        {info.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
            className="text-[0.9rem] xs:text-[1rem] sm:text-[1.2rem] font-semibold py-1.5 px-4 sm:py-2 sm:px-5 cursor-pointer text-label-disable hover:text-label-strong aria-selected:text-label-strong aria-selected:border-b-2 aria-selected:border-primary-normal"
          >
            {item.title}
          </button>
        ))}
      </div>
      <div role="tabcontent">{activeTab?.content}</div>
    </div>
  );
};

export default Tabs;
