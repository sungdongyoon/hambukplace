"use client";

import { useDayPicker } from "react-day-picker";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export const CustomCaption = () => {
  const { previousMonth, nextMonth, goToMonth, months } = useDayPicker();

  const currentMonth = months[0].date;

  return (
    <div className="mb-2 grid grid-cols-[40px_1fr_40px] items-center boder">
      <button
        type="button"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className="h-10 w-10 flex justify-center items-center text-primary-normal"
      >
        <FaChevronLeft />
      </button>

      <div className="text-center font-semibold">
        {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
      </div>

      <button
        type="button"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className="h-10 w-10 flex justify-center items-center text-primary-normal"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};
