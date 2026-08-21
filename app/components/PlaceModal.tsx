"use client";

import { useReviewQuery } from "@/hooks/queries/useReviewQuery";
import { useMobile } from "@/hooks/useMobile";
import { Place } from "@/types/place";
import { FaClock, FaLocationDot, FaPhone, FaStar, FaX } from "react-icons/fa6";
import ReviewImageSection from "../places/components/ReviewImageSection";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import EmblaSlideButton from "@/components/common/EmblaSlideButton";

const PlaceModal = ({
  place,
  onClose,
}: {
  place: Place;
  onClose: () => void;
}) => {
  const { data: reviewData, isLoading } = useReviewQuery(place.id);

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const isMobile = useMobile();

  console.log("review", reviewData);
  console.log("place", place);

  return (
    <div className="w-100 h-[80%] fixed left-10 top-30 z-10 bg-white shadow-2xl rounded-lg p-7">
      <button
        className="absolute top-3 right-3 cursor-pointer"
        onClick={onClose}
      >
        <FaX />
      </button>
      <h3 className="mb-1 text-[1.6rem] font-semibold">{place?.name}</h3>
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center gap-2 text-[0.7rem]">
          <div className="text-label-alternative">
            <FaLocationDot />
          </div>
          <address className="not-italic">
            {place?.address} {place?.address_detail}
          </address>
        </div>
        <div className="flex items-center gap-2 text-[0.7rem]">
          <div className="text-label-alternative">
            <FaClock />
          </div>
          <span>{place?.open_hours}</span>
        </div>
        <div className="flex items-center gap-2 text-[0.7rem]">
          <div className="text-label-alternative">
            <FaPhone />
          </div>
          <span>{place?.phone}</span>
        </div>
      </div>
      <div
        ref={emblaRef}
        className="embla w-full h-50 relative mb-3 overflow-hidden rounded-lg"
      >
        <div className="embla__conatiner w-full h-full flex">
          {place?.images.map((el) => (
            <div
              className="embla__slide relative h-full min-w-0 flex-[0_0_100%]"
              key={el}
            >
              <Image src={el} alt="매장 이미지" fill className="rounded-lg" />
            </div>
          ))}
        </div>
        <EmblaSlideButton
          emblaApi={emblaApi}
          className="p-2 bg-black/50 text-white"
        />
      </div>
      <div>
        <h4 className="text-[1.1rem] font-semibold mb-3">리뷰</h4>
        <div className="flex flex-col gap-2">
          {reviewData?.length ? (
            reviewData?.map((el) => (
              <article
                className={`flex ${isMobile ? "flex-col border-b border-line-normal-neutral py-3" : "items-center"} gap-5`}
                key={el.id}
              >
                <div className="relative w-28 aspect-5/4">
                  <Image src={el.images[0]} alt="리뷰 이미지" fill />
                  <div className="px-1 flex justify-center items-center absolute right-1 bottom-1 bg-black/50 rounded-sm">
                    <span className="text-[0.8rem] font-semibold text-white">
                      {el.images.length}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex flex-col gap-2">
                  <p className="flex items-center gap-1 text-[0.7rem] font-semibold">
                    <FaStar className="text-yellow-400" />
                    {el.rate}
                  </p>
                  <p className="text-[0.6rem] text-label-assistive">
                    메뉴 : {el.menu}
                  </p>
                  <p className="text-label-strong text-[0.8rem]">
                    {el.content}
                  </p>
                  <p className="text-label-assistive text-[0.6rem] font-semibold">
                    {el.visited_at} 방문
                  </p>
                </div>
              </article>
            ))
          ) : (
            <p className="text-[0.8rem] font-medium">
              😢 등록된 리뷰가 없습니다 😢
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;
