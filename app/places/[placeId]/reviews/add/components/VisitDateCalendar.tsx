"use client";

import React from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { CustomCaption } from "./CustomNav";

const VisitDateCalendar = () => {
  const defaultClassNames = getDefaultClassNames();
  console.log(defaultClassNames);
  console.log("date", new Date());
  return (
    <DayPicker
      // locale={ko}
      mode="single"
      hideNavigation
      captionLayout="label"
      selected={new Date()}
      classNames={{
        root: "w-[200px] md:w-[300px] shadow shadow-normal-small p-5 rounded-md",
        day: "text-center w-[40px] h-[37px] aspect-square rounded-[50%] hover:bg-cyan-95 hover:text-primary-normal hover:font-semibold cursor-pointer",
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
