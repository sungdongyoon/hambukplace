"use client";

import { useReviewQuery } from "@/hooks/queries/useReviewQuery";
import { useBreakPoint } from "@/hooks/useBreakPoint";
import { Place } from "@/types/place";
import {
  FaChevronRight,
  FaClock,
  FaHouseChimney,
  FaICursor,
  FaLocationDot,
  FaPhone,
  FaStar,
  FaX,
} from "react-icons/fa6";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import EmblaSlideButton from "@/components/common/EmblaSlideButton";
import Link from "next/link";
import EmptyState from "@/components/common/EmptyState";
import { format } from "date-fns";
import Loading from "@/components/common/Loading";
import { displayText } from "@/utils/displayText";

const PlaceModal = ({
  place,
  onClose,
}: {
  place: Place;
  onClose: () => void;
}) => {
  const { data: reviewData, isLoading } = useReviewQuery(place.id);

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const isBreakPoint = useBreakPoint("sm");

  return (
    <div className="w-75 xs:w-100 h-[80%] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%-40px)] sm:translate-0 sm:left-10 sm:top-30 z-10 bg-white shadow-2xl rounded-lg p-5 sm:p-7 overflow-scroll">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <button
            className="absolute top-3 right-3 cursor-pointer"
            onClick={onClose}
          >
            <FaX />
          </button>
          <h3 className="mb-2 xs:text-[1.2rem] sm:text-[1.6rem] font-semibold">
            {place?.name}
          </h3>
          <div className="flex flex-col gap-1 mb-3">
            <div className="flex items-center gap-2 text-[0.6rem] sm:text-[0.7rem]">
              <div className="text-label-alternative">
                <FaLocationDot />
              </div>
              <address className="not-italic">
                {place?.address} {place?.address_detail}
              </address>
            </div>
            <div className="flex items-center gap-2 text-[0.6rem] sm:text-[0.7rem]">
              <div className="text-label-alternative">
                <FaClock />
              </div>
              <span>{displayText(place?.open_hours)}</span>
            </div>
            <div className="flex items-center gap-2 text-[0.6rem] sm:text-[0.7rem]">
              <div className="text-label-alternative">
                <FaPhone />
              </div>
              <span>{displayText(place?.phone)}</span>
            </div>
            <div className="flex items-center gap-2 text-[0.6rem] sm:text-[0.7rem]">
              <div className="text-label-alternative">
                <FaHouseChimney />
              </div>
              <Link href={`/places/${place?.id}`} className="font-semibold">
                매장 상세 페이지 이동
              </Link>
            </div>
          </div>
          <div
            ref={place?.images?.length ? emblaRef : undefined}
            className="embla w-full h-50 relative mb-3 overflow-hidden rounded-lg"
          >
            {place?.images?.length ? (
              <>
                <div className="embla__conatiner w-full h-full flex">
                  {place?.images.map((el) => (
                    <div
                      className="embla__slide relative h-full min-w-0 flex-[0_0_100%]"
                      key={el}
                    >
                      <Image
                        src={el}
                        alt="매장 이미지"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                <EmblaSlideButton
                  emblaApi={emblaApi}
                  className="p-2 bg-black/50 text-white"
                />
              </>
            ) : (
              <EmptyState message="등록된 이미지가 없습니다" />
            )}
          </div>
          <div className="bg-background-elevated-alternative border border-line-normal-alternative rounded-lg p-3">
            <div className="flex items-center gap-1 mb-3">
              <h4 className="text-[0.9rem] sm:text-[1.1rem] font-semibold">
                리뷰
              </h4>
              <Link
                href={`/places/${place.id}`}
                className="text-label-alternative flex items-center font-semibold text-[0.9rem] sm:text-[1.1rem]"
              >
                {reviewData?.length} <FaChevronRight />
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {reviewData?.length ? (
                reviewData?.slice(0, 3).map((el) => (
                  <article
                    className={`flex ${isBreakPoint ? "flex-col" : "items-stretch"} border-b border-line-normal-neutral py-3 gap-4 last:border-b-0`}
                    key={el.id}
                  >
                    <div className="relative w-28 aspect-5/4 shrink-0">
                      {el.images.length ? (
                        <>
                          <Image
                            src={el.images[0]}
                            alt="리뷰 이미지"
                            fill
                            className="object-cover rounded-sm"
                          />
                          <div className="px-1 flex justify-center items-center absolute right-1 bottom-1 bg-black/50 rounded-sm">
                            <span className="text-[0.8rem] font-semibold text-white">
                              {el.images.length}
                            </span>
                          </div>
                        </>
                      ) : (
                        <EmptyState message="No Image" />
                      )}
                    </div>
                    <div className="min-w-0 flex flex-col flex-1 justify-between gap-1">
                      <div className="flex items-start gap-2">
                        <p className="flex items-center gap-1 text-[0.6rem] xs:text-[0.7rem] font-semibold">
                          <FaStar className="text-yellow-400" />
                          {el.rate}
                        </p>
                        <span className="text-[0.6rem] xs:text-[0.7rem] text-primary-normal font-semibold">
                          {el.menu}
                        </span>
                      </div>
                      <p className="text-label-strong text-[0.6rem] xs:text-[0.7rem] line-clamp-2">
                        {el.content}
                      </p>
                      <p className="text-label-assistive text-[0.6rem] xs:text-[0.7rem] font-semibold">
                        {format(el.visited_at, "yyyy.MM.dd")} 방문
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <EmptyState
                  message="등록된 리뷰가 없습니다 😢"
                  className="border-none"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaceModal;
