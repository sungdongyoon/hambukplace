import { getPlacesMock } from "@/api/places";
import { getReviews } from "@/api/reviews";
import PageTitle from "@/components/common/PageTitle";
import Tabs from "@/components/common/Tabs";
import TabPhoto from "@/app/places/components/TabPhoto";
import TabReview from "@/app/places/components/TabReview";
import Image from "next/image";
import React from "react";
import { FaMapLocation, FaPhone, FaRegClock } from "react-icons/fa6";
import Button from "@/components/common/Button";
import { apiGetPlacesData } from "@/api/places/place";

const PlacePage = async ({ params }: { params: { placeId: string } }) => {
  const { placeId } = await params;

  // 매장 리스트 데이터
  const placesData = await getPlacesMock();
  const placesData2 = await apiGetPlacesData();
  const place = placesData2.find((el) => el.id === placeId);

  // 리뷰 데이터
  const reviewsData = await getReviews();

  return (
    <section>
      <div className="flex justify-between items-center">
        <PageTitle>{place?.name}</PageTitle>
        <div className="flex items-center justify-end gap-1 mb-6">
          <Button size="sm">수정</Button>
          <Button size="sm" className="bg-status-negative">
            삭제
          </Button>
        </div>
      </div>

      <div className="bg-neutral-90 w-full h-87.5"></div>
      <div className="flex flex-col gap-3 mt-4">
        <address className="flex items-center gap-2 font-medium text-[0.8rem] not-italic">
          <FaMapLocation />
          {place?.address}
        </address>
        <p className="flex items-center gap-2 font-medium text-[0.8rem]">
          <FaRegClock />
          {place?.open_hours ?? "정보 없음"}
        </p>
        <p className="flex items-center gap-2 font-medium text-[0.8rem]">
          <FaPhone />
          {place?.phone}
        </p>
      </div>
      <div className="mt-15">
        <Tabs
          info={[
            {
              id: "review",
              title: "리뷰",
              content: <TabReview />,
            },
            {
              id: "photo",
              title: "사진",
              content: <TabPhoto />,
            },
          ]}
        />
      </div>
    </section>
  );
};

export default PlacePage;
