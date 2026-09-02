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
  const params = useParams<{ placeId: string }>();
  const { data: placeData, isLoading } = usePlaceQuery(params.placeId);

  // 이미지가 2개 이상인 경우에만 캐러셀 활성화
  const activeCarousel = (placeData?.images?.length ?? 0) >= 2;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: activeCarousel,
  });

  // 이미지 수에 따라 다른 레이아웃 출력
  const carouselImageLength = (imageCount: number) => {
    if (imageCount < 2) {
      return "flex-[0_0_100%]";
    }

    if (imageCount === 2) {
      return "flex-[0_0_100%] xs:flex-[0_0_50%]";
    }

    return "flex-[0_0_100%] xs:flex-[0_0_80%] sm:flex-[0_0_40%]";
  };

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
                className={`embla__slide relative h-full min-w-0 ${carouselImageLength(placeData?.images?.length)}`}
                key={image}
              >
                {placeData?.images.length === 1 && (
                  <Image
                    src={image}
                    alt=""
                    fill
                    aria-hidden
                    className="scale-110 object-cover opacity-30 blur-xl"
                  />
                )}

                <Image
                  src={image}
                  alt={`${placeData.name} 이미지 ${index + 1}`}
                  fill
                  className={`${placeData?.images.length === 1 ? "object-contain" : "object-cover"} rounded-lg`}
                />
              </div>
            ))}
          </div>
          {activeCarousel && <EmblaSlideButton emblaApi={emblaApi} />}
        </>
      ) : (
        <EmptyState message="등록된 이미지가 없습니다" />
      )}
    </div>
  );
};

export default ImageSlideSection;
