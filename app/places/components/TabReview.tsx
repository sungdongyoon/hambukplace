"use client";

import { getReviews } from "@/api/reviews";
import { useMobile } from "@/hooks/useMobile";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";
import Loading from "../../../components/common/Loading";

const TabReview = () => {
  // 리뷰 데이터 로드
  const { data, isLoading, isError } = useQuery({
    queryKey: ["places"],
    queryFn: getReviews,
  });

  // 모바일 구분
  const isMobile = useMobile();

  return (
    <div className={`flex flex-col gap-3`}>
      {isLoading ? (
        <div className="w-full h-50 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        data?.map((review) => (
          <article
            className={`flex ${isMobile ? "flex-col border-b border-line-normal-neutral py-3" : "items-center"} gap-5`}
            key={review.id}
          >
            <div className="relative aspect-5/4 w-28 shrink-0 overflow-hidden rounded-lg sm:w-40">
              <Image
                src="/life.jpg"
                alt="리뷰 이미지"
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex flex-col gap-2">
              <p className="flex items-center gap-1 text-[0.7rem] font-semibold">
                <FaStar className="text-yellow-400" />
                {review.rate}
              </p>
              <p className="text-label-strong text-[0.8rem]">
                {review.content}
              </p>
              <p className="text-label-assistive text-[0.6rem] font-semibold">
                {review.visited_at} 방문
              </p>
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default TabReview;
