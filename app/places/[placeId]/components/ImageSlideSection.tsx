"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Place } from "@/types/place";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Button from "@/components/common/Button";

const ImageSlideSection = ({ place }: { place: Place }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  // 슬라이드 prev 버튼 함수
  const slidePrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  // 슬라이드 next 버튼 함수
  const slideNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);
  console.log("place", place);

  return (
    <div
      className="embla overflow-hidden w-full h-87.5 relative"
      ref={emblaRef}
    >
      {place?.images?.length ? (
        <>
          <div className="embla__container flex gap-3 h-full">
            {place?.images?.map((image, index) => (
              <div
                className="embla__slide relative h-full min-w-0 flex-[0_0_40%]"
                key={image}
              >
                <Image
                  src={image}
                  alt={`${place.name} 이미지 ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          <button
            onClick={slidePrev}
            className="absolute left-5 top-1/2 -translate-y-1/2 p-3 bg-white shadow rounded-[50%] cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={slideNext}
            className="absolute right-5 top-1/2 -translate-y-1/2 p-3 bg-white shadow rounded-[50%] cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center border border-line-normal-neutral rounded-lg">
          <p className="font-medium text-[0.9rem]">
            등록된 이미지가 없습니다❗️
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageSlideSection;
