"use client";

import { FaStar } from "react-icons/fa6";
import Loading from "../../../components/common/Loading";
import Button from "@/components/common/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReviewImageSection from "./ReviewImageSection";
import EmptyState from "@/components/common/EmptyState";
import { format } from "date-fns";
import { useInfiniteReviewQuery } from "@/hooks/queries/useInfiniteReviewQuery";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const TabReview = () => {
  // 로그인 상태
  const { user, isAuthLoading } = useAuthStore();

  // params 값 불러오기
  const params = useParams<{ placeId: string }>();

  // 리뷰 데이터 로드
  const {
    data: reviewData,
    isLoading: reviewLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteReviewQuery(params.placeId);

  // intersection observer 훅
  const { ref, inView } = useInView();

  // 리뷰 리스트
  const reviewList = reviewData?.pages.flatMap((el) => el.reviews) ?? [];

  // 특정 요소가 페이지에 감지되면 next page 리뷰 데이터 호출
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className={`flex flex-col gap-3`}>
      {reviewLoading ? (
        <div className="w-full h-50 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          {user && (
            <div>
              <Button variant="outline" size="sm">
                <Link href={`/places/${params.placeId}/reviews/add`}>
                  리뷰 작성
                </Link>
              </Button>
            </div>
          )}

          {reviewList && reviewList?.length > 0 ? (
            <>
              {reviewList?.map((review) => (
                <article
                  className={`flex flex-col gap-5 border-b border-line-normal-neutral py-3`}
                  key={review.id}
                >
                  <div className="min-w-0 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <p className="flex items-center gap-1 text-[0.7rem] font-semibold">
                        <FaStar className="text-yellow-400" />
                        {review.rate}
                      </p>
                      <span className="text-[0.7rem] font-semibold text-primary-normal">
                        {review.menu}
                      </span>
                    </div>
                    <ReviewImageSection data={review} />
                    <p className="py-3 text-label-neutral text-[0.8rem] leading-5 whitespace-pre-line">
                      {review.content}
                    </p>
                    <p className="text-label-assistive text-[0.6rem] font-semibold">
                      {format(review.visited_at, "yyyy.MM.dd")} 방문
                    </p>
                  </div>
                </article>
              ))}
              <div ref={ref} className="flex h-12 items-center justify-center">
                {isFetchingNextPage && <Loading />}
              </div>
            </>
          ) : (
            <EmptyState message="등록된 리뷰가 없습니다 😢" />
          )}
        </>
      )}
    </div>
  );
};

export default TabReview;
