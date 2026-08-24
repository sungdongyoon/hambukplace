import PageTitle from "@/components/common/PageTitle";
import Tabs from "@/components/common/Tabs";
import TabPhoto from "@/app/places/components/TabPhoto";
import TabReview from "@/app/places/components/TabReview";
import { FaMapLocation, FaPhone, FaRegClock } from "react-icons/fa6";
import Button from "@/components/common/Button";
import ImageSlideSection from "./components/ImageSlideSection";
import { apiGetPlace } from "@/api/places/places";
import Link from "next/link";
import PlaceAction from "./components/PlaceAction";

const PlacePage = async ({ params }: { params: { placeId: string } }) => {
  const { placeId } = await params;

  // 매장 리스트 데이터
  const placeData = await apiGetPlace(placeId);

  // 텍스트 예외처리 함수
  const displayText = (value?: string | null) => {
    return value?.trim() ? value : "정보 없음";
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <PageTitle>{displayText(placeData?.name)}</PageTitle>
        <PlaceAction placeId={placeId} />
      </div>
      {placeData && <ImageSlideSection place={placeData} />}

      <div className="flex flex-col gap-3 mt-4">
        <address className="flex items-center gap-2 font-medium text-[0.8rem] not-italic">
          <FaMapLocation />
          {displayText(placeData?.address)}
        </address>
        <p className="flex items-center gap-2 font-medium text-[0.8rem]">
          <FaRegClock />
          {displayText(placeData?.open_hours)}
        </p>
        <p className="flex items-center gap-2 font-medium text-[0.8rem]">
          <FaPhone />
          {displayText(placeData?.phone)}
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
