"use client";

import { useMobile } from "@/hooks/useMobile";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import Loading from "../../../components/common/Loading";
import Button from "@/components/common/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useReviewQuery } from "@/hooks/queries/useReviewQuery";

const TabReview = () => {
  // 리뷰 데이터 로드
  const { data, isLoading, isError } = useReviewQuery();

  // 모바일 구분
  const isMobile = useMobile();

  // params 값 불러오기
  const params = useParams();

  // 리뷰 목록 데이터
  const reviewList = data?.filter((el) => el.place_id === params.placeId);

  console.log("data", reviewList);

  return (
    <div className={`flex flex-col gap-3`}>
      {isLoading ? (
        <div className="w-full h-50 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <div>
            <Button variant="outline" size="sm">
              <Link href={`/places/${params.placeId}/reviews/add`}>
                리뷰 작성
              </Link>
            </Button>
          </div>
          {reviewList && reviewList?.length > 0 ? (
            reviewList?.map((review) => (
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
          ) : (
            <div className="w-full h-20 flex justify-center items-center border border-line-normal-neutral">
              <p className="font-medium text-[0.9rem]">
                😢 등록된 리뷰가 없습니다 😢
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TabReview;
