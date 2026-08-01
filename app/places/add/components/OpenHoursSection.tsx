"use client";

import Input from "@/components/common/Input";
import React, { useState } from "react";

type OpenHoursType = "daily" | "weekday-weekend" | "by-day" | "unknown";

type OpenHoursInputType = Exclude<OpenHoursType, "unknown">;

type OpenHoursField = {
  id: string;
  label: string;
};

const fieldType: Record<OpenHoursInputType, OpenHoursField[]> = {
  daily: [
    {
      id: "daily-hours",
      label: "매일",
    },
    {
      id: "daily-break-time",
      label: "휴게시간",
    },
  ],
  "weekday-weekend": [
    {
      id: "weekday-hours",
      label: "평일",
    },
    {
      id: "weekend-hours",
      label: "주말",
    },
  ],
  "by-day": [
    {
      id: "monday-hours",
      label: "월요일",
    },
    {
      id: "tuesday-hours",
      label: "화요일",
    },
  ],
};

const OpenHoursSection = ({ type }: { type: OpenHoursType }) => {
  if (type === "unknown") return null;

  const fields = fieldType[type];

  return (
    <div className="flex flex-col gap-3">
      {fields.map((field) => (
        <div className="flex items-center gap-3" key={field.id}>
          <label
            className="w-15 shrink-0 text-[0.8rem] font-medium"
            htmlFor={field.id}
          >
            {field.label}
          </label>
          <Input id={field.id} />
        </div>
      ))}
    </div>
  );
};

export default OpenHoursSection;
