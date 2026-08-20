"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Place } from "@/types/place";
import Image from "next/image";
import EmblaSlideButton from "@/components/common/EmblaSlideButton";

const ImageSlideSection = ({ place }: { place: Place }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

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
          <EmblaSlideButton emblaApi={emblaApi} />
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
