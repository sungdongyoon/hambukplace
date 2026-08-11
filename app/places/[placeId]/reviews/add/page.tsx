"use client";

import Button from "@/components/common/Button";
import FileInput from "@/components/common/FileInput";
import Input from "@/components/common/Input";
import PageTitle from "@/components/common/PageTitle";
import RatingInput from "@/components/common/RatingInput";
import Textarea from "@/components/common/Textarea";
import React, { useState } from "react";
import VisitDateCalendar from "./components/VisitDateCalendar";
import { useParams, useRouter } from "next/navigation";
import { usePlacesQuery } from "@/hooks/queries/usePlacesQuery";
import { AddReviewType } from "@/types/review";
import { usePostReview } from "@/hooks/muataions/useReviewMutation";

export type VisitDateCalendarProps = {
  className: string;
  reviewInfo: AddReviewType;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewInfo: React.Dispatch<React.SetStateAction<AddReviewType>>;
};

const AddReviewPage = () => {
  // params
  const params = useParams();
  // router
  const router = useRouter();

  // zustand 쿼리
  const { data, isLoading } = usePlacesQuery();

  // 매장 상세 정보
  const placeData = data?.find((el) => el.id === params.placeId);

  // mutation
  const postReview = usePostReview();

  // 리뷰 정보 상태값
  const [reviewInfo, setReviewInfo] = useState<AddReviewType>({
    place_id: params.placeId,
    rate: 0,
    visited_at: "",
    content: "",
    images: [],
  });

  // 캘린더 활성 유무 값
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  // 리뷰 등록 함수
  const handlePostReview = () => {
    postReview.mutate(reviewInfo, {
      onSuccess: () => {
        alert("리뷰가 등록되었습니다!");
        router.replace(`/places/${params.placeId}`);
      },
      onError: (error) => {
        console.error("리뷰 등록 실패", error);
        alert("리뷰 등록 실패!");
      },
    });
  };

  console.log("reviewInfo", reviewInfo);

  return (
    <section>
      <PageTitle>{placeData?.name} 리뷰 작성</PageTitle>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-10 gap-y-20 mb-20">
        <div className="flex flex-col gap-3">
          <p className="font-semibold">별점</p>
          <RatingInput
            value={reviewInfo.rate}
            onChange={(rate) =>
              setReviewInfo({
                ...reviewInfo,
                rate,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="address" className="font-semibold">
            방문일
          </label>
          <div className="relative">
            <Input
              id="address"
              placeholder="방문일자를 입력해주세요"
              value={reviewInfo.visited_at}
              readOnly
              onClick={() => setIsCalendarOpen(true)}
              className="cursor-pointer"
            />
            {isCalendarOpen && (
              <VisitDateCalendar
                className="absolute top-8 left-0 z-100"
                setIsCalendarOpen={setIsCalendarOpen}
                reviewInfo={reviewInfo}
                setReviewInfo={setReviewInfo}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 xs:col-span-2">
          <label htmlFor="address" className="font-semibold">
            내용
          </label>
          <Textarea
            id="content"
            placeholder="리뷰 내용을 입력해주세요"
            value={reviewInfo.content}
            onChange={(e) =>
              setReviewInfo({ ...reviewInfo, content: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">이미지 추가</p>
          <FileInput
            id="image"
            label="이미지 업로드"
            onChange={(e) => setReviewInfo({ ...reviewInfo, images: e })}
          />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <Button className="w-25" size="lg" variant="outline">
          뒤로가기
        </Button>
        <Button className="w-25" size="lg" onClick={handlePostReview}>
          저장
        </Button>
      </div>
    </section>
  );
};

export default AddReviewPage;
