"use client";

import React, { useEffect, useRef, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { CustomCaption } from "./CustomNav";
import { VisitDateCalendarProps } from "../page";
import { format, isValid, parse } from "date-fns";
import Input from "@/components/common/Input";
import { twMerge } from "tailwind-merge";

const VisitDateCalendar = ({
  className,
  reviewInfo,
  setIsCalendarOpen,
  setReviewInfo,
}: VisitDateCalendarProps) => {
  // 달력이 바라보는 월
  const [month, setMonth] = useState(new Date());
  // 날짜 입력 input 상태값
  const [inputValue, setInputValue] = useState(reviewInfo.visited_at ?? "");
  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    reviewInfo.visited_at
      ? parse(reviewInfo.visited_at, "yyyy-MM-dd", new Date())
      : undefined,
  );

  // 캘린더 ref
  const calendarRef = useRef<HTMLDivElement>(null);

  // 달력 날짜 클릭 함수
  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, "yyyy-MM-dd"));

      setReviewInfo((prev) => ({
        ...prev,
        visited_at: format(date, "yyyy-MM-dd"),
      }));
      setIsCalendarOpen(false);
    }
  };

  // 날짜 선택 input 입력 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const parsedDate = parse(e.target.value, "yyyy-MM-dd", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  // 날짜 선택 input 엔터 입력 함수
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const value = inputValue.trim();
    const parsedDate = parse(value, "yyyy-MM-dd", new Date());

    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !isValid(parsedDate)) {
      alert("올바른 날짜를 yyyy-MM-dd 형식으로 입력해주세요.");
      return;
    }

    handleDayPickerSelect(parsedDate);
  };

  // 캘린더 닫기
  useEffect(() => {
    // 캘린더 바깥 영역 클릭 시 닫기
    const handleClickOuterSection = (e: PointerEvent) => {
      if (
        e.target instanceof Node &&
        calendarRef.current &&
        !calendarRef.current.contains(e.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    // ESC 닫기
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOuterSection);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handleClickOuterSection);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsCalendarOpen]);

  return (
    <div
      ref={calendarRef}
      className={twMerge(
        `w-50 md:w-75 shadow-lg rounded-sm p-5 bg-white ${className}`,
      )}
    >
      <div className="flex flex-col gap-1 mb-5">
        <label
          htmlFor="dateInput"
          className="shrink-0 text-[0.8rem] font-semibold"
        >
          날짜 입력
        </label>
        <Input
          type="text"
          id="dateInput"
          value={inputValue}
          placeholder="ex) 2026-09-21"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <DayPicker
        // locale={ko}
        required
        month={month}
        mode="single"
        hideNavigation
        captionLayout="label"
        selected={selectedDate}
        onSelect={handleDayPickerSelect}
        classNames={{
          root: "",
          day: "text-center w-[40px] h-[37px] aspect-square rounded-[50%] hover:bg-cyan-95 hover:text-primary-normal hover:font-semibold cursor-pointer",
          day_button: "w-full h-full cursor-pointer",
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
    </div>
  );
};

export default VisitDateCalendar;
