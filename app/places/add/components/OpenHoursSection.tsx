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
      id: "weekday-hours-break-time",
      label: "평일 휴게시간",
    },
    {
      id: "weekend-hours",
      label: "주말",
    },
    {
      id: "weekend-hours-break-time",
      label: "주말 휴게시간",
    },
  ],
  "by-day": [
    {
      id: "monday-hours",
      label: "월요일",
    },
    {
      id: "monday-hours-break-time",
      label: "월요일 휴게시간",
    },
    {
      id: "tuesday-hours",
      label: "화요일",
    },
    {
      id: "tuesday-hours-break-time",
      label: "화요일 휴게시간",
    },
    {
      id: "wednsday-hours",
      label: "수요일",
    },
    {
      id: "wednsday-hours-break-time",
      label: "수요일 휴게시간",
    },
    {
      id: "thursday-hours",
      label: "목요일",
    },
    {
      id: "thursday-hours-break-time",
      label: "목요일 휴게시간",
    },
    {
      id: "friday-hours",
      label: "금요일",
    },
    {
      id: "friday-hours-break-time",
      label: "금요일 휴게시간",
    },
    {
      id: "saturday-hours",
      label: "토요일",
    },
    {
      id: "saturday-hours-break-time",
      label: "토요일 휴게시간",
    },
    {
      id: "sunday-hours",
      label: "일요일",
    },
    {
      id: "sunday-hours-break-time",
      label: "일요일 휴게시간",
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
