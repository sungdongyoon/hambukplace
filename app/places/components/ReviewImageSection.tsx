"use client";

import EmblaSlideButton from "@/components/common/EmblaSlideButton";
import { Review } from "@/types/review";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const ReviewImageSection = ({ data }: { data: Review }) => {
  // 이미지 슬라이드 상태
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <div
      ref={emblaRef}
      className="embla w-28 relative aspect-5/4 shrink-0 overflow-hidden rounded-lg sm:w-40"
    >
      <div className="embla__container flex h-full w-full">
        {data.images.map((el, idx) => (
          <div
            key={el}
            className="embla__slide relative h-full min-w-0 flex-[0_0_100%]"
          >
            <Image
              src={el}
              alt={`리뷰 이미지 ${idx + 1}`}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      <EmblaSlideButton
        emblaApi={emblaApi}
        className="text-[0.5rem] p-1.5 bg-white/30"
        prevClassName="left-2"
        nextClassName="right-2"
      />
    </div>
  );
};

export default ReviewImageSection;
