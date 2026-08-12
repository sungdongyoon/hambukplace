import PageTitle from "@/components/common/PageTitle";
import Tabs from "@/components/common/Tabs";
import TabPhoto from "@/app/places/components/TabPhoto";
import TabReview from "@/app/places/components/TabReview";
import { FaMapLocation, FaPhone, FaRegClock } from "react-icons/fa6";
import Button from "@/components/common/Button";
import ImageSlideSection from "./components/ImageSlideSection";
import { apiGetPlaces } from "@/api/places/places";

const PlacePage = async ({ params }: { params: { placeId: string } }) => {
  const { placeId } = await params;

  // 매장 리스트 데이터
  const placesData = await apiGetPlaces();
  const place = placesData?.find((el) => el.id === placeId);

  // 텍스트 예외처리 함수
  const displayText = (value?: string | null) => {
    return value?.trim() ? value : "정보 없음";
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <PageTitle>{displayText(place?.name)}</PageTitle>
        <div className="flex items-center justify-end gap-1 mb-6">
          <Button size="sm">수정</Button>
          <Button size="sm" className="bg-status-negative">
            삭제
          </Button>
        </div>
      </div>
      {place && <ImageSlideSection place={place} />}

      <div className="flex flex-col gap-3 mt-4">
        <address className="flex items-center gap-2 font-medium text-[0.8rem] not-italic">
          <FaMapLocation />
          {displayText(place?.address)}
        </address>
        <p className="flex items-center gap-2 font-medium text-[0.8rem]">
          <FaRegClock />
          {displayText(place?.open_hours)}
        </p>
        <p className="flex items-center gap-2 font-medium text-[0.8rem]">
          <FaPhone />
          {displayText(place?.phone)}
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
