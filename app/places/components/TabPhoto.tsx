"use client";

import EmptyState from "@/components/common/EmptyState";
import Loading from "@/components/common/Loading";
import { usePlaceQuery } from "@/hooks/queries/usePlaceQuery";
import { useReviewQuery } from "@/hooks/queries/useReviewQuery";
import Image from "next/image";
import { useParams } from "next/navigation";

const TabPhoto = () => {
  const params = useParams<{ placeId: string }>();
  // 매장 데이터
  const { data: placeData, isLoading: placeLoading } = usePlaceQuery(
    params.placeId,
  );
  // 리뷰 데이터
  const { data: reviewData, isLoading: reviewLoading } = useReviewQuery(
    params.placeId,
  );

  // 매장 이미지
  const placeDataImages = placeData?.images ?? [];
  // 리뷰 이미지
  const reviewDataImages = reviewData?.flatMap((el) => el.images) ?? [];
  // 매장 + 리뷰 이미지
  const totalImages = [...placeDataImages, ...reviewDataImages];

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
  );
};

export default TabPhoto;
