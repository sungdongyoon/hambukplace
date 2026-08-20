"use client";

import { useEmblaNavigation } from "@/hooks/useEmblaNavigation";
import { EmblaCarouselType } from "embla-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const EmblaSlideButton = ({
  className,
  prevClassName,
  nextClassName,
  emblaApi,
}: {
  className?: string;
  prevClassName?: string;
  nextClassName?: string;
  emblaApi: EmblaCarouselType | undefined;
}) => {
  // embla 캐러셀 prev, next 커스텀 훅
  const { slidePrev, slideNext } = useEmblaNavigation(emblaApi);
  return (
    <>
      <button
        onClick={slidePrev}
        className={twMerge(
          `absolute left-5 top-1/2 -translate-y-1/2 p-3 bg-white shadow rounded-[50%] cursor-pointer ${className ?? ""} ${prevClassName ?? ""}`,
        )}
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={slideNext}
        className={twMerge(
          `absolute right-5 top-1/2 -translate-y-1/2 p-3 bg-white shadow rounded-[50%] cursor-pointer ${className ?? ""} ${nextClassName ?? ""}`,
        )}
      >
        <FaChevronRight />
      </button>
    </>
  );
};

export default EmblaSlideButton;
