"use client";

import EmptyState from "@/components/common/EmptyState";
import Loading from "@/components/common/Loading";
import { useInfiniteReviewQuery } from "@/hooks/queries/useInfiniteReviewQuery";
import { usePlaceQuery } from "@/hooks/queries/usePlaceQuery";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const TabPhoto = () => {
  const params = useParams<{ placeId: string }>();
  // 매장 데이터
  const { data: placeData, isLoading: placeLoading } = usePlaceQuery(
    params.placeId,
  );

  // 리뷰 데이터
  const {
    data: reviewData,
    isLoading: reviewLoading,
    fetchNextPage: reviewFetchNextPage,
    hasNextPage: reviewHasNextPage,
    isFetchingNextPage: reviewIsFetchingNextPage,
  } = useInfiniteReviewQuery(params.placeId);

  // intersection observer 훅
  const { ref, inView } = useInView();

  // 매장 이미지
  const placeDataImages = placeData?.images ?? [];
  // 리뷰 이미지
  const reviewDataImages =
    reviewData?.pages.flatMap((el) =>
      el.reviews.flatMap((review) => review.images),
    ) ?? [];
  // 매장 + 리뷰 이미지
  const totalImages = [...placeDataImages, ...reviewDataImages];

  // 특정 요소가 페이지에 감지되면 next page 리뷰 데이터 호출
  useEffect(() => {
    if (inView && reviewHasNextPage && !reviewIsFetchingNextPage) {
      reviewFetchNextPage();
    }
  }, [
    inView,
    reviewHasNextPage,
    reviewFetchNextPage,
    reviewIsFetchingNextPage,
  ]);

  if (placeLoading || reviewLoading) {
    return (
      <div className="flex h-30 w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (totalImages.length === 0) {
    return <EmptyState message="등록된 이미지가 없습니다" />;
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-5 gap-y-10">
        {totalImages?.map((el) => (
          <div
            className="relative aspect-5/4 w-full overflow-hidden rounded-lg"
            key={el}
          >
            <Image src={el} alt="매장 이미지" fill className="object-cover" />
          </div>
        ))}
      </div>
      <div ref={ref} className="flex h-12 items-center justify-center">
        {reviewIsFetchingNextPage && <Loading />}
      </div>
    </>
  );
};

export default TabPhoto;
