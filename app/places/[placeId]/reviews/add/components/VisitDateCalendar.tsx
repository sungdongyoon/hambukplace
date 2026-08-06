"use client";

import React from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { CustomCaption } from "./CustomNav";
import { VisitDateCalendarProps } from "../page";
import { format, parse } from "date-fns";

const VisitDateCalendar = ({
  className,
  reviewInfo,
  setIsCalendarOpen,
  setReviewInfo,
}: VisitDateCalendarProps) => {
  // const defaultClassNames = getDefaultClassNames();

  const selectedDate = reviewInfo.visited_at
    ? parse(reviewInfo.visited_at, "yyyy-MM-dd", new Date())
    : undefined;

  return (
    <DayPicker
      // locale={ko}
      mode="single"
      hideNavigation
      captionLayout="label"
      selected={selectedDate}
      onSelect={(date) => {
        if (!date) return;

        setReviewInfo((prev) => ({
          ...prev,
          visited_at: format(date, "yyyy-MM-dd"),
        }));

        setIsCalendarOpen(false);
      }}
      className={className}
      classNames={{
        root: "w-[200px] md:w-[300px] shadow shadow-normal-small p-5 rounded-md bg-white",
        day: "text-center w-[40px] h-[37px] aspect-square rounded-[50%] hover:bg-cyan-95 hover:text-primary-normal hover:font-semibold cursor-pointer",
        day_button: "cursor-pointer",
        month: "flex flex-col gap-2",
        dropdowns: "flex items-center justify-end gap-2",
        weekday: "font-medium text-[0.7rem]",
        selected:
          "bg-primary-normal text-white font-semibold hover:bg-primary-normal hover:text-white",
      }}
      components={{
        MonthCaption: CustomCaption,
      }}
    />
  );
};

export default VisitDateCalendar;
