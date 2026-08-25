"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Place } from "@/types/place";
import Image from "next/image";
import EmblaSlideButton from "@/components/common/EmblaSlideButton";
import EmptyState from "@/components/common/EmptyState";

const ImageSlideSection = ({ place }: { place: Place }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <div
      className="embla overflow-hidden w-full aspect-3/2 xs:aspect-6/3 sm:aspect-5/2 relative"
      ref={place?.images?.length ? emblaRef : undefined}
    >
      {place?.images?.length ? (
        <>
          <div className="embla__container flex gap-3 h-full">
            {place?.images?.map((image, index) => (
              <div
                className="embla__slide relative h-full min-w-0 flex-[0_0_100%] xs:flex-[0_0_80%] sm:flex-[0_0_40%]"
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
        <EmptyState message="등록된 이미지가 없습니다" />
      )}
    </div>
  );
};

export default ImageSlideSection;
