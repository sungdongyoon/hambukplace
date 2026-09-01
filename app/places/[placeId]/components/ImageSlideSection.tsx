"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Place } from "@/types/place";
import Image from "next/image";
import EmblaSlideButton from "@/components/common/EmblaSlideButton";
import EmptyState from "@/components/common/EmptyState";
import { usePlaceQuery } from "@/hooks/queries/usePlaceQuery";
import { useParams } from "next/navigation";
import Loading from "@/components/common/Loading";

const ImageSlideSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const params = useParams<{ placeId: string }>();
  const { data: placeData, isLoading } = usePlaceQuery(params.placeId);

  return (
    <div
      className="embla overflow-hidden w-full aspect-3/2 xs:aspect-6/3 sm:aspect-5/2 relative"
      ref={placeData?.images?.length ? emblaRef : undefined}
    >
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : placeData?.images?.length ? (
        <>
          <div className="embla__container flex gap-3 h-full">
            {placeData?.images?.map((image, index) => (
              <div
                className="embla__slide relative h-full min-w-0 flex-[0_0_100%] xs:flex-[0_0_80%] sm:flex-[0_0_40%]"
                key={image}
              >
                <Image
                  src={image}
                  alt={`${placeData.name} 이미지 ${index + 1}`}
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
